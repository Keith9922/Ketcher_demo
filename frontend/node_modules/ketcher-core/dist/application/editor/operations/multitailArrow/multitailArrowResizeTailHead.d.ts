import { BaseOperation } from "../base";
import { ReStruct } from "../../../render";
export declare class MultitailArrowResizeTailHead extends BaseOperation {
    private id;
    private offset;
    private isHead;
    constructor(id: number, offset: number, isHead: boolean);
    execute(reStruct: ReStruct): void;
    invert(): BaseOperation;
}
