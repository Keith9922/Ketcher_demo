import { BaseSequenceItemRenderer } from "./BaseSequenceItemRenderer";
export declare class EmptySequenceItemRenderer extends BaseSequenceItemRenderer {
    get symbolToDisplay(): string;
    protected drawModification(): void;
}
