import { Vec2 } from "../../../domain/entities";
/**
 * `model` -- The original coordinates of entities, namely angstroms
 * `canvas` -- The real coordinates used to draw entities
 * `view` -- The zoomed canvas coordinates
 */
export declare class Coordinates {
    static canvasToModel(position: Vec2): Vec2;
    static viewToModel(position: Vec2): Vec2;
    static modelToView(position: Vec2): Vec2;
    static modelToCanvas(position: Vec2): Vec2;
    static canvasToView(position: Vec2): Vec2;
    static viewToCanvas(position: Vec2): Vec2;
}
