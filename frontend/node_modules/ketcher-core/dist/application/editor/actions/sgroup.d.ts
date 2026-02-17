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
import { SGroupAttachmentPoint } from "../../../domain/entities";
import { Action } from './action';
import Restruct from "../../render/restruct/restruct";
export declare function fromSeveralSgroupAddition(restruct: Restruct, type: any, atoms: any, attrs: any): any;
export declare function fromSgroupAttrs(restruct: any, id: any, attrs: any): Action;
export declare function setExpandSGroup(restruct: Restruct, sgid: number, attrs: {
    expanded: boolean;
}): Action;
export declare function setExpandMonomerSGroup(restruct: Restruct, sgid: number, attrs: {
    expanded: boolean;
}): Action;
export declare function expandSGroupWithMultipleAttachmentPoint(restruct: any): Action;
export declare function sGroupAttributeAction(id: any, attrs: any): Action;
export declare function fromSgroupDeletion(restruct: any, id: any, needPerform?: boolean): Action;
export declare function fromSgroupAddition(restruct: any, type: any, atoms: any, attrs: any, sgid: any, attachmentPoints: any, pp?: any, expanded?: any, name?: any, oldSgroup?: any): Action;
export declare function fromSgroupAction(context: any, restruct: any, newSg: any, sourceAtoms: any, selection: any): any;
export declare function removeAtomFromSgroupIfNeeded(action: any, restruct: any, id: any): boolean;
export declare function removeSgroupIfNeeded(action: any, restruct: Restruct, atoms: any): void;
export declare function fromSgroupAttachmentPointAddition(restruct: Restruct, sgroupId: number, attachmentPoint: SGroupAttachmentPoint): Action;
export declare function fromSgroupAttachmentPointRemove(restruct: Restruct, sgroupId: number, atomId: number, leaveAtomId?: number, needPerform?: boolean): Action;
