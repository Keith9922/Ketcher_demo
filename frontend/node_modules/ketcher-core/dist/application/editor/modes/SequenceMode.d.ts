import { LayoutMode } from "./";
import { BaseMode } from "./BaseMode";
import { BaseSequenceItemRenderer } from "../../render/renderers/sequence/BaseSequenceItemRenderer";
import { MonomerItemType } from "../../../domain/types";
import { Command } from "../../../domain/entities/Command";
import { Vec2 } from "../../../domain/entities";
import { DrawingEntitiesManager } from "../../../domain/entities/DrawingEntitiesManager";
import { IRnaPreset, LabeledNodesWithPositionInSequence } from "../tools/Tool";
export interface StartNewSequenceEventData {
    indexOfRowBefore: number;
}
export declare class SequenceMode extends BaseMode {
    private _isEditMode;
    private _isEditInRNABuilderMode;
    private selectionStarted;
    private selectionStartCaretPosition;
    private mousemoveCounter;
    constructor(previousMode?: LayoutMode);
    get isEditMode(): boolean;
    set isEditMode(isEditMode: boolean);
    get isEditInRNABuilderMode(): boolean;
    set isEditInRNABuilderMode(isEditInRNABuilderMode: boolean);
    initialize(needScroll?: boolean, needRemoveSelection?: boolean, needReArrangeChains?: boolean): Command;
    turnOnEditMode(sequenceItemRenderer?: BaseSequenceItemRenderer, needToRemoveSelection?: boolean): void;
    turnOffEditMode(): void;
    turnOnSequenceEditInRNABuilderMode(): void;
    turnOffSequenceEditInRNABuilderMode(): void;
    startNewSequence(eventData?: StartNewSequenceEventData): void;
    modifySequenceInRnaBuilder(updatedSelection: LabeledNodesWithPositionInSequence[]): void;
    click(event: MouseEvent): void;
    doubleClickOnSequenceItem(event: MouseEvent): void;
    mousedownBetweenSequenceItems(event: MouseEvent): void;
    mousedown(event: MouseEvent): void;
    mousemove(event: MouseEvent): void;
    mouseup(): void;
    private bondNodesThroughNewPhosphate;
    private handlePeptideNodeAddition;
    private handleRnaDnaNodeAddition;
    private connectNodes;
    private deleteBondToNextNodeInChain;
    private finishNodesDeletion;
    private tryToCreatePolymerBond;
    private handleNodesDeletion;
    get keyboardEventHandlers(): {
        delete: {
            shortcut: string[];
            handler: () => void;
        };
        backspace: {
            shortcut: string[];
            handler: () => void;
        };
        'turn-off-edit-mode': {
            shortcut: string[];
            handler: () => void;
        };
        'start-new-sequence': {
            shortcut: string[];
            handler: () => void;
        };
        'move-caret-up': {
            shortcut: string[];
            handler: () => void;
        };
        'move-caret-down': {
            shortcut: string[];
            handler: () => void;
        };
        'move-caret-forward': {
            shortcut: string[];
            handler: () => void;
        };
        'move-caret-back': {
            shortcut: string[];
            handler: () => void;
        };
        'add-sequence-item': {
            shortcut: string[];
            handler: (event: any) => void;
        };
        'sequence-edit-select': {
            shortcut: string[];
            handler: (event: any) => void;
        };
    };
    private deleteSelection;
    isPasteAllowedByMode(drawingEntitiesManager: DrawingEntitiesManager): boolean;
    private isR1Free;
    private isR2Free;
    private areR1R2Free;
    private isConnectionPossible;
    isPasteAvailable(drawingEntitiesManager: DrawingEntitiesManager): boolean;
    applyAdditionalPasteOperations(drawingEntitiesManager: DrawingEntitiesManager): Command;
    private preserveSideChainConnections;
    private replaceSelectionWithMonomer;
    private replaceSelectionsWithMonomer;
    private checkIfNewMonomerCouldEstablishConnections;
    private selectionsContainLinkerNode;
    private selectionsCantPreserveConnectionsWithMonomer;
    private presetHasNeededAttachmentPoints;
    private selectionsCantPreserveConnectionsWithPreset;
    private checkNodeInsertionPossibility;
    insertMonomerFromLibrary(monomerItem: MonomerItemType): void;
    private createRnaPresetNode;
    private replaceSelectionWithPreset;
    private replaceSelectionsWithPreset;
    insertPresetFromLibrary(preset: IRnaPreset): void;
    private insertNewSequenceItem;
    private showMergeWarningModal;
    private insertNewSequenceFragment;
    getNewNodePosition(): Vec2;
    private deleteSelectedDrawingEntities;
    private getNewSequenceItemPosition;
    scrollForView(): void;
    private unselectAllEntities;
    destroy(): void;
}
