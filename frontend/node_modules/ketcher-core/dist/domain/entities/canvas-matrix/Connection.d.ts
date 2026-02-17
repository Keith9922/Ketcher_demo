import { PolymerBond } from "../PolymerBond";
import { SubChainNode } from "./..";
export declare type ConnectionDirectionInDegrees = 0 | 90 | 180 | 270;
export declare type ConnectionDirectionOfLastCell = {
    readonly x: number;
    readonly y: number;
};
export declare class Connection {
    readonly connectedNode: SubChainNode | null;
    readonly direction: ConnectionDirectionInDegrees | ConnectionDirectionOfLastCell;
    readonly isVertical: boolean;
    readonly polymerBond: PolymerBond;
    xOffset: number;
    yOffset: number;
    constructor(connectedNode: SubChainNode | null, direction: ConnectionDirectionInDegrees | ConnectionDirectionOfLastCell, isVertical: boolean, polymerBond: PolymerBond, xOffset: number, yOffset: number);
}
