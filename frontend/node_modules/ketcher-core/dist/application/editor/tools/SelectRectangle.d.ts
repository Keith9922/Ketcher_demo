import { CoreEditor } from "../internal";
import { BaseTool } from "./Tool";
declare class SelectRectangle implements BaseTool {
    private editor;
    private brush;
    private brushArea;
    private moveStarted;
    private mousePositionAfterMove;
    private mousePositionBeforeMove;
    private canvasResizeObserver?;
    private history;
    private previousSelectedEntities;
    constructor(editor: CoreEditor);
    private createBrush;
    mousedown(event: any): void;
    mousemove(): void;
    mouseup(event: any): void;
    mouseOverDrawingEntity(event: any): void;
    mouseLeaveDrawingEntity(event: any): void;
    mouseOverPolymerBond(event: any): void;
    mouseLeavePolymerBond(event: any): void;
    setSelectedEntities(): void;
    destroy(): void;
}
export { SelectRectangle };
