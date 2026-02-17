import type { RenderOptions } from '../render.types';
/**
 * To make scrollbar provide better UX, this function can help to achieve
 * moving scrollbar `x` offsets leads to moving viewBox `2 * x` offsets
 * */
export declare const getUserFriendlyScrollOffset: (offset: number) => number;
export declare const getUserFriendlyViewBoxDelta: (delta: number) => number;
export declare const getZoomedValue: (value: number, renderOptions: RenderOptions) => number;
