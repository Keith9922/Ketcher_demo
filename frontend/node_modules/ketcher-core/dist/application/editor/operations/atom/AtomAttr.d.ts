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
    aid?: any;
    attribute?: any;
    value?: any;
};
export declare class AtomAttr extends BaseOperation {
    data: Data | null;
    data2: Data | null;
    constructor(atomId?: any, attribute?: any, value?: any);
    execute(restruct: ReStruct): void;
    invert(): AtomAttr;
    isDummy(restruct: ReStruct): boolean;
}
export {};
