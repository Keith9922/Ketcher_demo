import { BaseOperation } from "../base";
import { MultitailArrow } from "../../../../domain/entities/multitailArrow";
import { ReStruct } from "../../../render";
interface MultitailArrowUpsertData {
    id?: number;
}
interface MultitailArrowDeleteData {
    id: number;
}
export declare class MultitailArrowUpsert extends BaseOperation {
    private readonly multitailArrow;
    data: MultitailArrowUpsertData;
    constructor(multitailArrow: MultitailArrow, id?: number);
    execute(reStruct: ReStruct): void;
    invert(): BaseOperation;
}
export declare class MultitailArrowDelete extends BaseOperation {
    private multitailArrow?;
    data: MultitailArrowDeleteData;
    constructor(id: number);
    execute(reStruct: ReStruct): void;
    invert(): BaseOperation;
}
export {};
