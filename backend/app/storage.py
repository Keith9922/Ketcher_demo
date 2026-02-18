from __future__ import annotations

import csv
import io
import json
from datetime import datetime
from pathlib import Path
from threading import Lock
from typing import Dict, Iterable, List
from uuid import uuid4

from .schemas import (
    Annotation,
    ClaimRequest,
    QCResult,
    Review,
    ReviewRequest,
    SubmitRequest,
    Task,
    TaskCreateRequest,
    TaskSeed,
    TaskSource,
    TaskStatus,
)
from .services.qc_service import parse_and_qc
from .services.rdkit_service import looks_like_structured_json

MANUAL_REVIEW_WARNING = "manual_review_required_json_payload"


class TaskStore:
    def __init__(self, db_file: str = "tasks.json") -> None:
        self._tasks: Dict[str, Task] = {}
        self._lock = Lock()
        self._db_file = Path(db_file)
        self._load_from_disk()

    def _load_from_disk(self) -> None:
        """从文件加载任务数据"""
        if self._db_file.exists():
            try:
                with open(self._db_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    for task_dict in data:
                        task = Task(**task_dict)
                        self._tasks[task.id] = task
            except Exception as e:
                print(f"加载任务数据失败: {e}")

    def _save_to_disk(self) -> None:
        """保存任务数据到文件"""
        try:
            with open(self._db_file, "w", encoding="utf-8") as f:
                data = [task.model_dump() for task in self._tasks.values()]
                json.dump(data, f, ensure_ascii=False, indent=2, default=str)
        except Exception as e:
            print(f"保存任务数据失败: {e}")

    def list_tasks(self) -> List[Task]:
        return list(self._tasks.values())

    def create_tasks(self, payload: TaskCreateRequest) -> List[Task]:
        with self._lock:
            new_tasks = []
            for seed in payload.items:
                task_id = self._create_id()
                task = Task(
                    id=task_id,
                    title=seed.title,
                    status=TaskStatus.NEW,
                    source=TaskSource(smiles=seed.source_smiles, mol=seed.source_mol),
                )
                self._tasks[task_id] = task
                new_tasks.append(task)
            self._save_to_disk()
            return new_tasks

    def get_task(self, task_id: str) -> Task:
        try:
            return self._tasks[task_id]
        except KeyError:
            raise KeyError(f"task {task_id} not found")

    def claim_task(self, task_id: str, request: ClaimRequest) -> Task:
        with self._lock:
            task = self.get_task(task_id)
            if task.status != TaskStatus.NEW:
                raise ValueError("cannot claim unless task is NEW")
            task.status = TaskStatus.IN_PROGRESS
            task.claimed_by = request.user
            task.claimed_at = datetime.utcnow()
            self._save_to_disk()
            return task

    def submit_annotation(self, task_id: str, payload: SubmitRequest) -> Task:
        with self._lock:
            task = self.get_task(task_id)
            if task.status != TaskStatus.IN_PROGRESS:
                raise ValueError("cannot submit unless task is IN_PROGRESS")
            if not task.claimed_by:
                raise ValueError("cannot submit without claimed user")
            if task.claimed_by != payload.annotator:
                raise ValueError("annotator does not match claimed user")
            qc, canonical, molblock, _ = parse_and_qc(payload.smiles, payload.mol)
            manual_review_mode = looks_like_structured_json(payload.smiles) and not payload.mol

            # structured JSON（如绘图器序列化结果）进入人工审阅模式，不阻断提交
            if manual_review_mode and not qc.rdkit_parse_ok:
                warnings = list(dict.fromkeys([*qc.warnings, MANUAL_REVIEW_WARNING]))
                qc = QCResult(rdkit_parse_ok=False, sanitize_ok=False, warnings=warnings)
            else:
                # 提交时拦截明显错误：无法解析或规范化失败
                if not qc.rdkit_parse_ok:
                    detail = "；".join(qc.warnings) if qc.warnings else "rdkit_parse_failed"
                    raise ValueError(f"RDKit 解析失败，无法提交：{detail}")
                if not qc.sanitize_ok:
                    detail = "；".join(qc.warnings) if qc.warnings else "sanitize_failed"
                    raise ValueError(f"RDKit 校验失败，无法提交：{detail}")

            annotation = Annotation(
                annotator=payload.annotator,
                smiles=payload.smiles,
                mol=payload.mol,
                canonical_smiles=canonical,
                molblock=molblock,
                qc=qc,
                submitted_at=datetime.utcnow(),
            )
            task.annotation = annotation
            task.status = TaskStatus.SUBMITTED
            self._save_to_disk()
            return task

    def review_task(self, task_id: str, payload: ReviewRequest) -> Task:
        with self._lock:
            task = self.get_task(task_id)
            if task.status != TaskStatus.SUBMITTED:
                raise ValueError("cannot review unless task is SUBMITTED")

            # 二次兜底：QC 不通过时禁止审批为 APPROVED
            if payload.decision == TaskStatus.APPROVED:
                if not task.annotation:
                    raise ValueError("cannot approve task without annotation")
                qc = task.annotation.qc
                manual_review_allowed = MANUAL_REVIEW_WARNING in qc.warnings
                if not manual_review_allowed and not (qc.rdkit_parse_ok and qc.sanitize_ok):
                    raise ValueError("cannot approve task with failed RDKit QC")

            review = Review(
                reviewer=payload.reviewer,
                decision=payload.decision,
                comment=payload.comment,
                reviewed_at=datetime.utcnow(),
            )
            task.review = review
            task.status = payload.decision
            self._save_to_disk()
            return task

    def export(self, fmt: str) -> str:
        approved = [t for t in self._tasks.values() if t.status == TaskStatus.APPROVED]
        if fmt == "smiles":
            lines: list[str] = []
            for task in approved:
                annotation = task.annotation
                if not annotation:
                    continue
                if annotation.canonical_smiles:
                    lines.append(annotation.canonical_smiles)
                    continue
                if annotation.smiles and not looks_like_structured_json(annotation.smiles):
                    lines.append(annotation.smiles)
            return "\n".join(lines)
        if fmt == "csv":
            headers = ["id", "title", "canonical_smiles", "qc_warnings", "review_comment", "reviewed_at"]
            output = io.StringIO()
            writer = csv.writer(output)
            writer.writerow(headers)
            for task in approved:
                canonical = (task.annotation and task.annotation.canonical_smiles) or ""
                warnings = task.annotation and ";".join(task.annotation.qc.warnings)
                comment = (task.review and task.review.comment) or ""
                reviewed_at = (task.review and task.review.reviewed_at.isoformat()) or ""
                writer.writerow([task.id, task.title, canonical, warnings or "", comment, reviewed_at])
            return output.getvalue().rstrip("\r\n")
        if fmt == "sdf":
            blocks = []
            for task in approved:
                molblock = task.annotation and task.annotation.molblock
                if molblock:
                    blocks.append(molblock)
            return "\n$$$$\n".join(blocks)
        raise ValueError("unsupported export format")

    def seed(self, seeds: Iterable[TaskSeed]) -> None:
        # 如果已经有数据，不重新seed
        if self._tasks:
            print(f"已有 {len(self._tasks)} 个任务，跳过seed")
            return
        request = TaskCreateRequest(items=list(seeds))
        self.create_tasks(request)

    def _create_id(self) -> str:
        return f"task_{uuid4().hex[:8]}"
