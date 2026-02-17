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
import { SGroup } from "../../../domain/entities";
import ReStruct from './restruct';
import { Render } from '../raphaelRender';
import ReObject from './reobject';
import { RaphaelPaper } from 'raphael';
declare class ReSGroup extends ReObject {
    item: SGroup | undefined;
    render: Render;
    constructor(sgroup: SGroup);
    static isSelectable(): boolean;
    /**
     * @param remol {ReStruct}
     * @param sgroup {SGroup}
     * @returns {*}
     */
    draw(remol: ReStruct, sgroup: SGroup): any;
    getTextHighlightDimensions(padding: number | undefined, render: Render): {
        startX: number;
        startY: number;
        width: number;
        height: number;
    };
    getContractedSelectionContour(render: Render): any;
    makeSelectionPlate(restruct: ReStruct, _paper: RaphaelPaper, options: any): any | void;
    drawHover(render: Render): void;
    show(restruct: ReStruct): void;
}
export default ReSGroup;
