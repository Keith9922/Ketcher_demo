import { BaseSequenceItemRenderer } from "./BaseSequenceItemRenderer";
export declare class ChemSequenceItemRenderer extends BaseSequenceItemRenderer {
    get symbolToDisplay(): string;
    protected drawModification(): void;
    show(): void;
}
