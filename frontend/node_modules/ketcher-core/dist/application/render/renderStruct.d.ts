import { Struct } from "../../domain/entities";
import { Render } from './raphaelRender';
export declare class RenderStruct {
    /**
     * for S-Groups we want to show expanded structure
     * without brackets
     */
    static prepareStruct(struct: Struct): Struct;
    static removeSmallAttachmentPointLabelsInModal(render: Render, options?: any): void;
    static render(wrapperElement: HTMLElement | null, struct: Struct | null, options?: any): void;
}
