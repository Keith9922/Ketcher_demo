export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    LOG = 3
}
export interface LogSettings {
    enabled?: boolean;
    showTrace?: boolean;
    level?: LogLevel;
}
export declare class KetcherLogger {
    static get settings(): LogSettings;
    static set settings(newSettings: LogSettings);
    static log(...messages: unknown[]): void;
    static info(...messages: unknown[]): void;
    static warn(...warnings: unknown[]): void;
    static error(...errors: unknown[]): void;
    private static isMinimumLogLevel;
}
