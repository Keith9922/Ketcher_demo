export default ReLoop;
declare class ReLoop extends ReObject {
    static isSelectable(): boolean;
    constructor(loop: any);
    loop: any;
    centre: Vec2;
    radius: Vec2;
    show(restruct: any, rlid: any, options: any): void;
    isValid(struct: any, rlid: any): any;
}
import ReObject from "./reobject";
import { Vec2 } from "../../../domain/entities/vec2";
