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
import { Bond, Vec2, AtomAttributes, BondAttributes } from "../../../domain/entities";
import { Action } from './action';
import { ReSGroup, ReStruct } from '../../render';
export declare function fromBondAddition(reStruct: ReStruct, bond: Partial<BondAttributes>, begin: number | AtomAttributes, end: number | AtomAttributes, beginAtomPos?: Vec2, endAtomPos?: Vec2): [Action, number, number, number];
export declare function fromBondsAttrs(restruct: ReStruct, ids: Array<number> | number, attrs: Bond, reset?: boolean): Action;
export declare function fromBondsMerge(restruct: ReStruct, mergeMap: Map<number, number>): Action;
export declare function fromBondFlipping(restruct: ReStruct, id: number): Action;
export declare function fromBondStereoUpdate(restruct: ReStruct, bond: Bond, withReverse?: boolean): Action;
export declare function bondChangingAction(restruct: ReStruct, itemID: number, bond: Bond, bondProps: any): Action;
export declare function removeAttachmentPointFromSuperatom(sgroup: ReSGroup, beginAtomId: number | undefined, endAtomId: number | undefined, action: Action, restruct: ReStruct): void;
