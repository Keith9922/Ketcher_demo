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
import { ReStruct } from "../../../render";
import { Vec2 } from "../../../../domain/entities";
import Base from '../base';
export declare const ARROW_MAX_SNAPPING_ANGLE: number;
interface RxnArrowResizeData {
    id: number;
    d: Vec2;
    current: Vec2;
    anchor: Vec2 | null;
    noinvalidate: boolean;
}
export declare class RxnArrowResize extends Base {
    data: RxnArrowResizeData;
    isSnappingEnabled: boolean;
    constructor(id: number, d: Vec2, current: Vec2, anchor: Vec2 | null, noinvalidate: boolean, isSnappingEnabled: boolean);
    execute(restruct: ReStruct): void;
    invert(): Base;
}
export declare function getSnappedArrowVector(arrow: Vec2): Vec2;
export {};
