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
import { Vec2 } from "../../../domain/entities";
import ReObject from './reobject';
import ReStruct from './restruct';
import { Render } from '../raphaelRender';
interface MinDistanceWithReferencePoint {
    minDist: number;
    refPoint: Vec2 | null;
}
interface StyledPath {
    path: any;
    stylesApplied: boolean;
}
declare class ReSimpleObject extends ReObject {
    private item;
    private selectionSet;
    private selectionPointsSet;
    constructor(simpleObject: any);
    static isSelectable(): boolean;
    calcDistance(p: Vec2, s: any): MinDistanceWithReferencePoint;
    getReferencePointDistance(p: Vec2): MinDistanceWithReferencePoint;
    getReferencePoints(onlyOnObject?: boolean): Array<Vec2>;
    getFigureHoverPath(path: any, render: Render, isBorder?: boolean): any;
    hoverPath(render: Render): Array<StyledPath>;
    drawHover(render: Render): Array<any>;
    makeSelectionPlate(restruct: ReStruct, paper: any, styles: any): any;
    togglePoints(displayFlag: boolean): void;
    show(restruct: ReStruct, options: any): void;
}
export default ReSimpleObject;
