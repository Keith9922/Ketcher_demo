import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { apiClient } from "./api/client";
import { Task, TaskStatus } from "./types";
import { KetcherEditor } from "./components/KetcherEditor";

const statusScheme: Record<TaskStatus, string> = {
  NEW: "gray",
  IN_PROGRESS: "blue",
  SUBMITTED: "orange",
  APPROVED: "green",
  REJECTED: "red",
};

function getStatusLabel(status: TaskStatus) {
  return status.replace("_", " ");
}

const defaultSmiles = "CCO";
const demoTasks: Task[] = [
  { id: "demo-1", title: "Mol-0001", status: "NEW", source: { smiles: "CCO" } },
  { id: "demo-2", title: "Mol-0002", status: "NEW", source: { smiles: "c1ccccc1" } },
];
const backendEnabled = import.meta.env.VITE_ENABLE_BACKEND !== "false";

function App() {
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>(backendEnabled ? [] : demoTasks);
  const [apiUnavailable, setApiUnavailable] = useState(!backendEnabled);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editorSmiles, setEditorSmiles] = useState(defaultSmiles);
  const [annotator, setAnnotator] = useState("alice");
  const [reviewer, setReviewer] = useState("bob");
  const [comment, setComment] = useState("");
  const [decision, setDecision] = useState<TaskStatus>("APPROVED");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!backendEnabled) {
      setApiUnavailable(true);
      setTasks((prev) => (prev.length ? prev : demoTasks));
      return;
    }
    void refreshTasks();
  }, []);

  useEffect(() => {
    if (!selectedId && tasks.length) {
      setSelectedId(tasks[0].id);
    }
  }, [selectedId, tasks]);

  const selectedTask = useMemo(() => {
    if (selectedId) {
      return tasks.find((task) => task.id === selectedId) ?? tasks[0] ?? null;
    }
    return tasks[0] ?? null;
  }, [selectedId, tasks]);

  useEffect(() => {
    if (selectedTask?.source?.smiles) {
      setEditorSmiles(selectedTask.source.smiles);
    }
  }, [selectedTask?.id, selectedTask?.source?.smiles]);

  const warnings = useMemo(() => selectedTask?.annotation?.qc.warnings ?? [], [selectedTask]);

  const refreshTasks = async () => {
    if (!backendEnabled) {
      setApiUnavailable(true);
      setTasks((prev) => (prev.length ? prev : demoTasks));
      return;
    }
    try {
      const response = await apiClient.get<Task[]>("/api/tasks");
      setTasks(response.data);
      setApiUnavailable(false);
    } catch (error) {
      setApiUnavailable(true);
      setTasks((prev) => (prev.length ? prev : demoTasks));
      toast({
        status: "warning",
        title: "后端未连接",
        description: "请先启动后端服务：uvicorn backend.app.main:app --reload --port 8000（或继续本地演示模式）",
      });
    }
  };

  const updateLocalTask = (updater: (task: Task) => Task) => {
    if (!selectedTask) {
      return;
    }
    setTasks((prev) => prev.map((task) => (task.id === selectedTask.id ? updater(task) : task)));
  };

  const handleClaim = async () => {
    if (!selectedTask) return;
    if (!backendEnabled || apiUnavailable) {
      updateLocalTask((task) => ({ ...task, status: "IN_PROGRESS" }));
      toast({ status: "info", title: "演示模式：任务状态已更新为 IN_PROGRESS" });
      return;
    }
    setBusy(true);
    try {
      await apiClient.post(`/api/tasks/${selectedTask.id}/claim`, { user: annotator });
      await refreshTasks();
      toast({ status: "success", title: "任务已领取" });
    } catch (error) {
      toast({ status: "error", title: "领取失败" });
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTask) return;
    if (!backendEnabled || apiUnavailable) {
      const nextSmiles = (editorSmiles || selectedTask.source.smiles || "").trim();
      const warningsLocal = nextSmiles ? [] : ["结构为空"];
      updateLocalTask((task) => ({
        ...task,
        status: "SUBMITTED",
        annotation: {
          annotator,
          smiles: nextSmiles,
          canonical_smiles: nextSmiles,
          qc: {
            rdkit_parse_ok: warningsLocal.length === 0,
            sanitize_ok: warningsLocal.length === 0,
            warnings: warningsLocal,
          },
          submitted_at: new Date().toISOString(),
        },
      }));
      toast({ status: "info", title: "演示模式：标注已提交" });
      return;
    }
    setBusy(true);
    try {
      await apiClient.post(`/api/tasks/${selectedTask.id}/submit`, {
        annotator,
        smiles: editorSmiles || selectedTask.source.smiles,
      });
      await refreshTasks();
      toast({ status: "success", title: "标注提交成功" });
    } catch (error) {
      toast({ status: "error", title: "提交失败" });
    } finally {
      setBusy(false);
    }
  };

  const handleReview = async () => {
    if (!selectedTask) return;
    if (!backendEnabled || apiUnavailable) {
      updateLocalTask((task) => ({
        ...task,
        status: decision,
        review: {
          reviewer,
          decision,
          comment,
          reviewed_at: new Date().toISOString(),
        },
      }));
      toast({ status: "info", title: `演示模式：任务已更新为 ${decision}` });
      return;
    }
    setBusy(true);
    try {
      await apiClient.post(`/api/tasks/${selectedTask.id}/review`, {
        reviewer,
        decision,
        comment,
      });
      await refreshTasks();
      toast({ status: "success", title: "审阅完成" });
    } catch (error) {
      toast({ status: "error", title: "审阅失败" });
    } finally {
      setBusy(false);
    }
  };

  const handleExport = async (format: "smiles" | "csv" | "sdf") => {
    if (apiUnavailable) {
      toast({ status: "warning", title: "后端未连接，无法导出" });
      return;
    }
    try {
      const response = await apiClient.get<string>("/api/export", {
        params: { format },
        responseType: "text",
      });
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `molecules.${format}`;
      anchor.click();
      URL.revokeObjectURL(url);
      toast({ status: "success", title: `已导出 ${format}` });
    } catch (error) {
      toast({ status: "error", title: "导出失败" });
    }
  };

  return (
    <Container maxW="8xl" py={6}>
      <Heading size="lg" mb={6}>
        分子标注 Demo
      </Heading>
      {apiUnavailable ? (
        <Box mb={4} borderWidth={1} borderRadius="md" p={3} borderColor="orange.300" bg="orange.50">
          <Text fontSize="sm" color="orange.700">
            当前处于本地演示模式（未连接后端）。如需联调，请启动 `uvicorn backend.app.main:app --reload --port 8000` 并设置 `VITE_ENABLE_BACKEND=true`。
          </Text>
        </Box>
      ) : null}
      <Grid templateColumns={{ base: "1fr", xl: "320px minmax(0, 1fr)" }} gap={6}>
        <Box borderWidth={1} borderRadius="lg" p={4} maxH="md" overflowY="auto">
          <Flex justify="space-between" mb={4} align="center">
            <Text fontWeight="bold">任务列表</Text>
            <Button size="xs" onClick={refreshTasks} isLoading={busy}>
              刷新
            </Button>
          </Flex>
          <Stack spacing={3}>
            {tasks.map((task) => (
              <Box
                key={task.id}
                p={3}
                borderWidth={1}
                borderRadius="md"
                borderColor={task.id === selectedTask?.id ? "blue.400" : "gray.200"}
                cursor="pointer"
                onClick={() => setSelectedId(task.id)}
              >
                <Flex justify="space-between" align="center">
                  <Text fontWeight="semibold">{task.title}</Text>
                  <Badge colorScheme={statusScheme[task.status]}>{getStatusLabel(task.status)}</Badge>
                </Flex>
                <Text fontSize="sm" color="gray.500">
                  ID: {task.id}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box borderWidth={1} borderRadius="lg" p={4}>
          <Flex justify="space-between" mb={4}>
            <Text fontSize="md" fontWeight="bold">
              标注磁贴
            </Text>
            <Badge colorScheme={selectedTask ? statusScheme[selectedTask.status] : "gray"}>
              {selectedTask ? getStatusLabel(selectedTask.status) : "未选任务"}
            </Badge>
          </Flex>
          <Flex gap={4} flexDir={{ base: "column", lg: "row" }}>
            <Box flex={1}>
              <KetcherEditor
                key={selectedTask?.id ?? "ketcher-editor"}
                smiles={editorSmiles}
                onChange={setEditorSmiles}
                height="600px"
              />
            </Box>
            <Box w={{ base: "100%", lg: "300px" }}>
              <Stack spacing={3}>
                <Input placeholder="标注人员" value={annotator} onChange={(event) => setAnnotator(event.target.value)} />
                <Button colorScheme="blue" onClick={handleClaim} isDisabled={!selectedTask || selectedTask.status !== "NEW"} isLoading={busy}>
                  领取任务
                </Button>
                <Button colorScheme="green" onClick={handleSubmit} isDisabled={!selectedTask} isLoading={busy}>
                  提交标注
                </Button>
                <Box borderWidth={1} borderRadius="md" p={2}>
                  <Text fontSize="sm" fontWeight="semibold" mb={1}>
                    QC 警告
                  </Text>
                  {warnings.length === 0 ? (
                    <Text fontSize="sm" color="green.500">
                      当前没有警告。
                    </Text>
                  ) : (
                    <Stack spacing={1}>
                      {warnings.map((warning) => (
                        <Badge key={warning} colorScheme="orange">
                          {warning}
                        </Badge>
                      ))}
                    </Stack>
                  )}
                </Box>
              </Stack>
            </Box>
          </Flex>
          <Box mt={4}>
            <Text fontWeight="bold" mb={2}>
              审阅面板
            </Text>
            <Stack spacing={3}>
              <Input placeholder="审阅者" value={reviewer} onChange={(event) => setReviewer(event.target.value)} />
              <Textarea placeholder="审阅意见" value={comment} onChange={(event) => setComment(event.target.value)} />
              <Flex gap={2}>
                <Button variant={decision === "APPROVED" ? "solid" : "outline"} colorScheme="green" onClick={() => setDecision("APPROVED")}>
                  通过
                </Button>
                <Button variant={decision === "REJECTED" ? "solid" : "outline"} colorScheme="red" onClick={() => setDecision("REJECTED")}>
                  退回
                </Button>
                <Button colorScheme="purple" onClick={handleReview} isLoading={busy}>
                  提交审阅
                </Button>
              </Flex>
            </Stack>
          </Box>
        </Box>
      </Grid>
      <Box mt={6} borderWidth={1} borderRadius="lg" p={4}>
        <Text fontWeight="bold" mb={2}>
          导出已通过数据（优先 smiles 格式）
        </Text>
        <Flex gap={3} flexWrap="wrap">
          {(["smiles", "csv", "sdf"] as const).map((fmt) => (
            <Button key={fmt} onClick={() => handleExport(fmt)}>
              {fmt.toUpperCase()}
            </Button>
          ))}
        </Flex>
      </Box>
    </Container>
  );
}

export default App;
