import { PolymerBond } from "../../../../domain/entities/PolymerBond";
import { BaseSequenceRenderer } from "./BaseSequenceRenderer";
import { SubChainNode, Vec2 } from "../../../../domain/entities";
export declare class PolymerBondSequenceRenderer extends BaseSequenceRenderer {
    polymerBond: PolymerBond;
    private firstNode?;
    private secondNode?;
    private selectionElement;
    constructor(polymerBond: PolymerBond, firstNode?: SubChainNode | undefined, secondNode?: SubChainNode | undefined);
    private get isHydrogenBond();
    private get firstMonomer();
    private get secondMonomer();
    private get areMonomersOnSameRow();
    get scaledPosition(): {
        startPosition: Vec2;
        endPosition: Vec2;
    };
    get center(): Vec2;
    private get mainLineY();
    show(): void;
    drawSelection(): void;
    private getBondPath;
    moveStart(): void;
    moveEnd(): void;
    get isSnake(): false;
    isMonomersOnSameHorizontalLine(): false;
}
