import { RenderersManager } from "../../../render/renderers/RenderersManager";
import { Operation } from "../../../../domain/entities/Operation";
import { DrawingEntity } from "../../../../domain/entities/DrawingEntity";
export declare class DrawingEntityHoverOperation implements Operation {
    private drawingEntity;
    constructor(drawingEntity: DrawingEntity);
    execute(renderersManager: RenderersManager): void;
    invert(): void;
}
export declare class DrawingEntitySelectOperation implements Operation {
    private drawingEntity;
    constructor(drawingEntity: DrawingEntity);
    execute(renderersManager: RenderersManager): void;
    invert(): void;
}
export declare class DrawingEntityMoveOperation implements Operation {
    private moveDrawingEntityChangeModel;
    private invertMoveDrawingEntityChangeModel;
    private redoDrawingEntityChangeModel;
    private drawingEntity;
    private wasInverted;
    constructor(moveDrawingEntityChangeModel: () => void, invertMoveDrawingEntityChangeModel: () => void, redoDrawingEntityChangeModel: () => void, drawingEntity: DrawingEntity);
    execute(): void;
    invert(): void;
    executeAfterAllOperations(renderersManager: RenderersManager): void;
    invertAfterAllOperations(renderersManager: RenderersManager): void;
}
export declare class DrawingEntityRedrawOperation implements Operation {
    private drawingEntityRedrawModelChange;
    private invertDrawingEntityRedrawModelChange;
    constructor(drawingEntityRedrawModelChange: () => DrawingEntity, invertDrawingEntityRedrawModelChange: () => DrawingEntity);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
