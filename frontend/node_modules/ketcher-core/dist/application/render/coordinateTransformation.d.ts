import { Vec2 } from "../../domain/entities";
import { Render } from './raphaelRender';
/**
 * @see ./__docs__/Coordinate-Origins.png
 * `model` - The original coordinates of entities.
 * `canvas` - The scaled `model`. The real coordinates Raphael uses to draw entities.
 * `page` - The part of the document you're viewing which is currently visible in the window.
 * `view` - The part of the canvas you're viewing which is currently visible in the window.
 * */
export declare const CoordinateTransformation: {
    modelToView: (vector: Vec2, render: Render) => Vec2;
    canvasToView: (point: Vec2, render: Render) => Vec2;
    viewToCanvas: (point: Vec2, render: Render) => Vec2;
    pageToCanvas: (event: MouseEvent | {
        clientX: number;
        clientY: number;
    }, render: Render) => Vec2;
    pageToModel: (event: MouseEvent | {
        clientX: number;
        clientY: number;
    }, render: Render) => Vec2;
};
