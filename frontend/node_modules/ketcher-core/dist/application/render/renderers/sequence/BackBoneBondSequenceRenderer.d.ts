import { BaseSequenceRenderer } from "./BaseSequenceRenderer";
import { PolymerBond } from "../../../../domain/entities/PolymerBond";
export declare class BackBoneBondSequenceRenderer extends BaseSequenceRenderer {
    constructor(polymerBond: PolymerBond);
    get isSnake(): false;
    isMonomersOnSameHorizontalLine(): false;
    moveStart(): void;
    moveEnd(): void;
}
