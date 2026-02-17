import { BaseOperation } from "../base";
import { ImageReferenceName, Vec2 } from "../../../../domain/entities";
import { ReStruct } from "../../../render";
export declare class ImageResize extends BaseOperation {
    private id;
    private position;
    private referencePositionName;
    private previousPosition;
    constructor(id: number, position: Vec2, referencePositionName: ImageReferenceName);
    execute(reStruct: ReStruct): void;
    invert(): BaseOperation;
}
