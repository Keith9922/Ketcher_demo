import { BaseMonomer } from "./BaseMonomer";
import { ChemSubChain } from "./monomer-chains/ChemSubChain";
import { PolymerBond } from "./PolymerBond";
import { AttachmentPointName } from "../types";
export declare class RNABase extends BaseMonomer {
    getValidSourcePoint(): AttachmentPointName | undefined;
    getValidTargetPoint(): AttachmentPointName | undefined;
    get SubChainConstructor(): typeof ChemSubChain;
    get sideConnections(): PolymerBond[];
}
