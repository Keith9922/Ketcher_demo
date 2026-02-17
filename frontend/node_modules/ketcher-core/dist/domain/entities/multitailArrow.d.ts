import { BaseMicromoleculeEntity } from "./BaseMicromoleculeEntity";
import { Vec2 } from "./vec2";
import { Pool } from "./pool";
import { KetFileNode } from "../serializers";
import { FixedPrecisionCoordinates } from "./";
export declare type Line = [Vec2, Vec2];
export interface MultitailArrowsReferencePositions {
    head: Vec2;
    topTail: Vec2;
    bottomTail: Vec2;
    topSpine: Vec2;
    bottomSpine: Vec2;
    tails: Pool<Vec2>;
}
export declare type MultitailArrowReferencePositionsNames = keyof MultitailArrowsReferencePositions;
export interface MultitailArrowsReferenceLines {
    head: Line;
    topTail: Line;
    bottomTail: Line;
    spine: Line;
    tails: Pool<Line>;
}
export declare type MultitailArrowReferenceLinesNames = keyof MultitailArrowsReferenceLines;
export interface KetFileMultitailArrowNode {
    head: {
        position: Vec2;
    };
    spine: {
        pos: [Vec2, Vec2];
    };
    tails: {
        pos: Array<Vec2>;
    };
    zOrder: 0;
}
interface TailDistance {
    distance: number;
    center: number;
}
export declare class MultitailArrow extends BaseMicromoleculeEntity {
    private spineTopX;
    private spineTopY;
    private height;
    private headOffsetX;
    private headOffsetY;
    private tailLength;
    private tailsYOffset;
    static KET_MIN_DISTANCE: FixedPrecisionCoordinates;
    static MIN_TAIL_DISTANCE: FixedPrecisionCoordinates;
    static MIN_HEAD_LENGTH: FixedPrecisionCoordinates;
    static MIN_TAIL_LENGTH: FixedPrecisionCoordinates;
    static MIN_TOP_BOTTOM_OFFSET: FixedPrecisionCoordinates;
    static MIN_HEIGHT: FixedPrecisionCoordinates;
    static TOP_TAIL_NAME: string;
    static BOTTOM_TAIL_NAME: string;
    static TAILS_NAME: string;
    static canAddTail(distance: TailDistance['distance']): boolean;
    static fromTwoPoints(topLeft: Vec2, bottomRight: Vec2): MultitailArrow;
    static validateKetNode(ketFileData: KetFileMultitailArrowNode): string | null;
    static fromKetNode(ketFileNode: KetFileNode<KetFileMultitailArrowNode>): MultitailArrow;
    static fromFloatingPointCoordinates(spineTop: Vec2, height: number, headOffset: Vec2, tailLength: number, tailsYOffset: Pool<number>): MultitailArrow;
    constructor(spineTopX: FixedPrecisionCoordinates, spineTopY: FixedPrecisionCoordinates, height: FixedPrecisionCoordinates, headOffsetX: FixedPrecisionCoordinates, headOffsetY: FixedPrecisionCoordinates, tailLength: FixedPrecisionCoordinates, tailsYOffset: Pool<FixedPrecisionCoordinates>);
    getReferencePositions(): MultitailArrowsReferencePositions;
    getReferencePositionsArray(): Array<Vec2>;
    getReferenceLines(referencePositions: MultitailArrowsReferencePositions): MultitailArrowsReferenceLines;
    getTailsDistance(tailsYOffsets: Array<FixedPrecisionCoordinates>): Array<TailDistance>;
    getTailsMaxDistance(): TailDistance;
    getTailCoordinate(id: number): FixedPrecisionCoordinates | undefined;
    addTail(id?: number, coordinate?: FixedPrecisionCoordinates): number;
    removeTail(id: number): void;
    center(): Vec2;
    clone(): MultitailArrow;
    rescaleSize(scale: number): void;
    resizeHead(offset: number): number;
    moveHead(offset: number): number;
    resizeTails(offset: number): number;
    normalizeTailPosition(proposedPosition: FixedPrecisionCoordinates, tailId: number): FixedPrecisionCoordinates | null;
    moveTail(offset: number, id: number, normalize?: true): number;
    moveTail(offset: number, name: typeof MultitailArrow.TOP_TAIL_NAME | typeof MultitailArrow.BOTTOM_TAIL_NAME): number;
    move(offset: Vec2): void;
    toKetNode(): KetFileNode<KetFileMultitailArrowNode>;
}
export {};
