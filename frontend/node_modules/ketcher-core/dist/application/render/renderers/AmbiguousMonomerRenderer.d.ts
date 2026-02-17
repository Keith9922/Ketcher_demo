import { Selection } from 'd3';
import { BaseMonomerRenderer } from "./";
import { AmbiguousMonomer } from "../../../domain/entities/AmbiguousMonomer";
import { UsageInMacromolecule } from "./..";
import { D3SvgElementSelection } from "../types";
declare type PreviewAttachmentPointParams = {
    canvas: D3SvgElementSelection<SVGSVGElement, void>;
    usage: UsageInMacromolecule;
    selectedAttachmentPoint: string | null | undefined;
    connectedAttachmentPoints: string[] | undefined;
};
export declare class AmbiguousMonomerRenderer extends BaseMonomerRenderer {
    monomer: AmbiguousMonomer;
    private monomerRenderer;
    private monomerSymbolElementsIds;
    constructor(monomer: AmbiguousMonomer, scale?: number);
    protected appendBody(rootElement: Selection<SVGGElement, void, HTMLElement, never>): Selection<SVGUseElement, this, HTMLElement, never>;
    get enumerationElementPosition(): void | {
        x: number;
        y: number;
    };
    get beginningElementPosition(): void | {
        x: number;
        y: number;
    };
    private appendNumberOfMonomers;
    show(theme: any): void;
    private appendPreviewAttachmentPoint;
    showExternal(params: PreviewAttachmentPointParams): void;
    protected get modificationConfig(): undefined;
}
export {};
