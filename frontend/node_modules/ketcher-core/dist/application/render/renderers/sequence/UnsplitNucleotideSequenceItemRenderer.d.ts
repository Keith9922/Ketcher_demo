import { BaseSequenceItemRenderer } from "./BaseSequenceItemRenderer";
export declare class UnsplitNucleotideSequenceItemRenderer extends BaseSequenceItemRenderer {
    get symbolToDisplay(): string;
    protected drawModification(): void;
}
