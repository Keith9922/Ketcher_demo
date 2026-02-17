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
import { Struct } from './struct';
export declare class SGroupForest {
    /** node id -> parent id */
    parent: Map<number, number>;
    /** node id -> list of child ids */
    children: Map<number, number[]>;
    atomSets: Map<number, any>;
    constructor();
    /** returns an array or s-group ids in the order of breadth-first search */
    getSGroupsBFS(): number[];
    getAtomSetRelations(newId: any, atoms: any): {
        children: number[];
        parent: number;
    };
    getPathToRoot(sgid: any): number[];
    insert({ id, atoms }: {
        id: any;
        atoms: any;
    }, parent?: number, children?: number[]): {
        parent: number;
        children: number[];
    };
    private resetParentLink;
    remove(id: any): void;
}
export declare function checkOverlapping(struct: Struct, atoms: number[] | undefined, sGroupType: 'queryComponent' | 'common'): boolean;
