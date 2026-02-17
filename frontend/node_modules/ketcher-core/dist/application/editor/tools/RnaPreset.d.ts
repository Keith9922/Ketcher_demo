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
import { Tool, IRnaPreset } from "./Tool";
import { CoreEditor, EditorHistory } from "../internal";
import { MonomerItemType } from "../../../domain/types";
export declare const RNA_MONOMER_DISTANCE = 22.5;
declare class RnaPresetTool implements Tool {
    private editor;
    rnaBase: MonomerItemType | undefined;
    sugar: MonomerItemType | undefined;
    phosphate: MonomerItemType | undefined;
    private rnaBasePreview;
    private phosphatePreview;
    private sugarPreview;
    private rnaBasePreviewRenderer;
    private phosphatePreviewRenderer;
    private sugarPreviewRenderer;
    readonly MONOMER_PREVIEW_SCALE_FACTOR = 0.5;
    readonly MONOMER_PREVIEW_OFFSET_X = 30;
    readonly MONOMER_PREVIEW_OFFSET_Y = 30;
    readonly RNA_BASE_PREVIEW_OFFSET_X = 1;
    readonly RNA_BASE_PREVIEW_OFFSET_Y = 20;
    readonly PHOSPHATE_PREVIEW_OFFSET_X = 18;
    history: EditorHistory;
    constructor(editor: CoreEditor, preset: IRnaPreset);
    mousedown(): void;
    mousemove(): void;
    mouseLeaveClientArea(): void;
    mouseover(): void;
    hidePreview(): void;
    destroy(): void;
}
export { RnaPresetTool };
