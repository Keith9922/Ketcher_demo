import { BaseOperation } from "../base";
import { ReStruct } from "../../../render";
export declare class MultitailArrowMoveHeadTail extends BaseOperation {
    private id;
    private offset;
    private name;
    private tailId;
    private normalize?;
    constructor(id: number, offset: number, name: string, tailId: number | null, normalize?: true | undefined);
    execute(reStruct: ReStruct): void;
    invert(): BaseOperation;
}
