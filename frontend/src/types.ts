export type TaskStatus = "NEW" | "IN_PROGRESS" | "SUBMITTED" | "APPROVED" | "REJECTED";

export interface SourcePayload {
  smiles?: string;
  mol?: string;
}

export interface QCResult {
  rdkit_parse_ok: boolean;
  sanitize_ok: boolean;
  warnings: string[];
}

export interface Annotation {
  annotator: string;
  smiles?: string;
  mol?: string;
  canonical_smiles?: string;
  molblock?: string;
  qc: QCResult;
  submitted_at: string;
}

export interface Review {
  reviewer: string;
  decision: TaskStatus;
  comment?: string;
  reviewed_at: string;
}

export interface TaskContext {
  ph?: number | null;
  solvent?: string | null;
  temperature?: number | null;
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  source: SourcePayload;
  claimed_by?: string | null;
  claimed_at?: string | null;
  annotation?: Annotation | null;
  review?: Review | null;
  context?: TaskContext;
}
