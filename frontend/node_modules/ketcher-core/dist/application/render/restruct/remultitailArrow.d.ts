import ReObject from './reobject';
import { MultitailArrow } from "../../../domain/entities/multitailArrow";
import { Render, ReStruct } from "./..";
import { RenderOptions } from "../render.types";
import { PathBuilder } from "../pathBuilder";
import { Vec2 } from "../../../domain/entities";
import { RaphaelPaper } from 'raphael';
export declare enum MultitailArrowRefName {
    HEAD = "head",
    TAILS = "tails",
    TOP_TAIL = "topTail",
    BOTTOM_TAIL = "bottomTail",
    SPINE = "spine"
}
export interface MultitailArrowReferencePosition {
    name: MultitailArrowRefName;
    isLine: boolean;
    tailId: number | null;
}
export interface MultitailArrowClosestReferencePosition {
    distance: number;
    ref: MultitailArrowReferencePosition | null;
}
export declare class ReMultitailArrow extends ReObject {
    multitailArrow: MultitailArrow;
    static CUBIC_BEZIER_OFFSET: number;
    static FRAME_OFFSET: number;
    static SELECTION_POINT_OFFSET_FROM_SPINE: number;
    static isSelectable(): boolean;
    static getTailIdFromRefName(name: string): number | null;
    constructor(multitailArrow: MultitailArrow);
    getFrameOffset(options: RenderOptions): number;
    getSelectionPointOffset(options: RenderOptions): number;
    getReferencePositions(renderOptions: RenderOptions): ReturnType<MultitailArrow['getReferencePositions']>;
    getReferenceLines(renderOptions: RenderOptions, referencePositions?: import("../../../domain/entities").MultitailArrowsReferencePositions): import("../../../domain/entities").MultitailArrowsReferenceLines;
    drawSingleLineHover(builder: PathBuilder, renderOptions: RenderOptions, lineStart: Vec2, lineEnd: Vec2, verticalDirection: -1 | 1, horizontalDirection: -1 | 1): void;
    buildFrame(renderOptions: RenderOptions): string;
    drawHover(render: Render): any;
    getSelectionPointsFromReferencePoint(point: Vec2, topSpine: Vec2, name: string, spineOffset: number): {
        [x: string]: Vec2;
    };
    addTestSelectionPoints(reStruct: ReStruct, paper: RaphaelPaper, renderOptions: RenderOptions): void;
    makeSelectionPlate(reStruct: ReStruct, paper: RaphaelPaper, options: RenderOptions): any;
    show(reStruct: ReStruct, renderOptions: RenderOptions): void;
    private getClosestArrowPartPosition;
    private getTailArrayFromPool;
    calculateDistanceToPoint(point: Vec2, renderOptions: RenderOptions, maxDistanceToPoint: number): MultitailArrowClosestReferencePosition;
}
