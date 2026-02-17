/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/
import { BaseMicromoleculeEntity } from "./BaseMicromoleculeEntity";
import { Vec2 } from "./vec2";
import { KetFileNode } from "../serializers";
export interface KetFileImageNode extends KetFileNode<string> {
    format: string;
    boundingBox: {
        x: number;
        y: number;
        z?: number;
        width: number;
        height: number;
    };
}
export interface ImageReferencePositions {
    topLeftPosition: Vec2;
    topMiddlePosition: Vec2;
    topRightPosition: Vec2;
    rightMiddlePosition: Vec2;
    bottomRightPosition: Vec2;
    bottomMiddlePosition: Vec2;
    bottomLeftPosition: Vec2;
    leftMiddlePosition: Vec2;
}
export declare type ImageReferenceName = keyof ImageReferencePositions;
export interface ImageReferencePositionInfo {
    name: ImageReferenceName;
    offset: Vec2;
}
export declare class Image extends BaseMicromoleculeEntity {
    bitmap: string;
    private _center;
    private halfSize;
    constructor(bitmap: string, _center: Vec2, halfSize: Vec2);
    getTopLeftPosition(): Vec2;
    getTopRightPosition(): Vec2;
    getBottomRightPosition(): Vec2;
    getBottomLeftPosition(): Vec2;
    getCornerPositions(): Vec2[];
    getReferencePositions(): ImageReferencePositions;
    clone(): Image;
    addPositionOffset(offset: Vec2): void;
    resize(topLeftPosition: Vec2, bottomRightPosition: Vec2): void;
    rescaleSize(scale: number): void;
    center(): Vec2;
    toKetNode(): KetFileImageNode;
    static fromKetNode(ketFileNode: KetFileImageNode): Image;
}
