from __future__ import annotations

from typing import Optional, Tuple

from ..schemas import QCResult
from .rdkit_service import (
    RDKitParseResult,
    build_molecule,
    canonical_smiles,
    mol_to_molblock,
    sanitize_molecule,
)


def parse_and_qc(
    smiles: Optional[str], mol: Optional[str]
) -> Tuple[QCResult, Optional[str], Optional[str], Optional[RDKitParseResult]]:
    result = build_molecule(smiles, mol)
    qc = QCResult(rdkit_parse_ok=bool(result.mol), sanitize_ok=False, warnings=list(result.warnings))
    canonical = None
    molblock = None

    if result.mol:
        sanitized, detail = sanitize_molecule(result.mol)
        qc.sanitize_ok = sanitized
        if detail:
            qc.warnings.append(f"sanitize_error:{detail}")
        try:
            canonical = canonical_smiles(result.mol)
        except Exception as exc:
            qc.warnings.append(f"canonical_failure:{exc}")
        try:
            molblock = mol_to_molblock(result.mol)
        except Exception as exc:
            qc.warnings.append(f"molblock_failure:{exc}")

    return qc, canonical, molblock, result
