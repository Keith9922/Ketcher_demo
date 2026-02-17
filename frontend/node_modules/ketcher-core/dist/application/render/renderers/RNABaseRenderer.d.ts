import { Selection } from 'd3';
import { RNABase } from "../../../domain/entities/RNABase";
import { BaseMonomerRenderer } from "./BaseMonomerRenderer";
export declare class RNABaseRenderer extends BaseMonomerRenderer {
    monomer: RNABase;
    constructor(monomer: RNABase, scale?: number);
    get textColor(): "#fff" | "#333333";
    protected get modificationConfig(): {
        backgroundId: string;
    };
    protected appendBody(rootElement: Selection<SVGGElement, void, HTMLElement, never>, theme: any): Selection<SVGUseElement, this, HTMLElement, never>;
    show(theme: any): void;
    get enumerationElementPosition(): {
        x: number;
        y: number;
    };
    get beginningElementPosition(): undefined;
}
