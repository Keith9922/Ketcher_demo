# 分子标注平台 Demo 设计文档（无持久化版）

> 目的：跑通“结构编辑 → 标注提交 → 质检 → 审阅 → 导出”的最小闭环，证明具备 Ketcher + RDKit + 标注流程的端到端能力。

## 1. 项目范围与目标

### 1.1 目标
- 把前端绘制的分子结构转为可追溯、可审核、可信的数据。
- 用 RDKit 做解析、规范化与基础质检。
- 跑通标注、审阅、导出流程（内存存储，重启清空）。

### 1.2 非目标
- 不做真实化学反应预测或量子化学模拟。
- 不解决环境依赖导致的多态结构问题，只做标准化与提示。
- 不做数据库持久化。

## 2. 总体架构

### 2.1 分层
- 前端：React + Ketcher
- 后端：FastAPI + RDKit（可选 MolVS 作为标准化与验证）
- 存储：内存（Python 进程内结构体）

### 2.2 数据流
1. 前端 Ketcher 生成结构（SMILES/MOL）。
2. 提交到后端，RDKit 解析并生成 canonical SMILES 与质检结果。
3. 进入审阅流程，审阅员通过或退回。
4. 导出已通过数据。

## 3. 数据模型（MVP）

### 3.1 任务实体
```json
{
  "id": "task_001",
  "title": "Mol-0001",
  "status": "NEW",
  "source": {
    "smiles": "CCO",
    "mol": null
  },
  "annotation": {
    "annotator": "alice",
    "smiles": "CCO",
    "mol": "...",
    "canonical_smiles": "CCO",
    "qc": {
      "rdkit_parse_ok": true,
      "sanitize_ok": true,
      "warnings": ["tautomer_possible"]
    },
    "submitted_at": "2026-02-16T10:05:00Z"
  },
  "review": {
    "reviewer": "bob",
    "decision": "APPROVED",
    "comment": "结构正确",
    "reviewed_at": "2026-02-16T10:10:00Z"
  },
  "context": {
    "ph": null,
    "solvent": null,
    "temperature": null
  }
}
```

### 3.2 状态机
- `NEW` → `IN_PROGRESS` → `SUBMITTED` → `APPROVED` / `REJECTED`

## 4. 可执行的接口定义（OpenAPI 3.0）

> 说明：此处给出可直接落地为 FastAPI 的 OpenAPI 规范。路径与模型已最小化。

