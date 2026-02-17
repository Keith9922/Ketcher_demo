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
import { Vec2 } from './vec2';
export declare class Box2Abs {
    #private;
    readonly p0: Vec2;
    readonly p1: Vec2;
    constructor();
    constructor(p: Vec2);
    constructor(p0: Vec2, p1: Vec2);
    constructor(x0: number, y0: number, x1: number, y1: number);
    toString(): string;
    clone(): Box2Abs;
    extend(lp: Vec2, rb: Vec2): Box2Abs;
    include(p: Vec2): Box2Abs;
    contains(p: Vec2, ext?: number): boolean;
    translate(d: Vec2): Box2Abs;
    transform(f: (p: Vec2, options: any) => Vec2, options: any): Box2Abs;
    sz(): Vec2;
    centre(): Vec2;
    pos(): Vec2;
    hasZeroArea(): boolean;
    static fromRelBox(relBox: any): Box2Abs;
    static union(b1: Box2Abs, b2: Box2Abs): Box2Abs;
    static segmentIntersection(a: Vec2, b: Vec2, c: Vec2, d: Vec2): boolean;
}
