import { Vec2 } from "../../domain/entities";
interface Point2D {
    x: number;
    y: number;
}
export declare class PathBuilder {
    static generatePoint(point: Point2D): string;
    private pathParts;
    constructor(initialPath?: string);
    addMovement(to: Point2D): PathBuilder;
    addLine(to: Point2D, from?: Point2D): PathBuilder;
    addClosedLine(to: Point2D, from?: Point2D): PathBuilder;
    addQuadraticBezierCurve(control: Point2D, to: Point2D): PathBuilder;
    addPathParts(pathParts: Array<string>): PathBuilder;
    addOpenArrowPathParts(start: Vec2, arrowLength: number, tipXOffset?: number, tipYOffset?: number): PathBuilder;
    addFilledTriangleArrowPathParts(start: Vec2, arrowLength: number, triangleLength?: number, triangleWidth?: number): PathBuilder;
    addMultitailArrowBase(topY: number, bottomY: number, spineX: number, tailLength: number, cubicBezierOffset?: number): PathBuilder;
    build(): string;
}
export {};
