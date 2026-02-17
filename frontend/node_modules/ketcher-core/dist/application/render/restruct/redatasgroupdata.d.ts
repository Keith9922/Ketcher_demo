export default ReDataSGroupData;
declare class ReDataSGroupData extends ReObject {
    static isSelectable(): boolean;
    constructor(sgroup: any);
    sgroup: any;
    hoverPath(render: any): any;
    drawHover(render: any): any;
    makeSelectionPlate(restruct: any, paper: any, styles: any): any;
}
import ReObject from "./reobject";
