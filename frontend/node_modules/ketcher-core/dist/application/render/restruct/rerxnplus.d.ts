export default ReRxnPlus;
declare class ReRxnPlus extends ReObject {
    static isSelectable(): boolean;
    constructor(plus: any);
    item: any;
    hoverPath(render: any): any;
    drawHover(render: any): any;
    makeSelectionPlate(restruct: any, paper: any, styles: any): any;
    show(restruct: any, id: any, options: any): void;
}
import ReObject from "./reobject";
