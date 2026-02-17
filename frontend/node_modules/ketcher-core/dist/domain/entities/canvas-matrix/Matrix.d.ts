export declare class Matrix<T> {
    private matrix;
    constructor();
    get(x: number, y: number): T | undefined;
    getRow(x: number): T[];
    set(x: number, y: number, value: T): void;
    get height(): number;
    get width(): number;
    forEach(callback: (value: T, x: number, y: number) => void): void;
    forEachRightToLeft(callback: (value: T, x: number, y: number) => void): void;
    forEachBottomToTop(callback: (value: T, x: number, y: number) => void): void;
}
