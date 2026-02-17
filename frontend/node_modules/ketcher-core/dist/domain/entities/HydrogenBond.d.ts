import { BaseMonomer } from './BaseMonomer';
import { BaseBond } from './BaseBond';
import { FlexOrSequenceOrSnakeModePolymerBondRenderer } from "./PolymerBond";
export declare class HydrogenBond extends BaseBond {
    firstMonomer: BaseMonomer;
    secondMonomer?: BaseMonomer;
    renderer?: FlexOrSequenceOrSnakeModePolymerBondRenderer;
    constructor(firstMonomer: BaseMonomer, secondMonomer?: BaseMonomer);
    setFirstMonomer(monomer: BaseMonomer): void;
    setSecondMonomer(monomer: BaseMonomer): void;
    setRenderer(renderer: FlexOrSequenceOrSnakeModePolymerBondRenderer): void;
    get isBackBoneChainConnection(): boolean;
    get firstMonomerAttachmentPoint(): import("../types").AttachmentPointName | undefined;
    get secondMonomerAttachmentPoint(): import("../types").AttachmentPointName | undefined;
    get isSideChainConnection(): boolean;
    get firstEndEntity(): BaseMonomer;
    get secondEndEntity(): BaseMonomer | undefined;
    getAnotherMonomer(monomer: BaseMonomer): BaseMonomer | undefined;
}
