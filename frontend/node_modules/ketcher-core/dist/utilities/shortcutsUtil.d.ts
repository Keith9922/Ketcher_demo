export declare function shortcutStr(shortcut?: string | string[]): string;
export declare const generateMenuShortcuts: <T>(obj: any) => { [key in keyof T]: string; };
