import { PolymerBond } from "./entities/PolymerBond";
import { D3SvgElementSelection } from "../application/render/types";
import { Selection } from 'd3';
import { BaseMonomer } from './entities/BaseMonomer';
import { Coordinates } from './helpers/attachmentPointCalculations';
import { AttachmentPointConstructorParams, AttachmentPointName } from './types';
import { MonomerToAtomBond } from "./entities/MonomerToAtomBond";
export declare class AttachmentPoint {
    static attachmentPointVector: number;
    static attachmentPointLength: number;
    static labelOffset: number;
    static radius: number;
    static labelSize: {
        x: number;
        y: number;
    };
    static colors: {
        fillUsed: string;
        fill: string;
        fillPotentially: string;
        strokeUsed: string;
        stroke: string;
        strokePotentially: string;
    };
    protected rootElement: D3SvgElementSelection<SVGGElement, void>;
    protected attachmentPoint: D3SvgElementSelection<SVGGElement, this> | null;
    monomer: BaseMonomer;
    protected bodyWidth: number;
    protected bodyHeight: number;
    protected attachmentPointName: AttachmentPointName;
    protected canvasOffset: Coordinates;
    protected centerOfMonomer: Coordinates;
    protected element: Selection<SVGGElement, this, HTMLElement, never> | undefined;
    private hoverableArea;
    protected initialAngle: number;
    private isUsed;
    private isSnake;
    private editorEvents;
    private applyZoomForPositionCalculation;
    constructor(constructorParams: AttachmentPointConstructorParams, skipInit?: boolean);
    private get fill();
    protected get stroke(): string;
    removeAttachmentPoint(): void;
    protected renderAttachmentPointByCoordinates(attachmentOnBorder: Coordinates, attachmentPointCoordinates: Coordinates, labelCoordinatesOnMonomer: Coordinates): D3SvgElementSelection<SVGGElement, this>;
    private renderHoverableArea;
    appendAttachmentPoint(): D3SvgElementSelection<SVGGElement, this>;
    updateAttachmentPointStyleForHover(): void;
    rotateToAngle(polymerBond: PolymerBond | MonomerToAtomBond, flip?: boolean): number;
    protected getCoordinates(angleDegrees: any): {
        x: number;
        y: number;
    }[];
    updateCoords(): void;
    private catchThePoint;
    getElement(): Selection<SVGGElement, this, HTMLElement, never> | undefined;
    getAttachmentPointName(): AttachmentPointName;
    getHoverableArea(): Selection<SVGGElement, this, HTMLElement, never> | undefined;
    getAngle(): number;
}
