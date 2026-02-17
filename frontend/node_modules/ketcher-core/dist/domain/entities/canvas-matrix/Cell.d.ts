import { BaseMonomer, SubChainNode } from "./..";
import { Connection } from "./Connection";
export declare class Cell {
    node: SubChainNode | null | undefined;
    connections: Connection[];
    x: number;
    y: number;
    monomer?: BaseMonomer | undefined;
    constructor(node: SubChainNode | null | undefined, connections: Connection[], x: number, y: number, monomer?: BaseMonomer | undefined);
}
