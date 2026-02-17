export default CisTrans;
declare function CisTrans(mol: any, neighborsFunc: any, context: any): void;
declare class CisTrans {
    constructor(mol: any, neighborsFunc: any, context: any);
    molecule: any;
    bonds: Pool<any>;
    getNeighbors: any;
    context: any;
    each(func: any): void;
    getParity(idx: any): any;
    getSubstituents(idx: any): any;
    sameside(beg: any, end: any, neiBeg: any, neiEnd: any): 0 | 1 | -1;
    samesides(iBeg: any, iEnd: any, iNeiBeg: any, iNeiEnd: any): 0 | 1 | -1;
    sortSubstituents(substituents: any): boolean;
    isGeomStereoBond(bondIdx: any, substituents: any): boolean;
    build(excludeBonds: any): void;
}
declare namespace CisTrans {
    namespace PARITY {
        const NONE: number;
        const CIS: number;
        const TRANS: number;
    }
}
import { Pool } from "../../entities/pool";
