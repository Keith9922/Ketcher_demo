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
import { RawDraftContentBlock } from 'draft-js';
import { Box2Abs, Text, Vec2 } from "../../../domain/entities";
import ReObject from './reobject';
import ReStruct from './restruct';
import { RaphaelBaseElement } from 'raphael';
declare class ReText extends ReObject {
    private item;
    paths: Array<Array<RaphaelBaseElement>>;
    constructor(text: Text);
    static isSelectable(): boolean;
    getReferencePoints(): Array<Vec2>;
    getVBoxObj(): Box2Abs;
    hoverPath(render: any): any;
    getRelBox(paths: Array<Array<RaphaelBaseElement>>): {
        p0: Vec2;
        p1: Vec2;
    };
    getRowWidth(row: Array<RaphaelBaseElement>): number;
    drawHover(render: any): any;
    makeSelectionPlate(restruct: ReStruct, paper: any, options: any): any;
    show(restruct: ReStruct, _id: number, options: any): void;
    getRanges(block: RawDraftContentBlock, options: any): Array<[number, number, Record<string, any>]>;
    getStyles(block: RawDraftContentBlock, index: number, options: any): Record<string, string>;
}
export default ReText;
