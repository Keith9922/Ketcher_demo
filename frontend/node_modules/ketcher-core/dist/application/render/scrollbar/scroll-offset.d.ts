import { Box2Abs } from "../../../domain/entities";
import { Render } from '../raphaelRender';
export declare class ScrollOffset {
    #private;
    up: number;
    down: number;
    left: number;
    right: number;
    constructor(render: Render);
    getAbsViewBox(): Box2Abs;
    getAbsBoundingBox(): Box2Abs;
    update(): void;
    hasVerticalOffset(): boolean;
    hasHorizontalOffset(): boolean;
}
