import { BaseMonomer } from './BaseMonomer';
import { AttachmentPointName } from "../types";
import { RnaSubChain } from "./monomer-chains/RnaSubChain";
import { SubChainNode } from "./monomer-chains/types";
import { IVariantMonomer } from "./types";
export declare class Sugar extends BaseMonomer {
    getValidSourcePoint(secondMonomer?: BaseMonomer & IVariantMonomer): AttachmentPointName | undefined;
    getValidTargetPoint(firstMonomer: BaseMonomer & IVariantMonomer): AttachmentPointName | undefined;
    private getValidPoint;
    get SubChainConstructor(): typeof RnaSubChain;
    isMonomerTypeDifferentForChaining(monomerToChain: SubChainNode): boolean;
    get isPartOfRNA(): boolean;
}
