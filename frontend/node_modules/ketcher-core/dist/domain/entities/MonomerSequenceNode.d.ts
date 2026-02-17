import { BaseMonomer } from "./BaseMonomer";
export declare class MonomerSequenceNode {
    monomer: BaseMonomer;
    constructor(monomer: BaseMonomer);
    get SubChainConstructor(): typeof import("./monomer-chains/RnaSubChain").RnaSubChain | typeof import("./monomer-chains/ChemSubChain").ChemSubChain | typeof import("./monomer-chains/PhosphateSubChain").PhosphateSubChain | typeof import("./monomer-chains/PeptideSubChain").PeptideSubChain;
    get firstMonomerInNode(): BaseMonomer;
    get lastMonomerInNode(): BaseMonomer;
    get monomers(): BaseMonomer[];
    get renderer(): import("../..").BaseMonomerRenderer | import("../..").BaseSequenceItemRenderer | undefined;
    get modified(): boolean;
}
