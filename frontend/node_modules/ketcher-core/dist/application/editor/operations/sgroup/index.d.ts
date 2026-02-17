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
import { SGroup } from "../../../../domain/entities";
import { ReStruct } from '../../../render';
import { BaseOperation } from '../base';
declare type Data = {
    sgid: any;
    type?: any;
    pp?: any;
    expanded?: boolean;
    name?: string;
    oldSgroup?: SGroup;
};
declare class SGroupCreate extends BaseOperation {
    data: Data;
    constructor(sgroupId?: any, type?: any, pp?: any, expanded?: boolean, name?: string, oldSgroup?: SGroup);
    execute(restruct: ReStruct): void;
    invert(): SGroupDelete;
}
declare class SGroupDelete extends BaseOperation {
    data: Data;
    constructor(sgroupId?: any);
    execute(restruct: ReStruct): void;
    invert(): SGroupCreate;
}
export { SGroupCreate, SGroupDelete };
export * from './sgroupAtom';
export * from './SGroupAttr';
export * from './SGroupDataMove';
export * from './sgroupHierarchy';
export * from './sgroupAttachmentPoints';
