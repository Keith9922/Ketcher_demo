import { Selection } from 'd3';
import { Phosphate } from "../../../domain/entities/Phosphate";
import { BaseMonomerRenderer } from "./BaseMonomerRenderer";
export declare class PhosphateRenderer extends BaseMonomerRenderer {
    monomer: Phosphate;
    constructor(monomer: Phosphate, scale?: number);
    protected getMonomerColor(theme: any): any;
    get textColor(): "#fff" | "#333333";
    protected get modificationConfig(): {
        backgroundId: string;
    };
    protected appendBody(rootElement: Selection<SVGGElement, void, HTMLElement, never>, theme: any): Selection<SVGUseElement, this, HTMLElement, never>;
    show(theme: any): void;
    get enumerationElementPosition(): undefined;
    get beginningElementPosition(): undefined;
}
