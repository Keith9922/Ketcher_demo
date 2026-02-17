import { ReStruct } from "../../render";
import { ImageReferencePositionInfo, Vec2 } from "../../../domain/entities";
import { Action } from "./..";
export declare function fromImageCreation(reStruct: ReStruct, bitmap: string, center: Vec2, halfSize: Vec2): Action;
export declare function fromImageDeletion(reStruct: ReStruct, id: number): Action;
export declare function fromImageMove(reStruct: ReStruct, id: number, offset: Vec2): Action;
export declare function fromImageResize(reStruct: ReStruct, id: number, position: Vec2, referencePositionInfo: ImageReferencePositionInfo): Action;
