declare namespace _default {
    export { parseCTabV3000 };
    export { readRGroups3000 };
    export { parseRxn3000 };
}
export default _default;
declare function parseCTabV3000(ctabLines: any, norgroups: any): Struct;
declare function readRGroups3000(ctab: any, ctabLines: any): void;
declare function parseRxn3000(ctabLines: any, shouldReactionRelayout: any): Struct;
import { Struct } from "../../entities/struct";
