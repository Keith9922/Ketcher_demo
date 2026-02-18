import { useCallback, useEffect, useMemo, useState } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  OrderedList,
  ListItem,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { Task, TaskStatus } from "./types";
import { KetcherEditor } from "./components/KetcherEditor";
import { apiClient } from "./api/client";

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

interface KetcherWindowApi {
  getMolfile?: () => Promise<string>;
  getSmiles?: () => Promise<string>;
}

const MANUAL_REVIEW_WARNING = "manual_review_required_json_payload";

function getApiErrorMessage(error: unknown): string {
  if (typeof error !== "object" || !error || !("response" in error)) {
    return "后端校验失败，请稍后重试";
  }
  const maybeAxiosError = error as {
    response?: {
      data?: {
        detail?: { message?: string } | string;
        message?: string;
      };
    };
  };
  const detail = maybeAxiosError.response?.data?.detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0] as { msg?: string; loc?: unknown[] };
    const location = Array.isArray(first?.loc) ? first.loc.join(".") : "";
    const message = first?.msg?.trim();
    if (location && message) {
      return `${location}: ${message}`;
    }
    if (message) {
      return message;
    }
  }
  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }
  if (detail && typeof detail === "object" && "message" in detail && typeof detail.message === "string" && detail.message.trim()) {
    return detail.message;
  }
  const message = maybeAxiosError.response?.data?.message;
  if (message && message.trim()) {
    return message;
  }
  return "后端校验失败，请稍后重试";
}

async function getActiveEditorMolfile(): Promise<string | undefined> {
  if (typeof window === "undefined") {
    return undefined;
  }
  const editor = (window as Window & { ketcher?: KetcherWindowApi }).ketcher;
  if (!editor?.getMolfile) {
    return undefined;
  }
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const molfile = await editor.getMolfile();
      const normalized = molfile?.trim();
      if (normalized) {
        return normalized;
      }
    } catch (error) {
      if (attempt === 2) {
        console.warn("读取当前编辑器 molfile 失败", error);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 80));
  }
  return undefined;
}

async function getActiveEditorSmiles(): Promise<string | undefined> {
  if (typeof window === "undefined") {
    return undefined;
  }
  const editor = (window as Window & { ketcher?: KetcherWindowApi }).ketcher;
  if (!editor?.getSmiles) {
    return undefined;
  }
  try {
    const smiles = await editor.getSmiles();
    const normalized = smiles?.trim();
    return normalized || undefined;
  } catch (error) {
    console.warn("读取当前编辑器 smiles 失败", error);
    return undefined;
  }
}

function normalizeSmilesCandidate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const candidate = value.trim();
  return candidate || undefined;
}

function looksLikeStructuredJson(value: string): boolean {
  const candidate = value.trim();
  if (!candidate || !candidate.startsWith("{")) return false;
  return ["\"root\"", "\"atoms\"", "\"bonds\"", "\"molecule\"", "\"connections\"", "\"templates\""].some((token) =>
    candidate.includes(token),
  );
}

function looksLikeMolblock(value: string): boolean {
  const candidate = value.trim();
  if (!candidate) return false;
  return candidate.includes("M  END");
}

function normalizeReviewDecision(value: TaskStatus): "APPROVED" | "REJECTED" {
  return value === "REJECTED" ? "REJECTED" : "APPROVED";
}

