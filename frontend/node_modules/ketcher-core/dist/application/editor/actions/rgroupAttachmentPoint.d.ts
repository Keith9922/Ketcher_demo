import { ReStruct } from "../../render";
import { AttachmentPoints } from "../../../domain/entities";
import { Action } from './action';
export declare function fromRGroupAttachmentPointUpdate(restruct: ReStruct, atomId: number, attachmentPoints: AttachmentPoints | null): Action;
export declare function fromRGroupAttachmentPointAddition(restruct: ReStruct, attachmentPoints: AttachmentPoints | null, atomId: number): Action;
export declare function fromRGroupAttachmentPointDeletion(restruct: ReStruct, id: number): Action;
