export function Smiles(): void;
export class Smiles {
    smiles: string;
    writtenAtoms: any[];
    writtenComponents: number;
    ignoreErrors: boolean;
    isBondInRing(bid: any): any;
    saveMolecule(struct: any, ignoreErrors: any): string;
    atoms: any[] | undefined;
    inLoop: {} | undefined;
    touchedCistransbonds: any;
    comma: boolean | undefined;
    writeCycleNumber(n: any): void;
    writeAtom(mol: any, idx: any, aromatic: any, lowercase: any, chirality: any): void;
    markCisTrans(mol: any): void;
    cis_trans: CisTrans | undefined;
    dbonds: any[] | undefined;
    updateSideBonds(mol: any, bondIdx: any): boolean;
    calcBondDirection(mol: any, idx: any, vprev: any): any;
    writeRadicals(mol: any): void;
}
export namespace Smiles {
    function _Atom(hCount: any): void;
}
import CisTrans from "./cis_trans";
