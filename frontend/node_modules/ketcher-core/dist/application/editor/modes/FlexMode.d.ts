import { LayoutMode } from "./types";
import { BaseMode } from "./internal";
import { Command } from "../../../domain/entities/Command";
export declare class FlexMode extends BaseMode {
    constructor(previousMode?: LayoutMode);
    initialize(): Command;
    getNewNodePosition(): import("../../..").Vec2;
    applyAdditionalPasteOperations(): Command;
    isPasteAllowedByMode(): boolean;
    isPasteAvailable(): boolean;
    scrollForView(): void;
}
