import { BaseTool, CoreEditor } from "./..";
export declare class HandTool implements BaseTool {
    private editor;
    private readonly dragBehavior;
    constructor(editor: CoreEditor);
    private handleDragStart;
    private handleDragging;
    private handleDragEnd;
    destroy(): void;
}
