/**
 *
 * Legacy browser API doesn't support async operations, so it is not possible
 * to call indigo, when copy/cut/paste
 */
export declare function isClipboardAPIAvailable(): boolean;
export declare function legacyCopy(clipboardData: any, data: any): void;
export declare function legacyPaste(cb: any, formats: any): {};
export declare function notifyCopyCut(): void;
export declare function getStructStringFromClipboardData(data: ClipboardItem[]): Promise<string>;
export declare function safelyGetMimeType(clipboardItem: ClipboardItem, mimeType: string): Promise<Blob | "">;
