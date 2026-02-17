import { FlexMode } from './FlexMode';
import { SequenceMode } from './SequenceMode';
import { SnakeMode } from './SnakeMode';
export * from './FlexMode';
export * from './SequenceMode';
export * from './SnakeMode';
export * from './types';
export declare const modesMap: {
    'flex-layout-mode': typeof FlexMode;
    'snake-layout-mode': typeof SnakeMode;
    'sequence-layout-mode': typeof SequenceMode;
};
