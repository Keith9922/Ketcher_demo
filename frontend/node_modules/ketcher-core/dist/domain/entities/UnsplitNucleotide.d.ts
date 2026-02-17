import { BaseMonomer } from "./BaseMonomer";
import { SubChainNode } from "./monomer-chains/types";
import { RnaSubChain } from "./monomer-chains/RnaSubChain";
export declare class UnsplitNucleotide extends BaseMonomer {
    getValidSourcePoint(monomer?: BaseMonomer): import("../types").AttachmentPointName | undefined;
    getValidTargetPoint(monomer: BaseMonomer): import("../types").AttachmentPointName | undefined;
    get SubChainConstructor(): typeof RnaSubChain;
    isMonomerTypeDifferentForChaining(monomerToChain: SubChainNode): boolean;
}
