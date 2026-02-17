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
export interface Point {
    x?: number;
    y?: number;
    z?: number;
}
export declare class Vec2 {
    static ZERO: Vec2;
    static UNIT: Vec2;
    x: number;
    y: number;
    z: number;
    constructor(point: Point);
    constructor(x?: number, y?: number, z?: number);
    static dist(a: Vec2, b: Vec2): number;
    static max(v1: Vec2, v2: Vec2): Vec2;
    static min(v1: Vec2, v2: Vec2): Vec2;
    static sum(v1: Vec2, v2: Vec2): Vec2;
    static dot(v1: Vec2, v2: Vec2): number;
    static cross(v1: Vec2, v2: Vec2): number;
    static angle(v1: Vec2, v2: Vec2): number;
    static diff(v1: Vec2, v2: Vec2): Vec2;
    static lc(...args: Array<Vec2 | number>): Vec2;
    static lc2(v1: Vec2, f1: number, v2: Vec2, f2: number): Vec2;
    static centre(v1: Vec2, v2: Vec2): Vec2;
    static getLinePoint(lineStart: Vec2, lineEnd: Vec2, length: any): Vec2;
    static crossProduct(v1: Vec2, v2: Vec2): number;
    length(): number;
    equals(v: Vec2): boolean;
    add(v: Vec2): Vec2;
    add_(v: Vec2): void;
    get_xy0(): Vec2;
    sub(v: Vec2): Vec2;
    scaled(sInitial: number): Vec2;
    negated(): Vec2;
    yComplement(y1: number): Vec2;
    addScaled(v: Vec2, f: number): Vec2;
    normalized(): Vec2;
    normalize(): boolean;
    turnLeft(): Vec2;
    coordStr(): string;
    toString(): string;
    max(v: Vec2): Vec2;
    min(v: Vec2): Vec2;
    ceil(): Vec2;
    floor(): Vec2;
    rotate(angle: number): Vec2;
    rotateSC(sin: number, cos: number): Vec2;
    rotateAroundOrigin(angleInDegrees: number, origin: Vec2): Vec2;
    isInsidePolygon(points: Vec2[]): boolean;
    calculateDistanceToLine(line: [Vec2, Vec2]): number;
    oxAngle(): number;
    static radiansToDegrees(radians: number): number;
    static degrees_to_radians(degrees: number): number;
    static oxAngleForVector(v1: Vec2, v2: Vec2): number;
    static findSecondPoint(startPoint: {
        x: number;
        y: number;
    }, lineLength: number, lineAngleRadians: number): {
        x: number;
        y: number;
    };
}
