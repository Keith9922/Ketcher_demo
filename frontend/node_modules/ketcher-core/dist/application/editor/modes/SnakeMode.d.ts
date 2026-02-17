import { BaseMode } from "./BaseMode";
import { LayoutMode } from "./";
import { Command } from "../../../domain/entities/Command";
import { Vec2 } from "../../../domain/entities";
export declare class SnakeMode extends BaseMode {
    constructor(previousMode?: LayoutMode);
    initialize(_needRemoveSelection: boolean, _isUndo?: boolean): Command;
    getNewNodePosition(): Vec2;
    scrollForView(): void;
    applyAdditionalPasteOperations(): Command;
    isPasteAllowedByMode(): boolean;
    isPasteAvailable(): boolean;
}
