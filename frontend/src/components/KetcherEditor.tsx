import React from "react";
import { Box, Button, HStack, Text, Textarea, VStack } from "@chakra-ui/react";
import "ketcher-react/dist/index.css";
import type { Ketcher, StructServiceProvider } from "ketcher-core";
import { RemoteStructServiceProvider } from "ketcher-core";
import { apiClient } from "../api/client";
import { createLocalStructServiceProvider } from "../ketcher/localStructService";

const LazyEditor = React.lazy(async () => {
  const module = await import("ketcher-react");
  const typedModule = module as unknown as {
    Editor?: React.ComponentType<any>;
    default?: { Editor?: React.ComponentType<any> };
  };
  const editor = typedModule.Editor ?? typedModule.default?.Editor;
  if (!editor) {
    throw new Error("ketcher-react Editor export not found");
  }
  return { default: editor };
});

interface KetcherEditorProps {
  smiles: string;
  onChange: (smiles: string) => void;
  height?: string | number;
}

interface EditorErrorBoundaryProps {
  onCrash: () => void;
  children: React.ReactNode;
}

interface EditorErrorBoundaryState {
  hasError: boolean;
}

class EditorErrorBoundary extends React.Component<EditorErrorBoundaryProps, EditorErrorBoundaryState> {
  state: EditorErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): EditorErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Ketcher render failed", error);
    this.props.onCrash();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export const KetcherEditor: React.FC<KetcherEditorProps> = ({ smiles, onChange, height }) => {
  const enableKetcher = import.meta.env.VITE_ENABLE_KETCHER !== "false";
  const providerMode = (import.meta.env.VITE_KETCHER_MODE ?? "local").toLowerCase();
  const useRemoteProvider = providerMode === "remote";
  const apiPath = import.meta.env.VITE_KETCHER_API_PATH ?? "/ketcher/api/struct";
  const staticResourcesUrl = import.meta.env.VITE_KETCHER_STATIC_URL ?? (useRemoteProvider ? "/ketcher/static" : "/");
  const editorHeight = typeof height === "number" ? `${height}px` : (height ?? "460px");
  const [fallbackMode, setFallbackMode] = React.useState(!enableKetcher);
  const [switchedToLocal, setSwitchedToLocal] = React.useState(!useRemoteProvider);
  const [providerSeed, setProviderSeed] = React.useState(0);
  const changeRef = React.useRef<(() => void) | null>(null);
  const activeKetcherRef = React.useRef<Ketcher | null>(null);
  const hydrateTimerRef = React.useRef<number | null>(null);

  const bindGlobalKetcher = React.useCallback((ketcher: Ketcher | null) => {
    if (typeof window === "undefined") return;
    const globalWindow = window as Window & { ketcher?: any };
    if (!ketcher) {
      if (globalWindow.ketcher) {
        delete globalWindow.ketcher;
      }
      return;
    }
    globalWindow.ketcher = ketcher;
    if (!globalWindow.ketcher.logging) {
      globalWindow.ketcher.logging = { enabled: false, level: 0 };
    }
  }, []);

  const hydrateMolecule = React.useCallback(
    async (ketcher: Ketcher, value: string) => {
      if (!value) return;

      let structure = value;
      const isLikelySmiles = !value.includes("\n") && !value.includes("M  END");

      if (switchedToLocal && isLikelySmiles) {
        try {
          const response = await apiClient.post<{ molblock?: string }>("/api/chem/parse", { smiles: value });
          if (response.data?.molblock) {
            structure = response.data.molblock;
          }
        } catch {
          // keep original structure when backend is unavailable
        }
      }

      for (let attempt = 0; attempt < 3; attempt += 1) {
        try {
          await ketcher.setMolecule(structure);
          return;
        } catch (error) {
          if (attempt === 2) {
            console.error("Ketcher setMolecule 失败", error);
            return;
          }
          await new Promise((resolve) => setTimeout(resolve, 80));
        }
      }
    },
    [switchedToLocal],
  );

  const structProvider = React.useMemo<StructServiceProvider>(() => {
    if (useRemoteProvider && !switchedToLocal) {
      return new RemoteStructServiceProvider(apiPath);
    }
    return createLocalStructServiceProvider();
  }, [apiPath, providerSeed, switchedToLocal, useRemoteProvider]);

  const handleError = (message: string | Error) => {
    console.error("Ketcher error:", message);
    if (useRemoteProvider && !switchedToLocal) {
      console.warn("远端结构服务不可用，自动切换到本地离线模式。");
      setSwitchedToLocal(true);
      return;
    }
    setFallbackMode(true);
  };

  const handleInit = (ketcher: Ketcher) => {
    changeRef.current?.();
    activeKetcherRef.current = ketcher;
    bindGlobalKetcher(ketcher);

    if (hydrateTimerRef.current !== null) {
      window.clearTimeout(hydrateTimerRef.current);
    }
    if (smiles) {
      hydrateTimerRef.current = window.setTimeout(() => {
        if (activeKetcherRef.current !== ketcher) return;
        void hydrateMolecule(ketcher, smiles);
      }, 30);
    }
    const handler = async () => {
      try {
        const updated = await ketcher.getSmiles();
        onChange(updated || "");
      } catch (error) {
        console.error("读取 Ketcher SMILES 失败", error);
      }
    };

    ketcher.changeEvent.add(handler);
    changeRef.current = () => {
      ketcher.changeEvent.remove(handler);
    };
  };

  React.useEffect(() => {
    return () => {
      if (hydrateTimerRef.current !== null) {
        window.clearTimeout(hydrateTimerRef.current);
        hydrateTimerRef.current = null;
      }
      changeRef.current?.();
      activeKetcherRef.current = null;
      bindGlobalKetcher(null);
    };
  }, [bindGlobalKetcher]);

  if (fallbackMode) {
    return (
      <VStack gap={2} align="stretch">
        <Box border="1px" borderColor="gray.200" borderRadius="md" p={3}>
          <Textarea
            value={smiles}
            onChange={(event) => onChange(event.target.value)}
            minH={editorHeight}
            placeholder="在此输入或粘贴 SMILES"
          />
          <HStack mt={3}>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => {
                if (useRemoteProvider) {
                  setSwitchedToLocal(false);
                }
                setProviderSeed((prev) => prev + 1);
                setFallbackMode(false);
              }}
            >
              重试图形编辑器
            </Button>
          </HStack>
        </Box>
        <Text fontSize="sm" color="orange.600">
          Ketcher 加载失败，已临时切换到文本模式。
        </Text>
      </VStack>
    );
  }

  return (
    <VStack gap={2} align="stretch">
      <Box height={editorHeight} border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
        <EditorErrorBoundary onCrash={() => setFallbackMode(true)}>
          <React.Suspense fallback={<Text p={4}>正在加载 Ketcher 组件…</Text>}>
            <LazyEditor
              key={`${useRemoteProvider ? "remote" : "local"}-${switchedToLocal ? "local" : "remote"}-${providerSeed}`}
              staticResourcesUrl={staticResourcesUrl}
              structServiceProvider={structProvider}
              errorHandler={handleError}
              onInit={handleInit}
            />
          </React.Suspense>
        </EditorErrorBoundary>
      </Box>
      <Text fontSize="sm" color="gray.500">
        编辑器模式：{switchedToLocal ? "本地离线" : "远端结构服务"}。提交时同步 SMILES。
      </Text>
    </VStack>
  );
};
