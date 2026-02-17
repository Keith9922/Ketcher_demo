declare namespace _default {
    export { readKeyValuePairs };
    export { readKeyMultiValuePairs };
    export { loadSGroup };
    export { initSGroup };
    export { applySGroupProp };
    export { applySGroupArrayProp };
    export { applyDataSGroupName };
    export { applyDataSGroupQuery };
    export { applyDataSGroupQueryOp };
    export { applyDataSGroupDesc };
    export { applyDataSGroupInfo };
    export { applyDataSGroupData };
    export { applyDataSGroupInfoLine };
    export { applyDataSGroupDataLine };
    export { applyDataSGroupExpand };
    export { parseSGroupSAPLineV2000 };
}
export default _default;
/**
 * @param str { string }
 * @param valueString { boolean }
 * @returns { Pool }
 */
declare function readKeyValuePairs(str: string, valueString: boolean): Pool;
/**
 * @param str { string }
 * @param valueString { boolean }
 * @returns { Array }
 */
declare function readKeyMultiValuePairs(str: string, valueString: boolean): any[];
declare function loadSGroup(mol: any, sg: any, atomMap: any): any;
declare function initSGroup(sGroups: any, propData: any): void;
declare function applySGroupProp(sGroups: any, propName: any, propData: any, numeric: any, core: any): void;
declare function applySGroupArrayProp(sGroups: any, propName: any, propData: any, shift: any): void;
declare function applyDataSGroupName(sg: any, name: any): void;
declare function applyDataSGroupQuery(sg: any, query: any): void;
declare function applyDataSGroupQueryOp(sg: any, queryOp: any): void;
declare function applyDataSGroupDesc(sGroups: any, propData: any): void;
declare function applyDataSGroupInfo(sg: any, propData: any): void;
declare function applyDataSGroupData(sg: any, data: any, finalize: any): void;
declare function applyDataSGroupInfoLine(sGroups: any, propData: any): void;
declare function applyDataSGroupDataLine(sGroups: any, propData: any, finalize: any): void;
declare function applyDataSGroupExpand(sg: any, expanded: any): void;
/**
 * Superatom attachment point parsing for 'ctab' v2000
 * Implemented based on: https://github.com/epam/ketcher/issues/2467
 * @param ctabString {string} example '   1  1   2   0   '
 *        M SAP sssnn6 iii ooo cc
 *             ^
 *             start position for ctabString content
 * @returns {{sGroupId: number, attachmentPoints: SGroupAttachmentPoint[]}}
 */
declare function parseSGroupSAPLineV2000(ctabString: string): {
    sGroupId: number;
    attachmentPoints: SGroupAttachmentPoint[];
};
import { Pool } from "../../entities/pool";
import { SGroupAttachmentPoint } from "../../entities/sGroupAttachmentPoint";
