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
import { BaseOperation } from './base';
import { ReStruct } from '../../render';
declare type Data = {
    frid: any;
    aid: any;
};
declare class FragmentAddStereoAtom extends BaseOperation {
    data: Data;
    constructor(fragmentId: any, atomId: any);
    execute(restruct: ReStruct): void;
    invert(): FragmentDeleteStereoAtom;
}
declare class FragmentDeleteStereoAtom extends BaseOperation {
    data: Data;
    constructor(fragmentId: any, atomId: any);
    execute(restruct: ReStruct): void;
    invert(): FragmentAddStereoAtom;
}
export { FragmentAddStereoAtom, FragmentDeleteStereoAtom };
