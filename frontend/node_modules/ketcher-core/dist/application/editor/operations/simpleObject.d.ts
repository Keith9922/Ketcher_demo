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
import { SimpleObjectMode, Vec2 } from "../../../domain/entities";
import Base from './base';
interface SimpleObjectAddData {
    id?: number;
    pos: Array<Vec2>;
    mode: SimpleObjectMode;
    toCircle: boolean;
}
export declare class SimpleObjectAdd extends Base {
    data: SimpleObjectAddData;
    constructor(pos?: Array<Vec2>, mode?: SimpleObjectMode, toCircle?: boolean, id?: number);
    execute(restruct: any): void;
    invert(): Base;
}
interface SimpleObjectDeleteData {
    id: number;
    pos?: Array<Vec2>;
    mode?: SimpleObjectMode;
    toCircle?: boolean;
}
export declare class SimpleObjectDelete extends Base {
    data: SimpleObjectDeleteData;
    performed: boolean;
    constructor(id: number);
    execute(restruct: any): void;
    invert(): Base;
}
interface SimpleObjectMoveData {
    id: number;
    d: any;
    noinvalidate: boolean;
}
export declare class SimpleObjectMove extends Base {
    data: SimpleObjectMoveData;
    constructor(id: number, d: any, noinvalidate: boolean);
    execute(restruct: any): void;
    invert(): Base;
}
interface SimpleObjectResizeData {
    id: number;
    d: any;
    current: Vec2;
    anchor: Vec2;
    noinvalidate: boolean;
    toCircle: boolean;
}
export declare class SimpleObjectResize extends Base {
    data: SimpleObjectResizeData;
    constructor(id: number, d: any, current: Vec2, anchor: any, noinvalidate: boolean, toCircle: boolean);
    execute(restruct: any): void;
    invert(): Base;
}
export declare function makeCircleFromEllipse(position0: Vec2, position1: Vec2): Vec2;
export {};
