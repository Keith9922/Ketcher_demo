import { Vec2 } from "../../../../domain/entities";
import { ReStruct } from "../../../render";
import BaseOperation from "../base";
export declare class MultitailArrowMove extends BaseOperation {
    private id;
    private offset;
    constructor(id: number, offset: Vec2);
    execute(reStruct: ReStruct): void;
    invert(): MultitailArrowMove;
}
