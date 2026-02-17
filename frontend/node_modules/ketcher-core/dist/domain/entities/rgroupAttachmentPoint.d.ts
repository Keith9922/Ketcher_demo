import { BaseMicromoleculeEntity, initiallySelectedType } from "./BaseMicromoleculeEntity";
export declare type RGroupAttachmentPointType = 'primary' | 'secondary';
export declare class RGroupAttachmentPoint extends BaseMicromoleculeEntity {
    atomId: number;
    type: RGroupAttachmentPointType;
    constructor(atomId: number, type: RGroupAttachmentPointType, initiallySelected?: initiallySelectedType);
    clone(atomToNewAtom?: Map<number, number> | null): RGroupAttachmentPoint;
}
