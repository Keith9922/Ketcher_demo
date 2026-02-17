import { Command } from "../../../domain/entities/Command";
import { LayoutMode } from "./";
import { ChemicalMimeType } from "../../../domain/services";
import { DrawingEntitiesManager } from "../../../domain/entities/DrawingEntitiesManager";
export declare abstract class BaseMode {
    modeName: LayoutMode;
    previousMode: LayoutMode;
    private _pasteIsInProgress;
    protected constructor(modeName: LayoutMode, previousMode?: LayoutMode);
    private changeMode;
    initialize(needRemoveSelection?: boolean, _isUndo?: boolean, _needReArrangeChains?: boolean): Command;
    onKeyDown(event: KeyboardEvent): Promise<void>;
    get keyboardEventHandlers(): {};
    abstract getNewNodePosition(): any;
    abstract applyAdditionalPasteOperations(_drawingEntitiesManager: DrawingEntitiesManager): Command;
    abstract isPasteAllowedByMode(drawingEntitiesManager: DrawingEntitiesManager): boolean;
    abstract isPasteAvailable(drawingEntitiesManager: DrawingEntitiesManager): boolean;
    abstract scrollForView(): void;
    onCopy(event?: ClipboardEvent): void;
    onPaste(event: ClipboardEvent): Promise<void>;
    pasteFromClipboard(clipboardData: any): Promise<void>;
    pasteKetFormatFragment(pastedStr: string): Command | undefined;
    pasteWithIndigoConversion(pastedStr: string, inputFormat: ChemicalMimeType, isSequenceOrFasta?: boolean): Promise<Command | undefined>;
    private updateEntitiesPosition;
    unsupportedSymbolsError(errorMessage: string, isSequenceOrFasta?: boolean): void;
    private checkIfTargetIsInput;
    destroy(): void;
}
