/****************************************************************************
 * Copyright 2021 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/
import { RaphaelPaper, Element } from 'raphael';
import { HalfBond, Vec2 } from "../../domain/entities";
import { ArrowItem, RelativeBox, RenderOptions } from './render.types';
export declare function getArrowHeadDimensions(options: RenderOptions): {
    arrowHeadLength: number;
    arrowHeadWidth: number;
    arrowHeadAttr: number;
    arrowOffset: number;
};
declare function rectangle(paper: RaphaelPaper, points: [Vec2, Vec2]): any;
declare function rectangleArrowHighlightAndSelection(_paper: RaphaelPaper, { pos: [start], height }: ArrowItem, length: number, angle: number): string;
declare function ellipse(paper: RaphaelPaper, points: [Vec2, Vec2]): any;
declare function polyline(paper: RaphaelPaper, points: Vec2[]): any;
declare function line(paper: RaphaelPaper, points: [Vec2, Vec2]): any;
declare function arrow(paper: RaphaelPaper, item: ArrowItem, length: number, angle: number, options: RenderOptions, isResizing: boolean): any;
declare function plus(paper: RaphaelPaper, point: Vec2, options: RenderOptions): any;
declare function bondSingle(paper: RaphaelPaper, halfBond1: HalfBond, halfBond2: HalfBond, options: RenderOptions, isSnapping: boolean, color?: string): any;
declare function bondSingleUp(paper: RaphaelPaper, a: Vec2, b2: Vec2, b3: Vec2, options: RenderOptions, isSnapping: boolean, color?: string): any;
declare function bondSingleStereoBold(paper: RaphaelPaper, a1: Vec2, a2: Vec2, a3: Vec2, a4: Vec2, options: RenderOptions, isSnapping: boolean, color?: string): any;
declare function bondDoubleStereoBold(paper: RaphaelPaper, sgBondPath: Element, b1: Vec2, b2: Vec2, options: RenderOptions, isSnapping: boolean, color?: string): any;
declare function bondSingleDown(paper: RaphaelPaper, halfBond1: HalfBond, d: Vec2, nlines: number, step: number, options: RenderOptions, isSnapping: boolean, color?: string): any;
declare function bondSingleEither(paper: RaphaelPaper, halfBond1: HalfBond, d: Vec2, nlines: number, step: number, options: RenderOptions, isSnapping: boolean, color?: string): any;
declare function bondDouble(paper: RaphaelPaper, a1: Vec2, a2: Vec2, b1: Vec2, b2: Vec2, cisTrans: boolean, options: RenderOptions, isSnapping: boolean): any;
declare function bondSingleOrDouble(paper: RaphaelPaper, halfBond1: HalfBond, halfBond2: HalfBond, nSect: number, options: RenderOptions, isSnapping: boolean): any;
declare function bondTriple(paper: RaphaelPaper, halfBond1: HalfBond, halfBond2: HalfBond, options: RenderOptions, isSnapping: boolean, color?: string): any;
declare function bondAromatic(paper: RaphaelPaper, paths: string[], bondShift: number, options: RenderOptions, isSnapping: boolean): any;
declare function bondAny(paper: RaphaelPaper, halfBond1: HalfBond, halfBond2: HalfBond, options: RenderOptions, isSnapping: boolean): any;
declare function bondHydrogen(paper: RaphaelPaper, halfBond1: HalfBond, halfBond2: HalfBond, options: RenderOptions, isSnapping: boolean): any;
declare function bondDative(paper: RaphaelPaper, halfBond1: HalfBond, halfBond2: HalfBond, options: RenderOptions, isSnapping: boolean): any;
declare function reactingCenter(paper: RaphaelPaper, points: Vec2[], options: RenderOptions): any;
declare function bondMark(paper: RaphaelPaper, point: Vec2, mark: string | null, options: RenderOptions): any;
declare function radicalCap(paper: RaphaelPaper, point1: Vec2, options: RenderOptions): any;
declare function radicalBullet(paper: RaphaelPaper, point1: Vec2, options: RenderOptions): any;
declare function bracket(paper: RaphaelPaper, bracketAngleDirection: Vec2, bracketDirection: Vec2, bondCenter: Vec2, bracketWidth: number, bracketHeight: number, options: RenderOptions, isBracketContainAttachment?: boolean): any;
declare function selectionRectangle(paper: RaphaelPaper, point1: Vec2, point2: Vec2, options: RenderOptions): any;
declare function selectionPolygon(paper: RaphaelPaper, r: Vec2[], options: RenderOptions): any;
declare function selectionLine(paper: RaphaelPaper, point1: Vec2, point2: Vec2, options: RenderOptions): any;
declare function aromaticBondPaths(a2: Vec2, a3: Vec2, b2: Vec2, b3: Vec2, mask: number, dash: number[] | null): string[];
declare function recenterText(path: Element, relativeBox: RelativeBox): void;
declare function rgroupAttachmentPoint(paper: RaphaelPaper, shiftedAtomPositionVector: Vec2, attachmentPointEnd: Vec2, directionVector: Vec2, options: RenderOptions): any;
declare function rgroupAttachmentPointLabel(paper: RaphaelPaper, labelPosition: Vec2, labelText: string, options: RenderOptions, fill: any): any;
declare const _default: {
    recenterText: typeof recenterText;
    arrow: typeof arrow;
    plus: typeof plus;
    aromaticBondPaths: typeof aromaticBondPaths;
    bondSingle: typeof bondSingle;
    bondSingleUp: typeof bondSingleUp;
    bondSingleStereoBold: typeof bondSingleStereoBold;
    bondDoubleStereoBold: typeof bondDoubleStereoBold;
    bondSingleDown: typeof bondSingleDown;
    bondSingleEither: typeof bondSingleEither;
    bondDouble: typeof bondDouble;
    bondSingleOrDouble: typeof bondSingleOrDouble;
    bondTriple: typeof bondTriple;
    bondAromatic: typeof bondAromatic;
    bondAny: typeof bondAny;
    bondHydrogen: typeof bondHydrogen;
    bondDative: typeof bondDative;
    reactingCenter: typeof reactingCenter;
    bondMark: typeof bondMark;
    radicalCap: typeof radicalCap;
    radicalBullet: typeof radicalBullet;
    bracket: typeof bracket;
    selectionRectangle: typeof selectionRectangle;
    selectionPolygon: typeof selectionPolygon;
    selectionLine: typeof selectionLine;
    ellipse: typeof ellipse;
    rectangle: typeof rectangle;
    rectangleArrowHighlightAndSelection: typeof rectangleArrowHighlightAndSelection;
    polyline: typeof polyline;
    line: typeof line;
    rgroupAttachmentPoint: typeof rgroupAttachmentPoint;
    rgroupAttachmentPointLabel: typeof rgroupAttachmentPointLabel;
};
export default _default;
