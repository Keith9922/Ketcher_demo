import { BaseSequenceItemRenderer } from "./BaseSequenceItemRenderer";
export declare class PeptideSequenceItemRenderer extends BaseSequenceItemRenderer {
    #private;
    get symbolToDisplay(): string;
    private drawLine;
    protected drawModification(): void;
}
