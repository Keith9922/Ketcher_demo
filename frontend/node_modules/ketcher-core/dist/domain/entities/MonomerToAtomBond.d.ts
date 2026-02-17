import { Atom } from "./CoreAtom";
import { BaseMonomer } from "./BaseMonomer";
import { MonomerToAtomBondRenderer } from "../../application/render/renderers/MonomerToAtomBondRenderer";
import { MonomerToAtomBondSequenceRenderer } from "../../application/render/renderers/sequence/MonomerToAtomBondSequenceRenderer";
import { BaseBond } from './BaseBond';
export declare class MonomerToAtomBond extends BaseBond {
    monomer: BaseMonomer;
    atom: Atom;
    renderer?: MonomerToAtomBondRenderer | MonomerToAtomBondSequenceRenderer;
    constructor(monomer: BaseMonomer, atom: Atom);
    setRenderer(renderer: MonomerToAtomBondRenderer | MonomerToAtomBondSequenceRenderer): void;
    get firstEndEntity(): BaseMonomer;
    get secondEndEntity(): Atom;
}
