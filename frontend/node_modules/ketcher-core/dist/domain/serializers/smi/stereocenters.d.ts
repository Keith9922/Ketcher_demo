export default Stereocenters;
declare function Stereocenters(mol: any, neighborsFunc: any, context: any): void;
declare class Stereocenters {
    constructor(mol: any, neighborsFunc: any, context: any);
    molecule: any;
    atoms: Pool<any>;
    getNeighbors: any;
    context: any;
    each(func: any, context: any): void;
    buildFromBonds(ignoreErrors: any): void;
    buildOneCenter(atomIdx: any): void;
    getBondStereo(centerIdx: any, edgeIdx: any): any;
}
declare namespace Stereocenters {
    const allowed_stereocenters: {
        elem: string;
        charge: number;
        degree: number;
        n_double_bonds: number;
        implicit_degree: number;
    }[];
    function xyzzy(v1: any, v2: any, u: any): 2 | 1 | 4 | 8;
    function sign(v1: any, v2: any, v3: any): 1 | -1;
    function isPyramidMappingRigid(mapping: any): boolean;
}
import { Pool } from "../../entities/pool";
