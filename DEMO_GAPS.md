# Demo 落地缺口与待明确项（基于 `DESIGN.md`）

更新时间：2026-02-16

## 0. 已完成前置项

- 已创建 Conda 环境：`DEMO`
- 环境路径：`/opt/miniconda3/envs/DEMO`
- 激活命令：`conda activate DEMO`

## 1. 当前阻塞级缺口（P0）

1. 接口约束有歧义，可能导致前后端联调失败
- `/api/chem/parse` 的 `required: []` 允许空请求体，应强约束“`smiles` 与 `mol` 至少一个必填”。
- 缺少状态流转非法操作的错误码约定（如未 claim 就 submit、未 submit 就 review）。
- 缺少统一错误响应模型（`code/message/detail`）。

2. 导出协议不完整
- `/api/export` 目前统一 `text/plain`，但 `csv/sdf/smiles` 应分别明确 `Content-Type` 和文件名策略。
- 需要明确导出字段集合（是否包含 `qc.warnings`、`review.comment`、时间戳等）。

3. 数据模型仍偏宽泛
- `Task.annotation` 与 `Task.review` 在 OpenAPI 中是宽泛 `object`，缺少显式 schema，容易出现字段漂移。
- 时间字段规范未明确（建议统一 UTC ISO8601）。

4. Demo 验收标准缺失
- 缺少“完成 demo 的最小验收清单”，例如：
- 至少 3 条 seed 任务。
- 至少 1 条 `REJECTED -> 重新提交 -> APPROVED` 回路。
- 至少 1 次 `csv` 与 `sdf` 导出成功。

## 2. 高优先级建议（P1）

1. 明确版本矩阵
- Python、FastAPI、RDKit、Node、React、Chakra UI、Ketcher 的目标版本。
- 建议把 RDKit 固定为 conda-forge 可安装版本，避免跨平台差异。

2. 明确运行拓扑
- 前端端口（如 `5173`）与后端端口（`8000`）固定。
- FastAPI CORS 白名单明确写入文档。

3. 明确任务并发语义（即使是内存版）
- `claim` 是否允许重复领取。
- 同一任务是否允许不同 annotator 覆盖提交。

## 3. 建议默认决策（如无额外指示可直接执行）

1. 识别范围：仅支持 `SMILES/MOLBlock` 输入（不做图片 OCR 或名称识别）。
2. 前端：`React + Chakra UI + Ketcher 组件库`，在现有组件基础上可做按需定制（样式/toolbar/快捷按钮），Chakra 负责业务 UI。
3. 后端：`FastAPI + RDKit`，`/api/chem/parse` 与 `/api/tasks/{id}/submit` 复用同一解析/QC 逻辑。
4. 导出：`smiles` 为纯文本，`csv` 为 `text/csv`，`sdf` 为 `chemical/x-mdl-sdfile`。
5. 错误模型：统一 `{ "code": "...", "message": "...", "detail": ... }`。

## 4. 开发前建议确认的 4 个问题

1. 导出是否必须同时支持 `smiles/csv/sdf` 三种格式？
2. Demo 阶段是否不做登录，仅通过 `annotator/reviewer` 字段传用户名？
3. Ketcher 组件定制的范围（比如 toolbar/样式）是否允许直接修改组件库源码？
4. 是否需要在 demo 内加入最小自动化测试（后端 API 单测）？
