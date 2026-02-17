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
import { Struct } from "../../../domain/entities/struct";
import { Vec2 } from "../../../domain/entities/vec2";
import { BondAtoms } from "./utils.types";
declare function setFracAngle(angle: number): void;
declare function calcAngle(pos0: Vec2, pos1: Vec2): number;
declare function fracAngle(angle: any, angle2: any): number;
declare function calcNewAtomPos(pos0: Vec2, pos1: Vec2, ctrlKey: boolean): Vec2;
declare function degrees(angle: number): number;
declare function mergeBondsParams(struct1: Struct, bond1: BondAtoms, struct2: Struct, bond2: BondAtoms): {
    merged: boolean;
    angle: number;
    scale: number;
    cross: boolean;
};
declare const _default: {
    calcAngle: typeof calcAngle;
    fracAngle: typeof fracAngle;
    degrees: typeof degrees;
    setFracAngle: typeof setFracAngle;
    mergeBondsParams: typeof mergeBondsParams;
    calcNewAtomPos: typeof calcNewAtomPos;
};
export default _default;
