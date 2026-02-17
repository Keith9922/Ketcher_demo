declare namespace _default {
    export { parseCTabV2000 };
    export { parseRg2000 };
    export { parseRxn2000 };
}
export default _default;
declare function parseCTabV2000(ctabLines: any, countsSplit: any, ignoreChiralFlag: any): Struct;
declare function parseRg2000(ctabLines: any, ignoreChiralFlag: any): Struct;
declare function parseRxn2000(ctabLines: any, shouldReactionRelayout: any, ignoreChiralFlag: any): Struct;
import { Struct } from "../../entities/struct";
