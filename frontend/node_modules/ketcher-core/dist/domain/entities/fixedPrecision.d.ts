export declare class FixedPrecisionCoordinates {
    static MULTIPLIER: number;
    readonly value: number;
    static fromFloatingPrecision(value: number): FixedPrecisionCoordinates;
    constructor(value: number | FixedPrecisionCoordinates);
    add(fixedPrecisionValue: FixedPrecisionCoordinates): FixedPrecisionCoordinates;
    sub(fixedPrecisionValue: FixedPrecisionCoordinates): FixedPrecisionCoordinates;
    multiply(value: FixedPrecisionCoordinates | number): FixedPrecisionCoordinates;
    divide(value: FixedPrecisionCoordinates | number): FixedPrecisionCoordinates;
    getFloatingPrecision(): number;
}