function App() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editorSmilesByTask, setEditorSmilesByTask] = useState<Record<string, string>>({});
  const [editorMolByTask, setEditorMolByTask] = useState<Record<string, string>>({});
  const [annotator, setAnnotator] = useState("alice");
  const [reviewer, setReviewer] = useState("bob");
  const [comment, setComment] = useState("");
  const [decision, setDecision] = useState<TaskStatus>("APPROVED");
  const [busy, setBusy] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);

  const fetchTasks = useCallback(
    async (showSuccessToast = false) => {
      setLoadingTasks(true);
      try {
        const { data } = await apiClient.get<Task[]>("/api/tasks");
        setTasks(data);
        if (showSuccessToast) {
          toast({ status: "success", title: "任务列表已刷新" });
        }
      } catch (error) {
        toast({
          status: "error",
          title: "加载任务失败",
          description: getApiErrorMessage(error),
          duration: 5000,
        });
      } finally {
        setLoadingTasks(false);
      }
    },
    [toast],
  );

  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (tasks.length === 0) {
      if (selectedId) {
        setSelectedId(null);
      }
      return;
    }
    if (!selectedId || !tasks.some((task) => task.id === selectedId)) {
      setSelectedId(tasks[0].id);
    }
  }, [selectedId, tasks]);

  const selectedTask = useMemo(() => {
    if (selectedId) {
      return tasks.find((task) => task.id === selectedId) ?? tasks[0] ?? null;
    }
    return tasks[0] ?? null;
  }, [selectedId, tasks]);

  const selectedEditorSmiles = useMemo(() => {
    if (!selectedTask) {
      return "";
    }
    const taskDraft = editorSmilesByTask[selectedTask.id];
    if (taskDraft !== undefined) {
      return taskDraft;
    }
    return selectedTask.annotation?.canonical_smiles || selectedTask.annotation?.smiles || selectedTask.source?.smiles || "";
  }, [editorSmilesByTask, selectedTask]);

  const handleEditorSmilesChange = useCallback(
    (nextSmiles: string) => {
      if (!selectedTask?.id) {
        return;
      }
      setEditorSmilesByTask((prev) => {
        if (prev[selectedTask.id] === nextSmiles) {
          return prev;
        }
        return {
          ...prev,
          [selectedTask.id]: nextSmiles,
        };
      });
    },
    [selectedTask?.id],
  );

  const handleEditorMolChange = useCallback(
    (nextMolfile: string) => {
      if (!selectedTask?.id) {
        return;
      }
      setEditorMolByTask((prev) => {
        if (prev[selectedTask.id] === nextMolfile) {
          return prev;
        }
        return {
          ...prev,
          [selectedTask.id]: nextMolfile,
        };
      });
    },
    [selectedTask?.id],
  );

  const warnings = useMemo(() => selectedTask?.annotation?.qc.warnings ?? [], [selectedTask]);

  const replaceTaskInList = useCallback((updatedTask: Task) => {
    setTasks((prev) => {
      const index = prev.findIndex((task) => task.id === updatedTask.id);
      if (index === -1) {
        return [updatedTask, ...prev];
      }
      const next = [...prev];
      next[index] = updatedTask;
      return next;
    });
  }, []);

  const refreshTasks = useCallback(() => {
    void fetchTasks(true);
  }, [fetchTasks]);

  const handleClaim = async () => {
    if (!selectedTask) return;
    if (selectedTask.status !== "NEW") {
      toast({ status: "warning", title: "当前任务状态不允许领取" });
      return;
    }
    setBusy(true);
    try {
      const user = annotator.trim();
      const { data } = await apiClient.post<Task>(`/api/tasks/${selectedTask.id}/claim`, { user: user || "annotator" });
      replaceTaskInList(data);
      toast({ status: "success", title: "任务已领取" });
    } catch (error) {
      toast({
        status: "error",
        title: "领取失败",
        description: getApiErrorMessage(error),
        duration: 5000,
      });
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTask) return;
    if (selectedTask.status !== "IN_PROGRESS") {
      toast({ status: "warning", title: "当前任务状态不允许提交" });
      return;
    }
    const rawInput = (selectedEditorSmiles || selectedTask.source.smiles || "").trim();
    if (!rawInput) {
      toast({
        status: "error",
        title: "结构为空，不能提交",
        description: "请至少绘制或输入一个有效结构。",
      });
      return;
    }
    const currentAnnotator = annotator.trim() || "annotator";
    if (selectedTask.claimed_by && selectedTask.claimed_by !== currentAnnotator) {
      toast({
        status: "error",
        title: "提交人不匹配领取人",
        description: `当前任务领取人为 ${selectedTask.claimed_by}，请使用同一标注员提交。`,
        duration: 5000,
      });
      return;
    }

    setBusy(true);
    try {
      const cachedMolfile = editorMolByTask[selectedTask.id];
      const activeSmiles = await getActiveEditorSmiles();
      const activeMolfile = await getActiveEditorMolfile();
      const inputMolCandidate = looksLikeMolblock(rawInput) ? rawInput : undefined;
      const inputSmilesCandidate = inputMolCandidate ? undefined : normalizeSmilesCandidate(rawInput);
      const cachedMolCandidate = cachedMolfile && looksLikeMolblock(cachedMolfile) ? cachedMolfile : undefined;
      const activeMolCandidate = activeMolfile && looksLikeMolblock(activeMolfile) ? activeMolfile : undefined;
      const molCandidate = cachedMolCandidate || activeMolCandidate || inputMolCandidate;
      const smilesCandidate = normalizeSmilesCandidate(activeSmiles) || inputSmilesCandidate;
      const finalSmiles =
        smilesCandidate && molCandidate && looksLikeStructuredJson(smilesCandidate) ? undefined : smilesCandidate;

      if (!finalSmiles && !molCandidate) {
        toast({
          status: "error",
          title: "无法识别结构",
          description: "请在编辑器中重新绘制后再提交。",
          duration: 5000,
        });
        return;
      }

      const payload = {
        annotator: currentAnnotator,
        smiles: finalSmiles,
        mol: molCandidate,
      };
      const { data } = await apiClient.post<Task>(`/api/tasks/${selectedTask.id}/submit`, payload);
      replaceTaskInList(data);

      setEditorSmilesByTask((prev) => ({
        ...prev,
        [selectedTask.id]: data.annotation?.canonical_smiles || data.annotation?.smiles || data.source.smiles || rawInput,
      }));
      const manualReviewRequired = data.annotation?.qc?.warnings?.includes(MANUAL_REVIEW_WARNING);
      toast({
        status: "success",
        title: manualReviewRequired ? "标注已提交（需人工审阅）" : "标注已提交（RDKit 已通过）",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "提交失败",
        description: getApiErrorMessage(error),
        duration: 5000,
      });
    } finally {
      setBusy(false);
    }
  };

  const handleReview = async () => {
    if (!selectedTask) return;
    if (selectedTask.status !== "SUBMITTED") {
      toast({ status: "warning", title: "当前任务状态不允许审阅" });
      return;
    }
    if (decision === "APPROVED") {
      const qc = selectedTask.annotation?.qc;
      const manualReviewAllowed = qc?.warnings?.includes(MANUAL_REVIEW_WARNING) ?? false;
      if (!manualReviewAllowed && (!qc || !qc.rdkit_parse_ok || !qc.sanitize_ok)) {
        toast({
          status: "error",
          title: "QC 未通过，不能审批通过",
          description: "请退回给标注员修正后再提交。",
        });
        return;
      }
    }
    setBusy(true);
    try {
      const normalizedDecision = normalizeReviewDecision(decision);
      const payload = {
        reviewer: reviewer.trim() || "reviewer",
        decision: normalizedDecision,
        // 兼容可能存在的旧后端字段
        status: normalizedDecision,
        // 传 null 兼容“字段必填但可为空”的旧后端实现
        comment: comment.trim() || null,
      };
      const { data } = await apiClient.post<Task>(`/api/tasks/${selectedTask.id}/review`, payload);
      replaceTaskInList(data);
      toast({ status: "success", title: "审阅完成" });
    } catch (error) {
      toast({
        status: "error",
        title: "审阅提交失败",
        description: getApiErrorMessage(error),
        duration: 5000,
      });
    } finally {
      setBusy(false);
    }
  };

  const handleExport = async (format: "smiles" | "csv" | "sdf") => {
    setBusy(true);
    try {
      const response = await apiClient.get(`/api/export`, {
        params: { format },
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: response.headers["content-type"] || "text/plain" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `molecules.${format}`;
      anchor.click();
      URL.revokeObjectURL(url);
      toast({ status: "success", title: `已导出 ${format.toUpperCase()} 格式` });
    } catch (error) {
      toast({
        status: "error",
        title: "导出失败",
        description: getApiErrorMessage(error),
        duration: 5000,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container maxW="8xl" py={6}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">分子标注 Demo</Heading>
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          📖 操作说明
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>操作说明</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box mb={4}>
              <Text fontWeight="bold" mb={2} color="blue.600">
                👤 标注人员工作流程：
              </Text>
              <OrderedList spacing={2} pl={4}>
                <ListItem>切换到「👨‍💻 标注工作台」标签页</ListItem>
                <ListItem>从左侧任务列表中选择状态为 <Badge colorScheme="gray">NEW</Badge> 的任务</ListItem>
                <ListItem>输入标注人员姓名（默认 alice）</ListItem>
                <ListItem>点击「领取任务」，任务状态变为 <Badge colorScheme="blue">IN PROGRESS</Badge></ListItem>
                <ListItem>在 Ketcher 编辑器中绘制或修改分子结构</ListItem>
                <ListItem>点击「提交标注」，系统自动进行 QC 检查</ListItem>
                <ListItem>任务状态变为 <Badge colorScheme="orange">SUBMITTED</Badge>，等待审阅</ListItem>
              </OrderedList>
            </Box>

            <Box mb={4}>
              <Text fontWeight="bold" mb={2} color="purple.600">
                👨‍⚖️ 审阅人员工作流程：
              </Text>
              <OrderedList spacing={2} pl={4}>
                <ListItem>切换到「👨‍⚖️ 审阅工作台」标签页</ListItem>
                <ListItem>从左侧任务列表中选择状态为 <Badge colorScheme="orange">SUBMITTED</Badge> 的任务</ListItem>
                <ListItem>输入审阅者姓名（默认 bob）</ListItem>
                <ListItem>查看分子结构、标注信息和 QC 状态（编辑器为只读）</ListItem>
                <ListItem>填写审阅意见（可选）</ListItem>
                <ListItem>选择「✅ 通过」或「❌ 退回」</ListItem>
                <ListItem>点击「提交审阅」完成审阅</ListItem>
              </OrderedList>
            </Box>

            <Box borderWidth={1} borderRadius="md" p={3} bg="yellow.50" borderColor="yellow.200">
              <Text fontSize="sm" fontWeight="bold" mb={1}>
                💡 提示：
              </Text>
              <Text fontSize="sm">
                • 标注和审阅工作台分开，互不干扰
                <br />
                • 完成操作后，任务列表会自动刷新显示最新状态
                <br />
                • QC 警告会实时显示在右侧面板
                <br />
                • 已通过的任务可通过「导出」功能下载为 SMILES/CSV/SDF 格式
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Grid templateColumns={{ base: "1fr", xl: "320px minmax(0, 1fr)" }} gap={6}>
        <Box borderWidth={1} borderRadius="lg" p={4} maxH="md" overflowY="auto">
          <Flex justify="space-between" mb={4} align="center">
            <Text fontWeight="bold">任务列表</Text>
            <Button size="xs" onClick={refreshTasks} isLoading={loadingTasks}>
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
          <Tabs colorScheme="blue" isLazy lazyBehavior="unmount">
            <TabList mb={4}>
              <Tab>
                <Text fontWeight="bold">👨‍💻 标注工作台</Text>
              </Tab>
              <Tab>
                <Text fontWeight="bold">👨‍⚖️ 审阅工作台</Text>
              </Tab>
            </TabList>

            <TabPanels>
              {/* 标注工作台 */}
              <TabPanel p={0}>
                <Flex justify="space-between" mb={4}>
                  <Text fontSize="md" fontWeight="bold">
                    当前任务
                  </Text>
                  <Badge colorScheme={selectedTask ? statusScheme[selectedTask.status] : "gray"}>
                    {selectedTask ? getStatusLabel(selectedTask.status) : "未选任务"}
                  </Badge>
                </Flex>
                <Flex gap={4} flexDir={{ base: "column", lg: "row" }}>
                  <Box flex={1}>
                    <KetcherEditor
                      key={`annotate-${selectedTask?.id || "none"}`}
                      smiles={selectedEditorSmiles}
                      onChange={handleEditorSmilesChange}
                      onMolChange={handleEditorMolChange}
                      height="600px"
                      readOnly={false}
                    />
                  </Box>
                  <Box w={{ base: "100%", lg: "300px" }}>
                    <Stack spacing={3}>
                      <Input placeholder="标注人员" value={annotator} onChange={(event) => setAnnotator(event.target.value)} />
                      <Button colorScheme="blue" onClick={handleClaim} isDisabled={!selectedTask || selectedTask.status !== "NEW"} isLoading={busy}>
                        领取任务
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={handleSubmit}
                        isDisabled={!selectedTask || selectedTask.status !== "IN_PROGRESS"}
                        isLoading={busy}
                      >
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
                      {selectedTask?.annotation && (
                        <Box borderWidth={1} borderRadius="md" p={2} bg="blue.50">
                          <Text fontSize="sm" fontWeight="semibold" mb={1}>
                            标注信息
                          </Text>
                          <Text fontSize="xs">标注人：{selectedTask.annotation.annotator}</Text>
                          <Text fontSize="xs">提交时间：{new Date(selectedTask.annotation.submitted_at).toLocaleString()}</Text>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </Flex>
              </TabPanel>

              {/* 审阅工作台 */}
              <TabPanel p={0}>
                <Flex justify="space-between" mb={4}>
                  <Text fontSize="md" fontWeight="bold">
                    待审阅任务
                  </Text>
                  <Badge colorScheme={selectedTask ? statusScheme[selectedTask.status] : "gray"}>
                    {selectedTask ? getStatusLabel(selectedTask.status) : "未选任务"}
                  </Badge>
                </Flex>
                <Flex gap={4} flexDir={{ base: "column", lg: "row" }}>
                  <Box flex={1}>
                    <KetcherEditor
                      key={`review-${selectedTask?.id || "none"}-${selectedTask?.annotation?.submitted_at || "source"}`}
                      smiles={selectedTask?.annotation?.canonical_smiles || selectedTask?.annotation?.smiles || selectedTask?.source?.smiles || ""}
                      onChange={() => {}}
                      height="600px"
                      readOnly
                    />
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      💡 审阅模式下编辑器为只读，仅供查看
                    </Text>
                  </Box>
                  <Box w={{ base: "100%", lg: "300px" }}>
                    <Stack spacing={3}>
                      {selectedTask?.annotation && (
                        <Box borderWidth={1} borderRadius="md" p={3} bg="gray.50">
                          {(() => {
                            const manualReviewMode = selectedTask.annotation?.qc.warnings.includes(MANUAL_REVIEW_WARNING);
                            return (
                              <>
                          <Text fontSize="sm" fontWeight="semibold" mb={2}>
                            标注信息
                          </Text>
                          <Text fontSize="xs" mb={1}>标注人：{selectedTask.annotation.annotator}</Text>
                          <Text fontSize="xs" mb={1}>提交时间：{new Date(selectedTask.annotation.submitted_at).toLocaleString()}</Text>
                          <Text fontSize="xs" mb={1}>SMILES：{selectedTask.annotation.canonical_smiles || selectedTask.annotation.smiles}</Text>
                          <Box mt={2}>
                            <Text fontSize="xs" fontWeight="semibold">QC 状态：</Text>
                            <Text fontSize="xs">
                              解析状态：{manualReviewMode ? "📝 人工审阅模式" : selectedTask.annotation.qc.rdkit_parse_ok ? "✅" : "❌"}
                            </Text>
                            <Text fontSize="xs">
                              验证状态：{manualReviewMode ? "📝 人工审阅模式" : selectedTask.annotation.qc.sanitize_ok ? "✅" : "❌"}
                            </Text>
                            {selectedTask.annotation.qc.warnings.length > 0 && (
                              <Box mt={1}>
                                <Text fontSize="xs" fontWeight="semibold">警告：</Text>
                                {selectedTask.annotation.qc.warnings.map((w) => (
                                  <Badge key={w} colorScheme="orange" size="sm" mr={1}>
                                    {w}
                                  </Badge>
                                ))}
                              </Box>
                            )}
                          </Box>
                              </>
                            );
                          })()}
                        </Box>
                      )}
                      <Input placeholder="审阅者" value={reviewer} onChange={(event) => setReviewer(event.target.value)} />
                      <Textarea placeholder="审阅意见（可选）" value={comment} onChange={(event) => setComment(event.target.value)} rows={4} />
                      <Flex gap={2}>
                        <Button
                          flex={1}
                          variant={decision === "APPROVED" ? "solid" : "outline"}
                          colorScheme="green"
                          onClick={() => setDecision("APPROVED")}
                        >
                          ✅ 通过
                        </Button>
                        <Button
                          flex={1}
                          variant={decision === "REJECTED" ? "solid" : "outline"}
                          colorScheme="red"
                          onClick={() => setDecision("REJECTED")}
                        >
                          ❌ 退回
                        </Button>
                      </Flex>
                      <Button
                        colorScheme="purple"
                        onClick={handleReview}
                        isDisabled={!selectedTask || selectedTask.status !== "SUBMITTED"}
                        isLoading={busy}
                        size="lg"
                      >
                        提交审阅
                      </Button>
                      {selectedTask?.review && (
                        <Box borderWidth={1} borderRadius="md" p={3} bg="purple.50">
                          <Text fontSize="sm" fontWeight="semibold" mb={2}>
                            审阅记录
                          </Text>
                          <Text fontSize="xs" mb={1}>审阅人：{selectedTask.review.reviewer}</Text>
                          <Text fontSize="xs" mb={1}>决策：
                            <Badge colorScheme={selectedTask.review.decision === "APPROVED" ? "green" : "red"} ml={1}>
                              {selectedTask.review.decision}
                            </Badge>
                          </Text>
                          <Text fontSize="xs" mb={1}>时间：{new Date(selectedTask.review.reviewed_at).toLocaleString()}</Text>
                          {selectedTask.review.comment && (
                            <Text fontSize="xs" mt={2}>意见：{selectedTask.review.comment}</Text>
                          )}
                        </Box>
                      )}
                    </Stack>
                  </Box>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
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
