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
import { BaseOperation } from './base';
declare type Data = {
    atoms: Array<number>;
    bonds: Array<number>;
    rgroupAttachmentPoints: Array<number>;
    color: string;
    highlightId?: number;
};
export declare class HighlightAdd extends BaseOperation {
    data: Data;
    constructor(atoms: Array<number>, bonds: Array<number>, rgroupAttachmentPoints: Array<number>, color: string, highlightId?: number);
    execute(restruct: ReStruct): void;
    invert(): HighlightDelete;
}
export declare class HighlightDelete extends BaseOperation {
    data: Data;
    constructor(highlightId?: number, atoms?: Array<number>, bonds?: Array<number>, rgroupAttachmentPoints?: Array<number>, color?: string);
    execute(restruct: ReStruct): void;
    invert(): HighlightAdd;
}
export declare class HighlightUpdate extends BaseOperation {
    newData: Data & {
        highlightId: number;
    };
    oldData: Data & {
        highlightId: number;
    };
    constructor(highlightId: number, atoms: Array<number>, bonds: Array<number>, rgroupAttachmentPoints: Array<number>, color: string);
    execute(restruct: ReStruct): void;
    invert(): HighlightUpdate;
}
export {};
