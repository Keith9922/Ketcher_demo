from __future__ import annotations

from datetime import datetime
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


class TaskStore:
    def __init__(self) -> None:
        self._tasks: Dict[str, Task] = {}
        self._lock = Lock()

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
            return new_tasks

    def get_task(self, task_id: str) -> Task:
        try:
            return self._tasks[task_id]
        except KeyError:
            raise KeyError(f"task {task_id} not found")

    def claim_task(self, task_id: str, request: ClaimRequest) -> Task:
        with self._lock:
            task = self.get_task(task_id)
            if task.status == TaskStatus.NEW:
                task.status = TaskStatus.IN_PROGRESS
            return task

    def submit_annotation(self, task_id: str, payload: SubmitRequest) -> Task:
        with self._lock:
            task = self.get_task(task_id)
            if task.status not in (TaskStatus.NEW, TaskStatus.IN_PROGRESS):
                raise ValueError("cannot submit unless task is NEW or IN_PROGRESS")
            qc, canonical, molblock, _ = parse_and_qc(payload.smiles, payload.mol)
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
            return task

    def review_task(self, task_id: str, payload: ReviewRequest) -> Task:
        with self._lock:
            task = self.get_task(task_id)
            if task.status != TaskStatus.SUBMITTED:
                raise ValueError("cannot review unless task is SUBMITTED")
            review = Review(
                reviewer=payload.reviewer,
                decision=payload.decision,
                comment=payload.comment,
                reviewed_at=datetime.utcnow(),
            )
            task.review = review
            task.status = payload.decision
            return task

    def export(self, fmt: str) -> str:
        approved = [t for t in self._tasks.values() if t.status == TaskStatus.APPROVED]
        if fmt == "smiles":
            lines = [(t.annotation and t.annotation.canonical_smiles) or t.source.smiles or "" for t in approved]
            return "\n".join(lines)
        if fmt == "csv":
            headers = ["id", "title", "canonical_smiles", "qc_warnings", "review_comment", "reviewed_at"]
            rows = []
            for task in approved:
                canonical = (task.annotation and task.annotation.canonical_smiles) or ""
                warnings = task.annotation and ",".join(task.annotation.qc.warnings)
                comment = (task.review and task.review.comment) or ""
                reviewed_at = (task.review and task.review.reviewed_at.isoformat()) or ""
                rows.append(",".join([task.id, task.title, canonical, warnings or "", comment, reviewed_at]))
            return "\n".join([",".join(headers)] + rows)
        if fmt == "sdf":
            blocks = []
            for task in approved:
                molblock = task.annotation and task.annotation.molblock
                if molblock:
                    blocks.append(molblock)
            return "\n$$$$\n".join(blocks)
        raise ValueError("unsupported export format")

    def seed(self, seeds: Iterable[TaskSeed]) -> None:
        request = TaskCreateRequest(items=list(seeds))
        self.create_tasks(request)

    def _create_id(self) -> str:
        return f"task_{uuid4().hex[:8]}"
