import React from "react";
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
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

const LazyMiewViewer = React.lazy(async () => {
  const module = await import("miew-react");
  return { default: module.default };
});

interface KetcherEditorProps {
  smiles: string;
  onChange: (smiles: string) => void;
  onMolChange?: (molfile: string) => void;
  height?: string | number;
  readOnly?: boolean;
}

interface EditorErrorBoundaryProps {
  onCrash: () => void;
  children: React.ReactNode;
}

interface EditorErrorBoundaryState {
  hasError: boolean;
}

interface Chem3DApiResponse {
  ok: boolean;
  canonical_smiles?: string;
  molblock_3d?: string;
  qc?: {
    warnings?: string[];
  };
}

function looksLikeSmilesInput(value: string): boolean {
  const candidate = value.trim();
  if (!candidate) return false;
  if (candidate.includes("\n") || candidate.includes("\r")) return false;
  if (candidate.startsWith("{")) return false;
  if (candidate.includes("M  END")) return false;
  return true;
}

function looksLikeMolblockInput(value: string): boolean {
  const candidate = value.trim();
  if (!candidate) return false;
  return candidate.includes("M  END");
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

export const KetcherEditor: React.FC<KetcherEditorProps> = ({ smiles, onChange, onMolChange, height, readOnly = false }) => {
  const { isOpen: is3DOpen, onOpen: on3DOpen, onClose: on3DClose } = useDisclosure();
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
  const lastHydratedSmilesRef = React.useRef<string>("");
  const lastEditorEmittedSmilesRef = React.useRef<string>("");
  const [loading3D, setLoading3D] = React.useState(false);
  const [viewerMolblock3D, setViewerMolblock3D] = React.useState("");
  const [viewerError, setViewerError] = React.useState<string | null>(null);
  const [viewerSeed, setViewerSeed] = React.useState(0);

  const miewOptions = React.useMemo(
    () => ({
      settings: {
        axes: true,
        autoRotation: 0,
      },
    }),
    [],
  );

  const parseApiError = React.useCallback((error: unknown): string => {
    if (typeof error !== "object" || !error || !("response" in error)) {
      return "3D 生成失败，请稍后重试";
    }
    const maybeAxiosError = error as {
      response?: {
        data?: {
          detail?: { message?: string; detail?: string } | string;
          message?: string;
        };
      };
    };
    const detail = maybeAxiosError.response?.data?.detail;
    if (typeof detail === "string" && detail.trim()) {
      return detail;
    }
    if (detail && typeof detail === "object") {
      const message = detail.message?.trim();
      const moreDetail = detail.detail?.trim();
      if (message && moreDetail) {
        return `${message}：${moreDetail}`;
      }
      if (message) {
        return message;
      }
    }
    const message = maybeAxiosError.response?.data?.message;
    if (message && message.trim()) {
      return message;
    }
    return "3D 生成失败，请稍后重试";
  }, []);

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
      if (!value) {
        try {
          await ketcher.setMolecule("");
          console.log("Ketcher 已清空当前分子结构");
        } catch (error) {
          console.error("Ketcher 清空分子结构失败", error);
        }
        return;
      }

      let structure = value;
      const isLikelySmiles = looksLikeSmilesInput(value);

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

      // 增加重试次数和延迟时间
      for (let attempt = 0; attempt < 5; attempt += 1) {
        try {
          await ketcher.setMolecule(structure);
          console.log(`Ketcher 成功加载分子结构（尝试 ${attempt + 1}）`);
          return;
        } catch (error) {
          if (attempt === 4) {
            console.error("Ketcher setMolecule 失败", error);
            return;
          }
          // 增加延迟时间，从80ms改为150ms
          await new Promise((resolve) => setTimeout(resolve, 150));
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
      // 增加初始化延迟，等待Ketcher完全启动
      hydrateTimerRef.current = window.setTimeout(() => {
        if (activeKetcherRef.current !== ketcher) return;
        lastHydratedSmilesRef.current = smiles;
        void hydrateMolecule(ketcher, smiles);
      }, 100);
    } else {
      lastHydratedSmilesRef.current = "";
    }
    const handler = async () => {
      try {
        const molfile = await ketcher.getMolfile();
        if (molfile?.trim()) {
          onMolChange?.(molfile);
        }
      } catch (error) {
        console.warn("读取 Ketcher molfile 失败", error);
      }

      try {
        const updated = await ketcher.getSmiles();
        const nextSmiles = updated || "";
        lastEditorEmittedSmilesRef.current = nextSmiles;
        lastHydratedSmilesRef.current = nextSmiles;
        onChange(nextSmiles);
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
    const currentEditor = activeKetcherRef.current;
    if (!currentEditor) {
      return;
    }
    const nextSmiles = smiles || "";

    // 编辑器自身变更已通过 onChange 回传，避免重复 hydrate 导致闪烁和串状态
    if (nextSmiles === lastEditorEmittedSmilesRef.current) {
      lastHydratedSmilesRef.current = nextSmiles;
      return;
    }

    if (nextSmiles === lastHydratedSmilesRef.current) {
      return;
    }

    lastHydratedSmilesRef.current = nextSmiles;
    void hydrateMolecule(currentEditor, nextSmiles);
  }, [hydrateMolecule, smiles]);

  React.useEffect(() => {
    return () => {
      if (hydrateTimerRef.current !== null) {
        window.clearTimeout(hydrateTimerRef.current);
        hydrateTimerRef.current = null;
      }
      changeRef.current?.();
      activeKetcherRef.current = null;
      lastHydratedSmilesRef.current = "";
      lastEditorEmittedSmilesRef.current = "";
      bindGlobalKetcher(null);
    };
  }, [bindGlobalKetcher]);

  const open3DViewer = React.useCallback(async () => {
    const structure = (smiles || "").trim();
    if (!structure) {
      setViewerError("当前结构为空，无法生成3D");
      return;
    }

    setLoading3D(true);
    setViewerError(null);
    try {
      const payload = looksLikeMolblockInput(structure) ? { mol: structure } : { smiles: structure };
      const response = await apiClient.post<Chem3DApiResponse>("/api/chem/3d", payload);
      const molblock3d = response.data?.molblock_3d;
      if (!molblock3d) {
        throw new Error("后端未返回3D结构数据");
      }
      setViewerMolblock3D(molblock3d);
      setViewerSeed((prev) => prev + 1);
      on3DOpen();
    } catch (error) {
      console.error("3D 结构生成失败", error);
      setViewerError(parseApiError(error));
    } finally {
      setLoading3D(false);
    }
  }, [on3DOpen, parseApiError, smiles]);

  const handleMiewInit = React.useCallback((miew: any) => {
    if (!viewerMolblock3D) {
      return;
    }
    void miew
      .load(viewerMolblock3D, {
        sourceType: "immediate",
        fileType: "mol",
        fileName: "structure.mol",
      })
      .catch((error: unknown) => {
        console.error("Miew 加载3D结构失败", error);
        setViewerError("3D渲染失败，请稍后重试");
      });
  }, [viewerMolblock3D]);

  if (fallbackMode) {
    return (
      <VStack gap={2} align="stretch">
        <Box border="1px" borderColor="gray.200" borderRadius="md" p={3}>
          <Textarea
            value={smiles}
            onChange={(event) => onChange(event.target.value)}
            isReadOnly={readOnly}
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
            <Button size="sm" variant="outline" onClick={() => void open3DViewer()} isLoading={loading3D}>
              查看3D
            </Button>
          </HStack>
        </Box>
        <Text fontSize="sm" color="orange.600">
          Ketcher 加载失败，已临时切换到文本模式。
        </Text>
        {viewerError && (
          <Text fontSize="sm" color="red.500">
            {viewerError}
          </Text>
        )}
        <Modal isOpen={is3DOpen} onClose={on3DClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>分子3D视图</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={4}>
              <Box h={{ base: "360px", md: "560px" }} borderWidth={1} borderRadius="md" overflow="hidden">
                <React.Suspense fallback={<Text p={4}>正在加载3D查看器…</Text>}>
                  <LazyMiewViewer key={`miew-${viewerSeed}`} options={miewOptions} onInit={handleMiewInit} />
                </React.Suspense>
              </Box>
              <Text fontSize="sm" color="gray.500" mt={2}>
                鼠标左键旋转，滚轮缩放，右键平移。
              </Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      </VStack>
    );
  }

  return (
    <VStack gap={2} align="stretch">
      <Box position="relative" height={editorHeight} border="1px" borderColor="gray.200" borderRadius="md" overflow="hidden">
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
        {readOnly && <Box position="absolute" inset={0} zIndex={2} cursor="not-allowed" bg="transparent" />}
      </Box>
      <HStack justify="space-between" align="center">
        <Text fontSize="sm" color="gray.500">
          编辑器模式：{switchedToLocal ? "本地离线" : "远端结构服务"}。提交时同步 SMILES。
        </Text>
        <Button size="xs" variant="outline" onClick={() => void open3DViewer()} isLoading={loading3D}>
          查看3D
        </Button>
      </HStack>
      {viewerError && (
        <Text fontSize="sm" color="red.500">
          {viewerError}
        </Text>
      )}
      <Modal isOpen={is3DOpen} onClose={on3DClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>分子3D视图</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <Box h={{ base: "360px", md: "560px" }} borderWidth={1} borderRadius="md" overflow="hidden">
              <React.Suspense fallback={<Text p={4}>正在加载3D查看器…</Text>}>
                <LazyMiewViewer key={`miew-${viewerSeed}`} options={miewOptions} onInit={handleMiewInit} />
              </React.Suspense>
            </Box>
            <Text fontSize="sm" color="gray.500" mt={2}>
              鼠标左键旋转，滚轮缩放，右键平移。
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
