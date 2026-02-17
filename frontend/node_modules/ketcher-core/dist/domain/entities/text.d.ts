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
import { Vec2, Point } from './vec2';
import { BaseMicromoleculeEntity, initiallySelectedType } from "./BaseMicromoleculeEntity";
export declare enum TextCommand {
    Bold = "BOLD",
    Italic = "ITALIC",
    Subscript = "SUBSCRIPT",
    Superscript = "SUPERSCRIPT",
    FontSize = "CUSTOM_FONT_SIZE"
}
export interface TextAttributes {
    content: string;
    position: Point;
    pos: Array<Point>;
    initiallySelected?: initiallySelectedType;
}
export declare class Text extends BaseMicromoleculeEntity {
    content: string;
    position: Vec2;
    pos: Array<Vec2>;
    constructor(attributes?: TextAttributes);
    setPos(coords: Array<Vec2>): void;
    clone(): Text;
}
