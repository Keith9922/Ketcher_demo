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
import { Point, Vec2 } from './vec2';
import { Struct, StructProperty } from './struct';
export declare enum StereoFlag {
    Mixed = "MIXED",
    Abs = "ABS",
    And = "AND",
    Or = "OR"
}
export declare class Fragment {
    #private;
    stereoFlagPosition?: Vec2;
    properties?: Array<StructProperty>;
    get stereoAtoms(): Array<number>;
    get enhancedStereoFlag(): StereoFlag | undefined;
    constructor(stereoAtoms?: Array<number>, stereoFlagPosition?: Point | null, properties?: Array<StructProperty>);
    static getDefaultStereoFlagPosition(struct: Struct, fragmentId: number): Vec2 | undefined;
    clone(aidMap: Map<number, number>): Fragment;
    updateStereoFlag(struct: Struct): StereoFlag | undefined;
    updateStereoAtom(struct: Struct, aid: number, frId: number, isAdd: boolean): void;
    addStereoAtom(atomId: number): boolean;
    deleteStereoAtom(struct: Struct, fragmentId: number, atomId: number): boolean;
}
