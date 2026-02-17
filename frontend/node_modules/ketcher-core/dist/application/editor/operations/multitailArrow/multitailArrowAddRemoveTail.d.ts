import { BaseOperation } from "../base";
import { ReStruct } from "../../../render";
import { FixedPrecisionCoordinates } from "../../../../domain/entities";
export declare class MultitailArrowAddTail extends BaseOperation {
    private itemId;
    private tailId?;
    private coordinate?;
    constructor(itemId: number, tailId?: number | undefined, coordinate?: FixedPrecisionCoordinates | undefined);
    execute(reStruct: ReStruct): void;
    invert(): MultitailArrowRemoveTail;
}
export declare class MultitailArrowRemoveTail extends BaseOperation {
    private itemId;
    private tailId;
    private coordinate?;
    constructor(itemId: number, tailId: number);
    execute(reStruct: ReStruct): void;
    invert(): BaseOperation;
}
