import { BaseSequenceItemRenderer } from "./BaseSequenceItemRenderer";
import { Nucleoside, Nucleotide, Vec2 } from "../../../../domain/entities";
import { BaseSubChain } from "../../../../domain/entities/monomer-chains/BaseSubChain";
export declare abstract class RNASequenceItemRenderer extends BaseSequenceItemRenderer {
    node: Nucleoside | Nucleotide;
    monomerSize: {
        width: number;
        height: number;
    };
    scaledMonomerPosition: Vec2;
    constructor(node: Nucleoside | Nucleotide, _firstNodeInChainPosition: Vec2, _monomerIndexInChain: number, _isLastMonomerInChain: boolean, _subChain: BaseSubChain, _isEditingSymbol: boolean, monomerSize: {
        width: number;
        height: number;
    }, scaledMonomerPosition: Vec2);
    get symbolToDisplay(): string;
    protected drawCommonModification(node: Nucleoside | Nucleotide): void;
}
