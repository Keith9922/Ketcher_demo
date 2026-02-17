declare namespace _default {
    export { parseCTab };
    export { parseMol };
    export { parseRxn };
    export { prepareForSaving };
    export { saveToMolfile };
}
export default _default;
declare function parseCTab(ctabLines: any, ignoreChiralFlag: any): import("../../entities").Struct;
declare function parseMol(ctabLines: any, ignoreChiralFlag: any): import("../../entities").Struct;
declare function parseRxn(ctabLines: any, shouldReactionRelayout: any, ignoreChiralFlag: any): import("../../entities").Struct;
declare namespace prepareForSaving {
    export const MUL: typeof SGroup.prepareMulForSaving;
    export { prepareSruForSaving as SRU };
    export { prepareSupForSaving as SUP };
    export { prepareDatForSaving as DAT };
    export { prepareGenForSaving as GEN };
    export { prepareQueryComponentForSaving as queryComponent };
}
declare namespace saveToMolfile {
    export { saveMulToMolfile as MUL };
    export { saveSruToMolfile as SRU };
    export { saveSupToMolfile as SUP };
    export { saveDatToMolfile as DAT };
    export { saveGenToMolfile as GEN };
}
import { SGroup } from "../../entities/sgroup";
declare function prepareSruForSaving(sgroup: any, mol: any): void;
declare function prepareSupForSaving(sgroup: any, mol: any): void;
declare function prepareDatForSaving(sgroup: any, mol: any): void;
declare function prepareGenForSaving(_sgroup: any, _mol: any): void;
declare function prepareQueryComponentForSaving(_sgroup: any, _mol: any): void;
declare function saveMulToMolfile(sgroup: any, mol: any, sgMap: any, atomMap: any, bondMap: any): string;
declare function saveSruToMolfile(sgroup: any, mol: any, sgMap: any, atomMap: any, bondMap: any): string;
declare function saveSupToMolfile(sgroup: any, mol: any, sgMap: any, atomMap: any, bondMap: any): string;
declare function saveDatToMolfile(sgroup: any, mol: any, sgMap: any, atomMap: any): string;
declare function saveGenToMolfile(sgroup: any, mol: any, sgMap: any, atomMap: any, bondMap: any): string;
