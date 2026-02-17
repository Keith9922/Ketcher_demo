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
import { RxnArrowMode, Vec2 } from "../../../domain/entities";
import ReObject from './reobject';
import ReStruct from './restruct';
import { Render } from '../raphaelRender';
declare type Arrow = {
    pos: Array<Vec2>;
    mode: RxnArrowMode;
    height?: number;
};
declare type ArrowParams = {
    length: number;
    angle: number;
};
interface MinDistanceWithReferencePoint {
    minDist: number;
    refPoint: Vec2 | null;
}
declare class ReRxnArrow extends ReObject {
    item: Arrow;
    isResizing: boolean;
    constructor(/* chem.RxnArrow */ arrow: Arrow);
    static isSelectable(): boolean;
    calcDistance(p: Vec2, s: any): MinDistanceWithReferencePoint;
    getReferencePointDistance(p: Vec2): MinDistanceWithReferencePoint;
    hoverPath(render: Render): any;
    drawHover(render: Render): any;
    getReferencePoints(): Array<Vec2>;
    makeAdditionalInfo(restruct: ReStruct): any;
    makeSelectionPlate(restruct: ReStruct, _paper: any, styles: any): any;
    generatePath(render: Render, options: any, type: any): any;
    getArrowParams(x1: any, y1: any, x2: any, y2: any): ArrowParams;
    show(restruct: ReStruct, _id: any, options: any): void;
}
export default ReRxnArrow;
