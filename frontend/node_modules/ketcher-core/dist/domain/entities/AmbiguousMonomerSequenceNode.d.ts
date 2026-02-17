import { AmbiguousMonomer } from "./AmbiguousMonomer";
export declare class AmbiguousMonomerSequenceNode {
    monomer: AmbiguousMonomer;
    constructor(monomer: AmbiguousMonomer);
    get SubChainConstructor(): any;
    get firstMonomerInNode(): AmbiguousMonomer;
    get lastMonomerInNode(): AmbiguousMonomer;
    get monomers(): AmbiguousMonomer[];
    get renderer(): import("../..").BaseMonomerRenderer | import("../..").BaseSequenceItemRenderer | undefined;
    get modified(): boolean;
}
