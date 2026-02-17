import { ChainsCollection } from "../monomer-chains/ChainsCollection";
import { Matrix } from "./Matrix";
import { PolymerBond } from "../PolymerBond";
import { Connection } from "./Connection";
import { Cell } from "./Cell";
interface MatrixConfig {
    initialMatrix: Matrix<Cell>;
}
export declare class CanvasMatrix {
    chainsCollection: ChainsCollection;
    private matrixConfig;
    private matrix;
    private initialMatrixWidth;
    private monomerToCell;
    polymerBondToCells: Map<PolymerBond, Cell[]>;
    polymerBondToConnections: Map<PolymerBond, Connection[]>;
    constructor(chainsCollection: ChainsCollection, matrixConfig?: MatrixConfig);
    private fillConnectionsOffset;
    private fillRightConnectionsOffset;
    private fillCells;
}
export {};
