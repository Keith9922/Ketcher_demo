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
import { Action } from './action';
import ReStruct from "../../render/restruct/restruct";
export declare function fromAtomAddition(restruct: any, pos: any, atom: any): Action;
export declare function fromAtomsAttrs(restruct: ReStruct, ids: Array<number> | number, attrs: any, reset: boolean | null): Action;
export declare function fromStereoAtomAttrs(restruct: any, aid: any, attrs: any, withReverse: any): Action;
export declare function fromAtomsFragmentAttr(restruct: any, aids: any, newfrid: any): Action;
/**
 * @param restruct { ReStruct }
 * @param srcId { number }
 * @param dstId { number }
 * @return { Action }
 */
export declare function fromAtomMerge(restruct: any, srcId: any, dstId: any): Action;
export declare function mergeFragmentsIfNeeded(action: any, restruct: any, srcId: any, dstId: any): number;
export declare function mergeSgroups(action: any, restruct: any, srcAtoms: any, dstAtom: any): void;
export declare function checkAtomValence(restruct: any, atomId: any): Action;
