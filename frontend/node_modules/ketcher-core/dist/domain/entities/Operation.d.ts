import { RenderersManager } from "../../application/render/renderers/RenderersManager";
import { BaseMonomer } from "./BaseMonomer";
import { PolymerBond } from "./PolymerBond";
import { Atom } from "./CoreAtom";
import { Bond } from "./CoreBond";
import { MonomerToAtomBond } from "./MonomerToAtomBond";
export interface Operation {
    priority?: number;
    monomer?: BaseMonomer;
    atom?: Atom;
    bond?: Bond;
    monomerToAtomBond?: MonomerToAtomBond;
    polymerBond?: PolymerBond;
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
    executeAfterAllOperations?(renderersManager: RenderersManager): void;
    invertAfterAllOperations?(renderersManager: RenderersManager): void;
}
