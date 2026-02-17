import { AttachmentPoint } from './AttachmentPoint';
import { Coordinates } from "./helpers/attachmentPointCalculations";
import { PreviewAttachmentPointConstructorParams } from "./types";
export declare class PreviewAttachmentPoint extends AttachmentPoint {
    private connected;
    private selected;
    private usage;
    constructor(constructorParams: PreviewAttachmentPointConstructorParams);
    protected renderAttachmentPointByCoordinates(attachmentOnBorder: Coordinates, attachmentPointCoordinates: Coordinates): import("../application/render/types").D3SvgElementSelection<SVGGElement, this>;
    appendAttachmentPoint(): import("../application/render/types").D3SvgElementSelection<SVGGElement, this>;
}
