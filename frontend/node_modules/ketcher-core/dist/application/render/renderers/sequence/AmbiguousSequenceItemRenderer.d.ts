import { BaseSequenceItemRenderer } from "./BaseSequenceItemRenderer";
export declare class AmbiguousSequenceItemRenderer extends BaseSequenceItemRenderer {
    get symbolToDisplay(): string;
    protected drawModification(): void;
}
