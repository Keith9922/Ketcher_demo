from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import PlainTextResponse

from .schemas import (
    ChemParseRequest,
    ChemParseResponse,
    ClaimRequest,
    ErrorResponse,
    ReviewRequest,
    SubmitRequest,
    Task,
    TaskCreateRequest,
    TaskSeed,
)
from .services.qc_service import parse_and_qc
from .storage import TaskStore

store = TaskStore()


@asynccontextmanager
async def lifespan(_: FastAPI):
    seeds = [
        TaskSeed(title="Mol-0001", source_smiles="CCO"),
        TaskSeed(title="Mol-0002", source_smiles="c1ccccc1"),
        TaskSeed(title="Mol-0003", source_smiles="C1CCCCC1"),
    ]
    store.seed(seeds)
    yield


app = FastAPI(title="分子标注 Demo", version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8888", "http://127.0.0.1:8888"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def respond_error(code: str, message: str, detail: str | None = None) -> ErrorResponse:
    return ErrorResponse(code=code, message=message, detail=detail)


@app.post(
    "/api/chem/parse",
    response_model=ChemParseResponse,
    responses={400: {"model": ErrorResponse}},
)
def chem_parse(payload: ChemParseRequest) -> ChemParseResponse:
    qc, canonical, molblock, result = parse_and_qc(payload.smiles, payload.mol)
    if not result.mol:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=respond_error("parse_failure", "无法解析分子结构"),
        )
    return ChemParseResponse(ok=qc.sanitize_ok, canonical_smiles=canonical, molblock=molblock, qc=qc)


@app.get("/api/tasks", response_model=list[Task])
def list_tasks() -> list[Task]:
    return store.list_tasks()


@app.post("/api/tasks", response_model=list[Task], status_code=status.HTTP_201_CREATED)
def create_tasks(payload: TaskCreateRequest) -> list[Task]:
    return store.create_tasks(payload)


@app.get("/api/tasks/{task_id}", response_model=Task)
def get_task(task_id: str) -> Task:
    try:
        return store.get_task(task_id)
    except KeyError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=respond_error("not_found", str(exc)))


@app.post("/api/tasks/{task_id}/claim", response_model=Task)
def claim_task(task_id: str, payload: ClaimRequest) -> Task:
    try:
        return store.claim_task(task_id, payload)
    except KeyError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=respond_error("not_found", str(exc)))


@app.post("/api/tasks/{task_id}/submit", response_model=Task)
def submit_task(task_id: str, payload: SubmitRequest) -> Task:
    try:
        return store.submit_annotation(task_id, payload)
    except KeyError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=respond_error("not_found", str(exc)))
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=respond_error("invalid_state", str(exc)))


@app.post("/api/tasks/{task_id}/review", response_model=Task)
def review_task(task_id: str, payload: ReviewRequest) -> Task:
    try:
        return store.review_task(task_id, payload)
    except KeyError as exc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=respond_error("not_found", str(exc)))
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=respond_error("invalid_state", str(exc)))


@app.get("/api/export")
def export_data(format: str = Query(..., pattern="^(smiles|csv|sdf)$")) -> PlainTextResponse:
    mime = {
        "smiles": "text/plain",
        "csv": "text/csv",
        "sdf": "chemical/x-mdl-sdfile",
    }
    try:
        payload = store.export(format)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=respond_error("unsupported_format", str(exc)),
        )
    return PlainTextResponse(
        payload,
        media_type=mime[format],
        headers={"Content-Disposition": f"attachment; filename=molecules.{format}"},
    )
