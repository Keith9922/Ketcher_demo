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
import { Atom, Bond, SGroup, Struct } from "../../../entities";
export declare function toRlabel(values: any): number;
export declare function moleculeToStruct(ketItem: any): Struct;
export declare function atomToStruct(source: any): Atom;
export declare function rglabelToStruct(source: any): Atom;
/**
 *
 * @param source
 * @param atomOffset – if bond is a part of a fragment, then we need to consider atoms from previous fragment.
 * source.atoms contains numbers related to fragment, but we need to count atoms related to struct. Example:
 * fragments: [{
 *   atoms: [...],
 *   bonds: [...], this bonds point to atoms in the first fragment
 * }, {
 *   atoms: [...],
 *   bonds: [...], this bonds point to atoms in the second fragment
 * }]
 * When we add bonds from second fragment we need to count atoms from fragments[0].atoms.length + 1, not from zero
 * @returns newly created Bond
 */
export declare function bondToStruct(source: any, atomOffset?: number): Bond;
export declare function sgroupToStruct(source: any): SGroup;
