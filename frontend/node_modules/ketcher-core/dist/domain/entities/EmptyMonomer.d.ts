import { BaseMonomer } from './BaseMonomer';
import { EmptySubChain } from "./monomer-chains/EmptySubChain";
export declare class EmptyMonomer extends BaseMonomer {
    constructor();
    getValidSourcePoint(): undefined;
    getValidTargetPoint(): undefined;
    get SubChainConstructor(): typeof EmptySubChain;
    isMonomerTypeDifferentForChaining(): boolean;
}
