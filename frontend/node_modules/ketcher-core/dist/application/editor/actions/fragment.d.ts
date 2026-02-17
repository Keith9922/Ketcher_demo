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
import { Action } from './action';
export declare function fromMultipleMove(restruct: any, lists: any, d: Vec2, shouldPerform?: boolean): Action;
export declare function fromStereoFlagUpdate(restruct: any, frid: any, flag?: null): Action;
/**
 * @param restruct { ReStruct }
 * @param frid { number }
 * @param rgForRemove
 * @return { Action }
 */
export declare function fromFragmentSplit(restruct: any, frid: any, rgForRemove?: Array<number>): Action;
