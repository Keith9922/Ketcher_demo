import { Render } from '../raphaelRender';
import { ScrollOffset } from './scroll-offset';
import { Scrollbar } from './scrollbar';
import { RaphaelRectAttr } from './types';
export declare class VerticalScrollbar extends Scrollbar {
    #private;
    constructor(render: Render, scrollOffset: ScrollOffset);
    hasOffset(): boolean;
    getDynamicAttr(): RaphaelRectAttr;
    onDragMove(_dx: number, dy: number, _x: number, _y: number, _event: MouseEvent): void;
}
