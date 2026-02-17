from __future__ import annotations

from typing import Optional, Tuple

from rdkit import Chem
from rdkit.Chem import rdMolDescriptors


class RDKitParseResult:
    def __init__(self, mol: Optional[Chem.Mol], warnings: Optional[list[str]] = None):
        self.mol = mol
        self.warnings = warnings or []


def build_molecule(smiles: Optional[str], molblock: Optional[str]) -> RDKitParseResult:
    mol: Optional[Chem.Mol] = None
    warnings: list[str] = []

    if smiles:
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            warnings.append("smiles_parse_failed")
    if mol is None and molblock:
        mol = Chem.MolFromMolBlock(molblock, sanitize=False)
        if mol is None:
            warnings.append("molblock_parse_failed")

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
