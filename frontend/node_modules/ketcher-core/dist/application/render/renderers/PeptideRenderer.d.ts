import { Selection } from 'd3';
import { Peptide } from "../../../domain/entities/Peptide";
import { BaseMonomerRenderer } from "./BaseMonomerRenderer";
export declare class PeptideRenderer extends BaseMonomerRenderer {
    monomer: Peptide;
    CHAIN_START_TERMINAL_INDICATOR_TEXT: string;
    CHAIN_END_TERMINAL_INDICATOR_TEXT: string;
    constructor(monomer: Peptide, scale?: number);
    protected get modificationConfig(): {
        backgroundId: string;
        requiresFill: boolean;
    };
    protected appendBody(rootElement: Selection<SVGGElement, void, HTMLElement, never>, theme: any): Selection<SVGUseElement, this, HTMLElement, never>;
    get textColor(): string;
    show(theme: any): void;
    get enumerationElementPosition(): {
        x: number;
        y: number;
    };
    get beginningElementPosition(): {
        x: number;
        y: number;
    };
}
