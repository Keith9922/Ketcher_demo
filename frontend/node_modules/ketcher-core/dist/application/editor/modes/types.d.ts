import { BaseMode } from "./BaseMode";
import { SequenceMode } from "./..";
export declare type LayoutMode = 'flex-layout-mode' | 'snake-layout-mode' | 'sequence-layout-mode';
export declare const DEFAULT_LAYOUT_MODE: LayoutMode;
export declare function isSequenceMode(mode: BaseMode): mode is SequenceMode;
