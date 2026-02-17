export default Visel;
declare class Visel {
    constructor(type: any);
    type: any;
    paths: any[];
    /** @type {Box2Abs[]} */
    boxes: Box2Abs[];
    /** @type {Box2Abs | null} */
    boundingBox: Box2Abs | null;
    oldBoundingBox: Box2Abs | null;
    exts: any[];
    add(path: any, bb: any, ext: any): void;
    clear(): void;
    translate(...args: any[]): void;
    /**
     * @param {number} degree
     * @param {Vec2} center
     */
    rotate(degree: number, center: Vec2): void;
}
import { Box2Abs } from "../../../domain/entities/box2Abs";
import { Vec2 } from "../../../domain/entities/vec2";
