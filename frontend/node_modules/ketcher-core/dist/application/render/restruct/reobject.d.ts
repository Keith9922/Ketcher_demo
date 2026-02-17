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
import { Box2Abs } from "../../../domain/entities";
import ReStruct from './restruct';
import { Render } from '../raphaelRender';
import Visel from './visel';
declare class ReObject {
    visel: Visel;
    hover: boolean;
    hovering: any;
    selected: boolean;
    selectionPlate: any;
    constructor(viselType: string);
    changeSelectionStyle(options: any): void;
    getVBoxObj(render: Render): Box2Abs | null;
    setHover(hover: boolean, render: Render): void;
    drawHover(_render: Render): any;
    makeSelectionPlate(_restruct: ReStruct, _paper: any, _styles: any): any;
}
export default ReObject;
