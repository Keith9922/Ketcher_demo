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
import { BaseOperation } from '../base';
import { ReStruct } from '../../../render';
declare type Data = {
    sgid: any;
    parent?: any;
    children?: any;
};
declare class SGroupAddToHierarchy extends BaseOperation {
    data: Data;
    constructor(sgroupId?: any, parent?: any, children?: any);
    execute(restruct: ReStruct): void;
    invert(): SGroupRemoveFromHierarchy;
}
declare class SGroupRemoveFromHierarchy extends BaseOperation {
    data: Data;
    constructor(sgroupId?: any);
    execute(restruct: any): void;
    invert(): SGroupAddToHierarchy;
}
export { SGroupAddToHierarchy, SGroupRemoveFromHierarchy };
