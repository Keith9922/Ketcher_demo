declare namespace _default {
    export { fmtInfo };
    export { paddedNum };
    export { parseDecimalInt };
    export { partitionLine };
    export { partitionLineFixed };
    export { rxnMerge };
    export { rgMerge };
}
export default _default;
declare namespace fmtInfo {
    const bondTypeMap: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
        6: number;
        7: number;
        8: number;
        9: number;
        10: number;
    };
    const bondStereoMap: {
        0: number;
        1: number;
        4: number;
        6: number;
        3: number;
    };
    const v30bondStereoMap: {
        0: number;
        1: number;
        2: number;
        3: number;
    };
    const bondTopologyMap: {
        0: number;
        1: number;
        2: number;
    };
    const countsLinePartition: number[];
    const atomLinePartition: number[];
    const bondLinePartition: number[];
    const atomListHeaderPartition: number[];
    const atomListHeaderLength: number;
    const atomListHeaderItemLength: number;
    const chargeMap: (number | null)[];
    const valenceMap: (number | undefined)[];
    const implicitHydrogenMap: (number | undefined)[];
    namespace v30atomPropMap {
        const CHG: string;
        const RAD: string;
        const MASS: string;
        const VAL: string;
        const HCOUNT: string;
        const INVRET: string;
        const SUBST: string;
        const UNSAT: string;
        const RBCNT: string;
    }
    const rxnItemsPartition: number[];
}
declare function paddedNum(number: any, width: any, precision: any): any;
/**
 * @param str {string}
 * @returns {number}
 */
declare function parseDecimalInt(str: string): number;
declare function partitionLine(str: any, parts: any, withspace: any): any[];
declare function partitionLineFixed(str: any, itemLength: any, withspace: any): any[];
declare function rxnMerge(mols: any, nReactants: any, nProducts: any, nAgents: any, shouldReactionRelayout: any): Struct;
declare function rgMerge(scaffold: any, rgroups: any): Struct;
import { Struct } from "../../entities/struct";
