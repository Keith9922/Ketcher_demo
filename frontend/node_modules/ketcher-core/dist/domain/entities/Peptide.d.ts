import { BaseMonomer } from './BaseMonomer';
import { AttachmentPointName } from "../types";
import { PeptideSubChain } from "./monomer-chains/PeptideSubChain";
import { SubChainNode } from "./monomer-chains/types";
export declare class Peptide extends BaseMonomer {
    getValidSourcePoint(secondMonomer?: BaseMonomer): AttachmentPointName | undefined;
    getValidTargetPoint(firstMonomer: BaseMonomer): AttachmentPointName | undefined;
    get SubChainConstructor(): typeof PeptideSubChain;
    isMonomerTypeDifferentForChaining(monomerToChain: SubChainNode): boolean;
}
