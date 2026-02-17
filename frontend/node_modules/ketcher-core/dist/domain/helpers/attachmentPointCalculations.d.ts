import { BaseMonomer } from "../entities";
import { AttachmentPointName } from "../types";
export declare type Coordinates = {
    x: number;
    y: number;
};
export declare function canvasToMonomerCoordinates(coordinatesOnCanvas: Coordinates, centerOFMonomer: Coordinates, monomerWidth: number, monomerHeight: number): {
    x: number;
    y: number;
};
export declare function findLabelPoint(pointOnBorder: Coordinates, angle: number, lineLength: number, lineOffset: number, labelSize: {
    x: number;
    y: number;
}, isUsed: boolean): {
    x: number;
    y: number;
}[];
export declare function getSearchFunction(initialAngle: number, canvasOffset: Coordinates, monomer: BaseMonomer): (coordStart: Coordinates, length: number, applyZoomForPositionCalculation: boolean, angle?: number) => any;
export declare const anglesToSector: {
    '45': {
        min: number;
        max: number;
        center: number;
    };
    '90': {
        min: number;
        max: number;
        center: number;
    };
    '135': {
        min: number;
        max: number;
        center: number;
    };
    '180': {
        min: number;
        max: number;
        center: number;
    };
    '225': {
        min: number;
        max: number;
        center: number;
    };
    '270': {
        min: number;
        max: number;
        center: number;
    };
    '315': {
        min: number;
        max: number;
        center: number;
    };
    '360': {
        min: number;
        max: number;
        center: number;
    };
    '0': {
        min: number;
        max: number;
        center: number;
    };
};
export declare enum attachmentPointNumberToAngle {
    'R1' = 0,
    'R2' = 180,
    'R3' = 90,
    'R4' = 270,
    'R5' = 45,
    'R6' = 135,
    'R7' = 315,
    'R8' = 225
}
export declare const sectorsList: number[];
export declare function checkFor0and360(sectorsList: number[]): number[];
export declare function getAttachmentPointLabelWithBinaryShift(attachmentPointNumber: number): string;
export declare function getAttachmentPointLabel(attachmentPointNumber: number): AttachmentPointName;
export declare function getAttachmentPointNumberFromLabel(attachmentPointLabel: AttachmentPointName): number;
