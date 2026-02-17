import { ReStruct } from "../../../render";
import { RGroupAttachmentPointAdd } from '.';
import BaseOperation from '../base';
declare type Data = {
    atomId: number;
    attachmentPointType: any;
    attachmentPointId: number;
};
declare class RGroupAttachmentPointRemove extends BaseOperation {
    data: Data;
    constructor(attachmentPointId: number);
    execute(restruct: ReStruct): void;
    invert(): RGroupAttachmentPointAdd;
}
export { RGroupAttachmentPointRemove };
