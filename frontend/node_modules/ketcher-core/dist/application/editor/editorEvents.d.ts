import { ToolEventHandlerName } from "./tools/Tool";
import { CoreEditor } from "./Editor";
export declare let editorEvents: any;
export declare function resetEditorEvents(): void;
export declare const renderersEvents: ToolEventHandlerName[];
export declare const hotkeysConfiguration: {
    RNASequenceType: {
        shortcut: string[];
        handler: (editor: CoreEditor) => void;
    };
    DNASequenceType: {
        shortcut: string[];
        handler: (editor: CoreEditor) => void;
    };
    PEPTIDESequenceTYpe: {
        shortcut: string[];
        handler: (editor: CoreEditor) => void;
    };
    exit: {
        shortcut: string[];
        handler: (editor: CoreEditor) => void;
    };
    undo: {
        shortcut: string;
        handler: (editor: CoreEditor) => void;
    };
    redo: {
        shortcut: string[];
        handler: (editor: CoreEditor) => void;
    };
    erase: {
        shortcut: string[];
        handler: (editor: CoreEditor) => void;
    };
    clear: {
        shortcut: string[];
        handler: (editor: CoreEditor) => void;
    };
    'zoom-plus': {
        shortcut: string;
        handler: () => void;
    };
    'zoom-minus': {
        shortcut: string;
        handler: () => void;
    };
    'zoom-reset': {
        shortcut: string;
        handler: () => void;
    };
    'select-all': {
        shortcut: string;
        handler: (editor: CoreEditor) => void;
    };
    hand: {
        shortcut: string;
        handler: (editor: CoreEditor) => void;
    };
};
