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
import { Vec2 } from "../../../domain/entities";
import { ReStruct } from "../../render";
import { Action } from './action';
import { EditorSelection } from '../editor.types';
export declare type FlipDirection = 'horizontal' | 'vertical';
export declare function fromFlip(reStruct: ReStruct, selection: EditorSelection | null, flipDirection: FlipDirection, center: Vec2): Action;
export declare function fromRotate(restruct: any, selection: any, center: any, angle: any): Action;
