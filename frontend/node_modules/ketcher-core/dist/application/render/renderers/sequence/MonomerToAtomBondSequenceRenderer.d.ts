import { BaseSequenceRenderer } from "./BaseSequenceRenderer";
import { MonomerToAtomBond, SubChainNode, Vec2 } from "../../../../domain/entities";
export declare class MonomerToAtomBondSequenceRenderer extends BaseSequenceRenderer {
    monomerToAtomBond: MonomerToAtomBond;
    private monomerNode;
    constructor(monomerToAtomBond: MonomerToAtomBond, monomerNode: SubChainNode);
    private get monomer();
    private get atom();
    get scaledPosition(): {
        startPosition: Vec2;
        endPosition: Vec2;
    };
    get center(): Vec2;
    private get mainLineY();
    show(): void;
    private getBondPath;
    moveStart(): void;
    moveEnd(): void;
    get isSnake(): false;
    isMonomersOnSameHorizontalLine(): false;
}
