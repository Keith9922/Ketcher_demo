import { RNABase } from "./RNABase";
import { Phosphate } from "./Phosphate";
import { Sugar } from "./Sugar";
import { SubChainNode } from "./monomer-chains/types";
import { Vec2 } from "./vec2";
import { RNA_DNA_NON_MODIFIED_PART } from "../constants/monomers";
import { BaseMonomer } from "./BaseMonomer";
import { AmbiguousMonomer } from "./AmbiguousMonomer";
export declare class Nucleotide {
    sugar: Sugar;
    rnaBase: RNABase | AmbiguousMonomer;
    phosphate: Phosphate;
    constructor(sugar: Sugar, rnaBase: RNABase | AmbiguousMonomer, phosphate: Phosphate);
    static fromSugar(sugar: Sugar, needValidation?: boolean): Nucleotide;
    static createOnCanvas(rnaBaseName: string, position: Vec2, sugarName?: RNA_DNA_NON_MODIFIED_PART): {
        modelChanges: import("./Command").Command;
        node: Nucleotide;
    };
    isMonomerTypeDifferentForChaining(monomerToChain: SubChainNode): boolean;
    get SubChainConstructor(): typeof import("./monomer-chains/RnaSubChain").RnaSubChain;
    get monomer(): Sugar;
    get monomers(): BaseMonomer[];
    get firstMonomerInNode(): Sugar;
    get lastMonomerInNode(): Phosphate;
    get renderer(): import("../../application/render").BaseMonomerRenderer | import("../../application/render").BaseSequenceItemRenderer | undefined;
    get modified(): boolean;
}
