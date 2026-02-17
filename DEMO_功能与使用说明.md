# 分子标注 Demo：功能与使用说明

本文档说明当前 Demo 的实际能力、操作方式，以及 `RDKit` / `Ketcher` 在项目中的职责。

## 1. 这个 Demo 的功能

### 1.1 端到端流程（最小闭环）
- 任务列表展示与切换。
- 领取任务（`NEW -> IN_PROGRESS`）。
- 分子结构编辑（图形编辑器 + 文本兜底）。
- 提交标注（`IN_PROGRESS/NEW -> SUBMITTED`）。
- 审阅通过或退回（`SUBMITTED -> APPROVED/REJECTED`）。
- 导出已通过数据（`smiles/csv/sdf`）。

### 1.2 结构解析与质检
- 后端提供 `/api/chem/parse`，可接收 `smiles` 或 `mol`。
- 解析后返回：
  - `canonical_smiles`
  - `molblock`
  - `qc`（`rdkit_parse_ok`、`sanitize_ok`、`warnings`）

### 1.3 运行模式
- 联调模式（默认）：前端通过 `/api` 代理连本地后端 `http://localhost:8000`。
- 本地演示模式：后端不可用时自动回退，仍可演示任务流转与 UI 操作。
- Ketcher 结构服务模式：
  - 默认 `local`（本地 provider）。
  - 可切到 `remote`（通过 `/ketcher` 代理到 EPAM 公共服务）。

### 1.4 数据特性
- 当前是内存存储（进程重启后任务与标注数据会清空）。
- 后端启动时自动 seed 3 条任务（`Mol-0001~0003`）。

## 2. 这些功能怎么使用

### 2.1 启动步骤

1. 启动后端（项目根目录）：

```bash
conda activate DEMO
uvicorn backend.app.main:app --reload --port 8000
```

2. 启动前端（`frontend/` 目录）：

```bash
npm run dev
```

3. 浏览器打开：
- `http://localhost:8888`

### 2.2 页面操作流程（推荐演示顺序）

1. 在左侧任务列表点选一个 `NEW` 任务。  
2. 在右侧编辑区用 Ketcher 画结构，或直接修改 SMILES。  
3. 填写标注人员，点击“领取任务”。  
4. 点击“提交标注”。  
5. 在审阅面板填写审阅者与意见，选择“通过/退回”，点击“提交审阅”。  
6. 在底部点击导出按钮（`SMILES`/`CSV`/`SDF`）。  

说明：
- 只有 `APPROVED` 任务会被导出。
- “QC 警告”会显示后端返回的 warning 信息。

### 2.3 常用运行配置

### A. 强制本地演示模式（不连后端）
```bash
cd frontend
VITE_ENABLE_BACKEND=false npm run dev
```

### B. 指定 Ketcher 远端结构服务
```bash
cd frontend
VITE_KETCHER_MODE=remote npm run dev
```

### C. 后端接口验证
- FastAPI 文档页：`http://127.0.0.1:8000/docs`

## 3. RDKit 和 Ketcher 在项目中的作用

### 3.1 RDKit 的作用（后端能力核心）

`RDKit` 主要用于“化学结构可信化”：
- 解析输入结构：`SMILES` / `MolBlock`。
- 分子规范化输出：生成 `canonical_smiles`。
- 结构校验：`SanitizeMol` 得到 `sanitize_ok` 与错误信息。
- 结构格式转换：输出 `molblock`，用于前端回填与导出。

在代码中的落点：
- `backend/app/services/rdkit_service.py`
- `backend/app/services/qc_service.py`
- 被 `/api/chem/parse` 与 `/api/tasks/{id}/submit` 复用。

### 3.2 Ketcher 的作用（前端结构编辑核心）

`Ketcher` 负责“可视化分子编辑体验”：
- 在页面中提供化学结构绘制与编辑能力。
- 将编辑结果回传为 `SMILES`（供提交和后端校验）。
- 支持本地/远端结构服务 provider 切换。
- 当图形编辑器异常时，前端会回退到文本输入，保障流程不中断。

在代码中的落点：
- `frontend/src/components/KetcherEditor.tsx`
- `frontend/src/ketcher/localStructService.ts`

### 3.3 两者配合关系（一句话）

`Ketcher` 负责“让人画得出来”，`RDKit` 负责“让结构可校验、可规范、可导出”。
