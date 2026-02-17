import { Render } from '../raphaelRender';
import { ScrollOffset } from './scroll-offset';
import { Scrollbar } from './scrollbar';
import { RaphaelRectAttr } from './types';
export declare class HorizontalScrollbar extends Scrollbar {
    #private;
    constructor(render: Render, scrollOffset: ScrollOffset);
    hasOffset(): boolean;
    getDynamicAttr(): RaphaelRectAttr;
    onDragMove(dx: number, _dy: number, _x: number, _y: number, _event: MouseEvent): void;
}
