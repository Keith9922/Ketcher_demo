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
/** @internal */
export declare class HalfBond {
    begin: number;
    end: number;
    bid: number;
    dir: Vec2;
    norm: Vec2;
    ang: number;
    p: Vec2;
    loop: number;
    contra: number;
    next: number;
    leftSin: number;
    leftCos: number;
    leftNeighbor: number;
    rightSin: number;
    rightCos: number;
    rightNeighbor: number;
    constructor(begin: number, end: number, bid: number);
}
