import { Operation } from "../../../../domain/entities/Operation";
import { RenderersManager } from "../../../render/renderers/RenderersManager";
export declare class RecalculateCanvasMatrixOperation implements Operation {
    private recalculateCanvasMatrixModelChange;
    private invertRecalculateCanvasMatrixModelChange;
    priority: number;
    constructor(recalculateCanvasMatrixModelChange: () => void, invertRecalculateCanvasMatrixModelChange: () => void);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
