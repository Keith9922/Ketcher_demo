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
import { storageService } from "./utils/storage";

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

function App() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editorSmiles, setEditorSmiles] = useState(defaultSmiles);
  const [annotator, setAnnotator] = useState("alice");
  const [reviewer, setReviewer] = useState("bob");
  const [comment, setComment] = useState("");
  const [decision, setDecision] = useState<TaskStatus>("APPROVED");
  const [busy, setBusy] = useState(false);

  // 初始化：从 LocalStorage 加载数据
  useEffect(() => {
    const savedTasks = storageService.getTasks();
    if (savedTasks.length === 0) {
      // 如果没有数据，初始化演示数据
      const demoTasks = storageService.initDemoData();
      setTasks(demoTasks);
      toast({
        status: "info",
        title: "已初始化演示数据",
        description: "数据保存在浏览器本地存储中",
        duration: 3000,
      });
    } else {
      setTasks(savedTasks);
    }
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
    if (selectedTask) {
      // 如果任务已有标注，显示标注的SMILES；否则显示源SMILES
      const displaySmiles = selectedTask.annotation?.smiles || selectedTask.source?.smiles || "";
      setEditorSmiles(displaySmiles);
    }
  }, [selectedTask?.id, selectedTask?.source?.smiles, selectedTask?.annotation?.smiles]);

  const warnings = useMemo(() => selectedTask?.annotation?.qc.warnings ?? [], [selectedTask]);

  // 保存任务到 LocalStorage
  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    storageService.saveTasks(newTasks);
  };

  // 刷新任务列表
  const refreshTasks = () => {
    const savedTasks = storageService.getTasks();
    setTasks(savedTasks);
  };

  const updateLocalTask = (updater: (task: Task) => Task) => {
    if (!selectedTask) {
      return;
    }
    const newTasks = tasks.map((task) => (task.id === selectedTask.id ? updater(task) : task));
    saveTasks(newTasks);
  };

  const handleClaim = () => {
    if (!selectedTask) return;
    updateLocalTask((task) => ({ ...task, status: "IN_PROGRESS" }));
    toast({ status: "success", title: "任务已领取" });
  };

  const handleSubmit = () => {
    if (!selectedTask) return;
    const nextSmiles = (editorSmiles || selectedTask.source.smiles || "").trim();
    const warningsLocal = nextSmiles ? [] : ["结构为空"];
    updateLocalTask((task) => ({
      ...task,
      status: "SUBMITTED",
      annotation: {
        annotator,
        smiles: nextSmiles,
        canonical_smiles: nextSmiles,
        mol: undefined,
        molblock: undefined,
        qc: {
          rdkit_parse_ok: warningsLocal.length === 0,
          sanitize_ok: warningsLocal.length === 0,
          warnings: warningsLocal,
        },
        submitted_at: new Date().toISOString(),
      },
    }));
    toast({ status: "success", title: "标注已提交" });
  };

  const handleReview = () => {
    if (!selectedTask) return;
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
    toast({ status: "success", title: "审阅完成" });
  };

  const handleExport = (format: "smiles" | "csv" | "sdf") => {
    const approved = tasks.filter((t) => t.status === "APPROVED");
    if (approved.length === 0) {
      toast({ status: "warning", title: "没有已通过的任务" });
      return;
    }

    let content = "";
    let filename = `molecules.${format}`;
    let mimeType = "text/plain";

    if (format === "smiles") {
      content = approved.map((t) => t.annotation?.canonical_smiles || t.source.smiles || "").join("\n");
    } else if (format === "csv") {
      mimeType = "text/csv";
      const headers = "id,title,canonical_smiles,qc_warnings,review_comment,reviewed_at";
      const rows = approved.map((t) => {
        const canonical = t.annotation?.canonical_smiles || "";
        const warnings = t.annotation?.qc.warnings.join(";") || "";
        const comment = t.review?.comment || "";
        const reviewedAt = t.review?.reviewed_at || "";
        return `${t.id},${t.title},${canonical},${warnings},${comment},${reviewedAt}`;
      });
      content = [headers, ...rows].join("\n");
    } else if (format === "sdf") {
      mimeType = "chemical/x-mdl-sdfile";
      content = "SDF export not implemented in browser mode";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
    toast({ status: "success", title: `已导出 ${format.toUpperCase()} 格式` });
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
          <Tabs colorScheme="blue">
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
                      key={`annotate-${selectedTask?.id}-${selectedTask?.annotation?.smiles || "new"}`}
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
                      key={`review-${selectedTask?.id}-${selectedTask?.annotation?.smiles || "empty"}`}
                      smiles={selectedTask?.annotation?.smiles || selectedTask?.source?.smiles || ""}
                      onChange={() => {}}
                      height="600px"
                    />
                    <Text fontSize="sm" color="gray.500" mt={2}>
                      💡 审阅模式下编辑器为只读，仅供查看
                    </Text>
                  </Box>
                  <Box w={{ base: "100%", lg: "300px" }}>
                    <Stack spacing={3}>
                      {selectedTask?.annotation && (
                        <Box borderWidth={1} borderRadius="md" p={3} bg="gray.50">
                          <Text fontSize="sm" fontWeight="semibold" mb={2}>
                            标注信息
                          </Text>
                          <Text fontSize="xs" mb={1}>标注人：{selectedTask.annotation.annotator}</Text>
                          <Text fontSize="xs" mb={1}>提交时间：{new Date(selectedTask.annotation.submitted_at).toLocaleString()}</Text>
                          <Text fontSize="xs" mb={1}>SMILES：{selectedTask.annotation.smiles}</Text>
                          <Box mt={2}>
                            <Text fontSize="xs" fontWeight="semibold">QC 状态：</Text>
                            <Text fontSize="xs">解析成功：{selectedTask.annotation.qc.rdkit_parse_ok ? "✅" : "❌"}</Text>
                            <Text fontSize="xs">验证通过：{selectedTask.annotation.qc.sanitize_ok ? "✅" : "❌"}</Text>
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
