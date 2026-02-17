import { BaseOperation } from '../base';
import { ReStruct } from '../../../render';
import { SGroupAttachmentPoint } from "../../../../domain/entities";
declare type Data = {
    sGroupId: number;
    attachmentPoint: SGroupAttachmentPoint;
};
export declare class SGroupAttachmentPointAdd extends BaseOperation {
    data: Data;
    constructor(sGroupId: number, attachmentPoint: SGroupAttachmentPoint);
    execute(restruct: ReStruct): void;
    invert(): SGroupAttachmentPointRemove;
}
export declare class SGroupAttachmentPointRemove extends BaseOperation {
    data: Data;
    constructor(sGroupId: number, attachmentPoint: SGroupAttachmentPoint);
    execute(restruct: ReStruct): void;
    invert(): SGroupAttachmentPointAdd;
}
export {};
