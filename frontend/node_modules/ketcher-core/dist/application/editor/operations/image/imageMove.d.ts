import { BaseOperation } from "../base";
import { Vec2 } from "../../../../domain/entities";
import { ReStruct } from "../../../render";
export declare class ImageMove extends BaseOperation {
    private id;
    private offset;
    constructor(id: number, offset: Vec2);
    execute(reStruct: ReStruct): void;
    invert(): BaseOperation;
}