```yaml
openapi: 3.0.3
info:
  title: Molecular Annotation Demo API
  version: 0.1.0
servers:
  - url: http://localhost:8000
paths:
  /api/chem/parse:
    post:
      summary: Parse and normalize molecule
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChemParseRequest'
      responses:
        '200':
          description: Parse result
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ChemParseResponse'
  /api/tasks:
    get:
      summary: List tasks
      responses:
        '200':
          description: Task list
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Task'
    post:
      summary: Create task(s)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskCreateRequest'
      responses:
        '201':
          description: Created tasks
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Task'
  /api/tasks/{id}:
    get:
      summary: Get task detail
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Task detail
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
  /api/tasks/{id}/claim:
    post:
      summary: Claim a task
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ClaimRequest'
      responses:
        '200':
          description: Updated task
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
  /api/tasks/{id}/submit:
    post:
      summary: Submit annotation
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SubmitRequest'
      responses:
        '200':
          description: Updated task
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
  /api/tasks/{id}/review:
    post:
      summary: Review submission
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ReviewRequest'
      responses:
        '200':
          description: Updated task
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Task'
  /api/export:
    get:
      summary: Export approved data
      parameters:
        - name: format
          in: query
          required: true
          schema:
            type: string
            enum: [smiles, csv, sdf]
      responses:
        '200':
          description: Export payload
          content:
            text/plain:
              schema:
                type: string
components:
  schemas:
    ChemParseRequest:
      type: object
      properties:
        smiles:
          type: string
          nullable: true
        mol:
          type: string
          nullable: true
      required: []
    ChemParseResponse:
      type: object
      properties:
        ok:
          type: boolean
        canonical_smiles:
          type: string
          nullable: true
        molblock:
          type: string
          nullable: true
        qc:
          $ref: '#/components/schemas/QCResult'
    TaskCreateRequest:
      type: object
      properties:
        items:
          type: array
          items:
            $ref: '#/components/schemas/TaskSeed'
      required: [items]
    TaskSeed:
      type: object
      properties:
        title:
          type: string
        source_smiles:
          type: string
          nullable: true
        source_mol:
          type: string
          nullable: true
      required: [title]
    ClaimRequest:
      type: object
      properties:
        user:
          type: string
      required: [user]
    SubmitRequest:
      type: object
      properties:
        annotator:
          type: string
        smiles:
          type: string
          nullable: true
        mol:
          type: string
          nullable: true
      required: [annotator]
    ReviewRequest:
      type: object
      properties:
        reviewer:
          type: string
        decision:
          type: string
          enum: [APPROVED, REJECTED]
        comment:
          type: string
          nullable: true
      required: [reviewer, decision]
    QCResult:
      type: object
      properties:
        rdkit_parse_ok:
          type: boolean
        sanitize_ok:
          type: boolean
        warnings:
          type: array
          items:
            type: string
    Task:
      type: object
      properties:
        id:
          type: string
        title:
          type: string
        status:
          type: string
          enum: [NEW, IN_PROGRESS, SUBMITTED, APPROVED, REJECTED]
        source:
          type: object
          properties:
            smiles:
              type: string
              nullable: true
            mol:
              type: string
              nullable: true
        annotation:
          type: object
          nullable: true
        review:
          type: object
          nullable: true
        context:
          type: object
          properties:
            ph:
              type: number
              nullable: true
            solvent:
              type: string
              nullable: true
            temperature:
              type: number
              nullable: true
```

## 5. 前后端设计与交互逻辑

### 5.1 前端页面与交互

1. 任务列表页
- 展示任务 `id/title/status`。
- 可领取任务（调用 `/api/tasks/{id}/claim`）。

2. 标注页
- Ketcher 画结构。
- 支持粘贴 SMILES 或上传 MOL（可选）。
- 提交按钮调用 `/api/tasks/{id}/submit`。
- 提交后展示 RDKit 质检结果与 warnings。

3. 审阅页
- 展示源结构 vs 标注结构（可用 canonical SMILES 作为对比）。
- 展示 QC warnings。
- 通过/退回调用 `/api/tasks/{id}/review`。

4. 导出页
- 导出已通过数据：调用 `/api/export?format=smiles`。

### 5.2 前端组件划分
- TaskList
- TaskDetail
- KetcherEditor
- QCResultPanel
- ReviewPanel

### 5.3 后端模块划分
- api.chem: 结构解析与质检接口
- api.tasks: 任务状态流转与审阅
- services.rdkit: RDKit 解析与 canonical 生成
- services.qc: 质检规则（可选 MolVS）
- storage.memory: 内存存储

## 6. 质检逻辑（MVP）

1. RDKit 解析
- 解析失败则 `rdkit_parse_ok=false`，输出 warning。

2. 规范化
- 生成 canonical SMILES。

3. 基础警告
- 解析失败
- sanitize 失败
- 手性缺失（可选）

## 7. 关于环境依赖结构的处理策略

- Demo 不做环境依赖结构解析。
- 保留原始输入 + 标准化输出。
- `context` 字段预留 pH/溶剂/温度等信息。
- 以 warnings 形式提示“结构可能存在多态性”。

## 8. 里程碑（建议）

- M0：Ketcher + RDKit 贯通（解析 + canonical）
- M1：任务 + 标注提交 + 质检展示
- M2：审阅流程 + 导出
- M3：批量导入（可选）

