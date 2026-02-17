# 分子标注 Demo

## 项目结构

- `backend/`: FastAPI + RDKit 实现的任务/解析/导出接口。
- `frontend/`: Vite + React + Chakra UI 构建的任务、标注、审阅、导出页，内嵌 Ketcher 组件库用于结构编辑。
- `DEMO_GAPS.md`: 记录关键约束、默认决策、未决问题，方便后续迭代。

## 环境准备（已创建 `DEMO` 环境）

```bash
conda activate DEMO
conda install -c conda-forge rdkit
pip install -r backend/requirements.txt
cd frontend
npm install
```

> 由于当前环境缺乏网络权限，`pip install` 与 `conda install rdkit` 可能失败。请在有网络的环境中重新执行以上命令。

## 后端运行

```bash
conda activate DEMO
uvicorn backend.app.main:app --reload --port 8000
```

接口说明详见 `backend/app/main.py`（`/api/chem/parse`, `/api/tasks`, `/api/export` 等），请求/响应结构采用 `backend/app/schemas.py`。

## 前端运行

```bash
cd frontend
npm run dev
```

- 默认会尝试连接本地后端（`http://localhost:8000`，通过 Vite 代理 `/api`）。
- 若后端不可用，会自动回退到本地演示模式。
- 若需强制本地演示模式：`VITE_ENABLE_BACKEND=false npm run dev`。
- 若需切回远端结构服务：设置 `VITE_KETCHER_MODE=remote`（默认 `local`）。

## 测试

```bash
conda activate DEMO
pytest backend/tests
```

若测试失败，请先确认已成功安装 `backend/requirements.txt` 里的依赖。

## 限制与下一步

- 运行时仍需联网获取 PyPI/conda 依赖，文档中列出的 `DEMO` 环境是在可访问网络的机器上完成安装的。
- `frontend/src/components/KetcherEditor.tsx` 通过 `React.lazy` 动态加载 `ketcher-react`，并用 `Textarea` 作为备用输入，便于后续根据 Ketcher API 精细调整。
