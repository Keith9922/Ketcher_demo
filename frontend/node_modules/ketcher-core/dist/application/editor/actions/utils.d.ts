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
import { AtomAttributes, AtomQueryProperties, Bond, Struct, Vec2 } from "../../../domain/entities";
import { ReStruct } from "../../render";
import { EditorSelection } from '../editor.types';
export declare type AtomType = 'single' | 'list' | 'pseudo';
export declare type AtomAttributeName = keyof AtomAttributes;
export declare type AtomQueryPropertiesName = keyof AtomQueryProperties;
export declare type AtomAllAttributeName = AtomAttributeName | AtomQueryPropertiesName;
export declare type AtomAllAttributeValue = AtomAttributes[AtomAttributeName] | AtomQueryProperties[AtomQueryPropertiesName];
export declare function atomGetAttr(restruct: ReStruct, aid: number, name: AtomAttributeName): string | number | boolean | AtomQueryProperties | import("../../../domain/entities").AtomList | Vec2 | null | undefined;
export declare function atomGetDegree(restruct: any, aid: any): any;
export declare function atomGetSGroups(restruct: any, atomId: number): number[];
export declare function atomGetPos(restruct: any, id: any): any;
export declare function findStereoAtoms(struct: Struct, atomIds: number[] | undefined): number[];
export declare function structSelection(struct: any): EditorSelection;
export declare function formatSelection(selection: any): any;
export declare function atomForNewBond(restruct: any, id: any, bond?: any): {
    atom: any;
    pos: Vec2;
};
export declare function getRelSGroupsBySelection(struct: Struct, selectedAtoms: number[]): import("../../../domain/entities").Pool<import("domain/entities").SGroup>;
export declare function isAttachmentBond({ begin, end }: Bond, selection: EditorSelection): boolean;
