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
export declare class Pile<TValue = any> extends Set<TValue> {
    find(predicate: (item: TValue) => boolean): TValue | null;
    equals(setB: Pile): boolean;
    isSuperset(subset: Pile): boolean;
    filter(expression: (arg: TValue) => boolean): Pile<TValue>;
    union(setB: Pile): Pile<TValue>;
    intersection(setB: Pile): Pile<TValue>;
    /**
     * Union multiple sets which have intersections
     * @example ```
     * const setA = new Pile([0, 1])
     * const setB = new Pile([1, 2])
     * const setC = new Pile([2, 3])
     * const setD = new Pile([4, 5])
     * console.log(Pile.unionMultiple([setA, setB, setC, setD]))
     * // [{0, 1, 2, 3}, {4, 5}]
     * ```
     */
    static unionIntersections<T>(sets: Array<Pile<T>>): Array<Pile<T>>;
}
