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
import { Struct, Vec2 } from "../../domain/entities";
import { RaphaelPaper } from 'raphael';
import { ReStruct } from './restruct';
import { RenderOptions, ViewBox } from './render.types';
export declare class Render {
    skipRaphaelInitialization: boolean;
    readonly clientArea: HTMLElement;
    readonly paper: RaphaelPaper;
    sz: Vec2;
    ctab: ReStruct;
    options: RenderOptions;
    viewBox: ViewBox;
    private readonly userOpts;
    private oldCb;
    private scrollbar;
    private resizeObserver;
    constructor(clientArea: HTMLElement, options: RenderOptions, reuseRestructIfExist?: boolean);
    observeCanvasResize: () => void;
    unobserveCanvasResize: () => void;
    updateOptions(opts: string): false | RenderOptions;
    selectionPolygon(polygon: Vec2[]): any;
    selectionLine(point0: Vec2, point1: Vec2): any;
    selectionRectangle(point0: Vec2, point1: Vec2): any;
    /** @deprecated recommend using `CoordinateTransformation.pageToModel` instead */
    page2obj(event: MouseEvent | {
        clientX: number;
        clientY: number;
    }): Vec2;
    setZoom(zoom: number, event?: WheelEvent): void;
    private getCanvasSizeVector;
    resizeViewBox(): void;
    private zoomOnCanvasCenter;
    private zoomOnMouse;
    /**
     * @see https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox
     */
    setViewBox(func: (viewBox: ViewBox) => ViewBox): void;
    setViewBox(viewBox: ViewBox): void;
    setMolecule(struct: Struct, forceUpdateWithTimeout?: boolean): void;
    update(force?: boolean, viewSz?: Vec2 | null): void;
}
