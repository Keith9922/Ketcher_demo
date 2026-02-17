import { SubChainNode } from "./types";
import { PolymerBond } from '../PolymerBond';
export declare class BaseSubChain {
    nodes: Array<SubChainNode>;
    bonds: Array<PolymerBond>;
    constructor();
    get lastNode(): SubChainNode;
    get firstNode(): SubChainNode;
    add(node: SubChainNode): void;
    get length(): number;
}
