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
export declare class Pool<TValue = any> extends Map<number, TValue> {
    private nextId;
    add(item: TValue): number;
    newId(): number;
    keyOf(item: TValue): number | null;
    find(predicate: (key: number, value: TValue) => boolean): number | null;
    filter(predicate: (key: number, value: TValue) => boolean): Pool<TValue>;
    some(predicate: (value: TValue) => boolean): boolean;
    changeInitiallySelectedPropertiesForPool(invalidate?: boolean): void;
    clone(): Pool<TValue>;
}
