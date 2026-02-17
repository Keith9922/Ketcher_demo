import { ReStruct } from "../../../render";
import { RGroupAttachmentPointType } from "../../../../domain/entities";
import { RGroupAttachmentPointRemove } from '.';
import BaseOperation from '../base';
declare type Data = {
    atomId: number;
    attachmentPointType: RGroupAttachmentPointType;
    attachmentPointId?: number;
};
declare class RGroupAttachmentPointAdd extends BaseOperation {
    data: Data;
    constructor(data: Data);
    execute(restruct: ReStruct): void;
    invert(): RGroupAttachmentPointRemove;
}
export { RGroupAttachmentPointAdd };
