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
import { ReStruct } from '../../render';
import { OperationType } from './OperationType';
declare type ValueOf<TObject extends object> = Readonly<TObject[keyof TObject]>;
declare type OperationType = ValueOf<typeof OperationType>;
declare class BaseOperation {
    private _inverted;
    type: OperationType;
    priority: number;
    data: any;
    constructor(type: OperationType, priority?: number);
    execute(_restruct: ReStruct): void;
    perform(restruct: ReStruct): BaseOperation;
    invert(): BaseOperation;
    isDummy(_restruct: ReStruct): boolean;
    protected static invalidateAtom(restruct: ReStruct, atomId: number, level?: any): void;
    protected static invalidateLoop(restruct: ReStruct, bondId: number): void;
    protected static invalidateBond(restruct: ReStruct, bondId: number): void;
    protected static invalidateItem(restruct: ReStruct, mapName: keyof typeof ReStruct.maps, id: number, level?: any): void;
    protected static invalidateEnhancedFlag(restruct: ReStruct, fragmentId: number): void;
}
export { BaseOperation };
export default BaseOperation;
