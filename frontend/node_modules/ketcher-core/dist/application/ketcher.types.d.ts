export declare enum ModeTypes {
    flex = "flex-layout-mode",
    snake = "snake-layout-mode",
    sequence = "sequence-layout-mode"
}
export declare type SupportedModes = keyof typeof ModeTypes;
export declare enum BlobTypes {
    svg = "image/svg+xml"
}
export declare type SupportedImageFormats = keyof typeof BlobTypes;
export declare type ExportImageParams = {
    margin?: number;
};
