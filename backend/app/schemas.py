from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field, field_validator, model_validator


class TaskStatus(str, Enum):
    NEW = "NEW"
    IN_PROGRESS = "IN_PROGRESS"
    SUBMITTED = "SUBMITTED"
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"


class ErrorResponse(BaseModel):
    code: str
    message: str
    detail: Optional[str] = None


class QCResult(BaseModel):
    rdkit_parse_ok: bool
    sanitize_ok: bool
    warnings: List[str] = Field(default_factory=list)


class ChemParseRequest(BaseModel):
    smiles: Optional[str] = None
    mol: Optional[str] = None

    @field_validator("smiles", "mol", mode="before")
    @classmethod
    def strip_empty(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        stripped = value.strip()
        return stripped or None

    @model_validator(mode="after")
    def require_smiles_or_mol(self) -> "ChemParseRequest":
        if not self.smiles and not self.mol:
            raise ValueError("at least one of smiles or mol must be provided")
        return self


class ChemParseResponse(BaseModel):
    ok: bool
    canonical_smiles: Optional[str]
    molblock: Optional[str]
    qc: QCResult


class TaskSource(BaseModel):
    smiles: Optional[str]
    mol: Optional[str]


class Annotation(BaseModel):
    annotator: str
    smiles: Optional[str]
    mol: Optional[str]
    canonical_smiles: Optional[str]
    molblock: Optional[str]
    qc: QCResult
    submitted_at: datetime


class Review(BaseModel):
    reviewer: str
    decision: TaskStatus
    comment: Optional[str]
    reviewed_at: datetime


class TaskContext(BaseModel):
    ph: Optional[float] = None
    solvent: Optional[str] = None
    temperature: Optional[float] = None


class Task(BaseModel):
    id: str
    title: str
    status: TaskStatus = TaskStatus.NEW
    source: TaskSource
    annotation: Optional[Annotation] = None
    review: Optional[Review] = None
    context: TaskContext = Field(default_factory=TaskContext)


class TaskSeed(BaseModel):
    title: str
    source_smiles: Optional[str] = None
    source_mol: Optional[str] = None


class TaskCreateRequest(BaseModel):
    items: List[TaskSeed]


class ClaimRequest(BaseModel):
    user: str


class SubmitRequest(BaseModel):
    annotator: str
    smiles: Optional[str] = None
    mol: Optional[str] = None

    @field_validator("smiles", "mol", mode="before")
    @classmethod
    def strip_empty(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        stripped = value.strip()
        return stripped or None

    @model_validator(mode="after")
    def require_smiles_or_mol(self) -> "SubmitRequest":
        if not self.smiles and not self.mol:
            raise ValueError("at least one of smiles or mol must be provided")
        return self


class ReviewRequest(BaseModel):
    reviewer: str
    decision: TaskStatus
    comment: Optional[str]

    @field_validator("decision")
    @classmethod
    def decision_must_be_final(cls, value: TaskStatus) -> TaskStatus:
        if value not in (TaskStatus.APPROVED, TaskStatus.REJECTED):
            raise ValueError("decision must be APPROVED or REJECTED")
        return value
