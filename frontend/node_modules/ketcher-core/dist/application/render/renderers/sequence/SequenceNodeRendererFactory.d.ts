import { Vec2 } from "../../../../domain/entities";
import { BaseMonomerRenderer, BaseSequenceItemRenderer } from "../..";
import { SubChainNode } from "../../../../domain/entities/monomer-chains/types";
import { BaseSubChain } from "../../../../domain/entities/monomer-chains/BaseSubChain";
export declare class SequenceNodeRendererFactory {
    static fromNode(node: SubChainNode, firstMonomerInChainPosition: Vec2, monomerIndexInChain: number, isLastMonomerInChain: boolean, subChain: BaseSubChain, isEditingSymbol: boolean, renderer?: BaseMonomerRenderer | BaseSequenceItemRenderer): any;
}
