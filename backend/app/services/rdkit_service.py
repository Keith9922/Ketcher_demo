from __future__ import annotations

from typing import Optional, Tuple

from rdkit import Chem
from rdkit.Chem import AllChem


class RDKitParseResult:
    def __init__(self, mol: Optional[Chem.Mol], warnings: Optional[list[str]] = None):
        self.mol = mol
        self.warnings = warnings or []


def looks_like_structured_json(value: Optional[str]) -> bool:
    if value is None:
        return False
    candidate = value.strip()
    if not candidate or not candidate.startswith("{"):
        return False
    markers = ('"root"', '"atoms"', '"bonds"', '"molecule"', '"connections"', '"templates"')
    return any(marker in candidate for marker in markers)


def _looks_like_smiles(value: str) -> bool:
    candidate = value.strip()
    if not candidate:
        return False
    if "M  END" in candidate:
        return False
    return True


def _looks_like_molblock(value: str) -> bool:
    candidate = value.strip()
    if not candidate:
        return False
    # molblock 至少要有结束标记
    if "M  END" not in candidate:
        return False
    return True


def build_molecule(smiles: Optional[str], molblock: Optional[str]) -> RDKitParseResult:
    mol: Optional[Chem.Mol] = None
    warnings: list[str] = []

    if smiles:
        if looks_like_structured_json(smiles):
            warnings.append("structured_json_payload")
        elif _looks_like_smiles(smiles):
            # 容错：去除所有空白字符，允许用户输入时出现换行/空格
            normalized_smiles = "".join(smiles.split())
            mol = Chem.MolFromSmiles(normalized_smiles)
            if mol is None:
                warnings.append("smiles_parse_failed")
        else:
            warnings.append("smiles_format_invalid")
    if mol is None and molblock:
        if _looks_like_molblock(molblock):
            mol = Chem.MolFromMolBlock(molblock, sanitize=False)
            if mol is None:
                warnings.append("molblock_parse_failed")
        else:
            warnings.append("molblock_format_invalid")

    return RDKitParseResult(mol=mol, warnings=warnings)


def canonical_smiles(mol: Chem.Mol) -> str:
    return Chem.MolToSmiles(mol, canonical=True)


def mol_to_molblock(mol: Chem.Mol) -> str:
    return Chem.MolToMolBlock(mol)


def sanitize_molecule(mol: Chem.Mol) -> Tuple[bool, Optional[str]]:
    try:
        Chem.SanitizeMol(mol)
        return True, None
    except Chem.rdchem.MolSanitizationException as exc:
        return False, str(exc)
    except Exception as exc:
        return False, str(exc)


def generate_3d_molblock(mol: Chem.Mol) -> Tuple[Optional[str], list[str]]:
    warnings: list[str] = []

    try:
        working_mol = Chem.Mol(mol)
        working_mol = Chem.AddHs(working_mol)

        params = AllChem.ETKDGv3()
        params.randomSeed = 0xF00D
        embed_status = AllChem.EmbedMolecule(working_mol, params)
        if embed_status != 0:
            warnings.append("embed_3d_failed")
            return None, warnings

        try:
            optimize_status = AllChem.UFFOptimizeMolecule(working_mol, maxIters=400)
            if optimize_status != 0:
                warnings.append("uff_not_converged")
        except Exception as exc:
            warnings.append(f"uff_optimize_error:{exc}")

        working_mol = Chem.RemoveHs(working_mol)
        return Chem.MolToMolBlock(working_mol), warnings
    except Exception as exc:
        warnings.append(f"generate_3d_failed:{exc}")
        return None, warnings
