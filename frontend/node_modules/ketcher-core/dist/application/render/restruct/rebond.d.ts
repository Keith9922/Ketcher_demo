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
import { Bond, Vec2 } from "../../../domain/entities";
import ReObject from './reobject';
import ReStruct from './restruct';
import { Render } from '../raphaelRender';
declare class ReBond extends ReObject {
    b: Bond;
    doubleBondShift: number;
    path: any;
    neihbid1: number;
    neihbid2: number;
    boldStereo?: boolean;
    rbb?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    cip?: {
        path: any;
        text: any;
        rectangle: any;
    };
    constructor(bond: Bond);
    static isSelectable(): boolean;
    private static getAtomPositionForBond;
    static bondRecalc(bond: ReBond, restruct: ReStruct, options: any): void;
    drawHover(render: Render): any;
    getSelectionPoints(render: Render, isHighlight?: boolean): Vec2[];
    getSelectionContour(render: Render, isHighlight: boolean): any;
    makeHoverPlate(render: Render): any;
    makeSelectionPlate(restruct: ReStruct, _: any, options: any): any;
    private isPlateShouldBeHidden;
    private makeHighlitePlate;
    show(restruct: ReStruct, bid: number, options: any): void;
}
export declare function getBondLineShift(cos: number, sin: number): number;
export default ReBond;
