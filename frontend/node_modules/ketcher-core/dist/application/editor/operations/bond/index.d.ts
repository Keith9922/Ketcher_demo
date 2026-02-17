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
import { ReStruct } from '../../../render';
import { BaseOperation } from '../base';
declare type Data = {
    bond: any;
    begin: any;
    end: any;
    bid: any;
    needInvalidateAtoms?: boolean;
};
declare class BondAdd extends BaseOperation {
    data: Data;
    constructor(begin?: any, end?: any, bond?: any, needInvalidateAtoms?: boolean);
    execute(restruct: ReStruct): void;
    invert(): BondDelete;
}
declare class BondDelete extends BaseOperation {
    data: Data;
    constructor(bondId?: any);
    execute(restruct: ReStruct): void;
    invert(): BondAdd;
}
export { BondAdd, BondDelete };
export * from './BondAttr';
export * from './BondMove';
