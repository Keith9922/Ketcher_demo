import { ReObject, ReStruct } from "./";
import { Image, ImageReferencePositionInfo } from "../../../domain/entities/image";
import { RenderOptions } from "../render.types";
import { RaphaelPaper } from 'raphael';
import { Box2Abs, Vec2 } from "../../../domain/entities";
import { Render } from "./..";
interface ClosestReferencePosition {
    distance: number;
    ref: ImageReferencePositionInfo | null;
}
export declare class ReImage extends ReObject {
    image: Image;
    private selectionPointsSet;
    static isSelectable(): boolean;
    constructor(image: Image);
    private getScaledPointWithOffset;
    private getScale;
    private getDimensions;
    private getSelectionReferencePositions;
    private drawSelectionLine;
    private drawSelectionPoints;
    show(restruct: ReStruct, renderOptions: RenderOptions, nextPath?: any): void;
    drawHover(render: Render): any[];
    makeSelectionPlate(reStruct: ReStruct, paper: RaphaelPaper, options: RenderOptions): RaphaelSet;
    getVBoxObj(): Box2Abs | null;
    togglePoints(displayFlag: boolean): void;
    calculateDistanceToPoint(point: Vec2, renderOptions: RenderOptions): number;
    calculateClosestReferencePosition(point: Vec2, renderOptions: RenderOptions): ClosestReferencePosition;
    isPointInsidePolygon(point: Vec2, renderOptions: RenderOptions): boolean;
}
export {};
