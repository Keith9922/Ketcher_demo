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
import { Vec2 } from "../../../../domain/entities";
import { BaseOperation } from '../base';
interface TextCreateData {
    id?: number;
    content: string;
    pos: Array<Vec2>;
    position: Vec2;
}
export declare class TextCreate extends BaseOperation {
    data: TextCreateData;
    constructor(content: string, position: Vec2, pos: Array<Vec2>, id?: number);
    execute(restruct: ReStruct): void;
    invert(): BaseOperation;
}
interface TextDeleteData {
    id: number;
    content?: string;
    position?: Vec2;
    pos?: Array<Vec2> | [];
}
export declare class TextDelete extends BaseOperation {
    data: TextDeleteData;
    constructor(id: number);
    execute(restruct: ReStruct): void;
    invert(): BaseOperation;
}
export {};
