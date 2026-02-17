import { BaseMonomer } from './BaseMonomer';
import { ChemSubChain } from "./monomer-chains/ChemSubChain";
import { SubChainNode } from "./monomer-chains/types";
export declare class UnresolvedMonomer extends BaseMonomer {
    getValidSourcePoint(secondMonomer?: BaseMonomer): import("../types").AttachmentPointName | undefined;
    getValidTargetPoint(firstMonomer: BaseMonomer): import("../types").AttachmentPointName | undefined;
    get SubChainConstructor(): typeof ChemSubChain;
    isMonomerTypeDifferentForChaining(monomerToChain: SubChainNode): boolean;
}
