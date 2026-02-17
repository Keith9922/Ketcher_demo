export default ReRGroup;
declare class ReRGroup extends ReObject {
    static isSelectable(): boolean;
    constructor(rgroup: any);
    labelBox: Box2Abs | null;
    item: any;
    getAtoms(render: any): any[];
    getBonds(render: any): any[];
    /**
     * @param {Render} render
     */
    calcBBox(render: Render): Box2Abs | null;
    draw(render: any, options: any): {};
    _draw(render: any, rgid: any, attrs: any): any;
    drawHover(render: any): any;
    show(restruct: any, id: any, options: any): void;
}
import ReObject from "./reobject";
import { Box2Abs } from "../../../domain/entities/box2Abs";
import { Render } from "../raphaelRender";
