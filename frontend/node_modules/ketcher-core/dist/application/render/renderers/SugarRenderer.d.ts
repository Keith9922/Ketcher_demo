import { Selection } from 'd3';
import { Sugar } from "../../../domain/entities/Sugar";
import { BaseMonomerRenderer } from "./BaseMonomerRenderer";
export declare class SugarRenderer extends BaseMonomerRenderer {
    monomer: Sugar;
    CHAIN_START_TERMINAL_INDICATOR_TEXT: string;
    CHAIN_END_TERMINAL_INDICATOR_TEXT: string;
    constructor(monomer: Sugar, scale?: number);
    get textColor(): "#333333" | "#fff";
    protected get modificationConfig(): {
        backgroundId: string;
    };
    protected getMonomerColor(theme: any): any;
    protected appendBody(rootElement: Selection<SVGGElement, void, HTMLElement, never>, theme: any): Selection<SVGUseElement, this, HTMLElement, never>;
    get enumerationElementPosition(): undefined;
    get beginningElementPosition(): {
        x: number;
        y: number;
    };
}
