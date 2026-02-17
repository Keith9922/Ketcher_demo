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
import { RenderersManager } from "../../../render/renderers/RenderersManager";
import { Operation } from "../../../../domain/entities/Operation";
import { BaseMonomer } from "../../../../domain/entities/BaseMonomer";
import { AttachmentPointName } from "../../../../domain/types";
export declare class MonomerAddOperation implements Operation {
    addMonomerChangeModel: (monomer?: BaseMonomer) => BaseMonomer;
    deleteMonomerChangeModel: (monomer: BaseMonomer) => void;
    private callback?;
    monomer: BaseMonomer;
    priority: number;
    constructor(addMonomerChangeModel: (monomer?: BaseMonomer) => BaseMonomer, deleteMonomerChangeModel: (monomer: BaseMonomer) => void, callback?: (() => void) | undefined);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
export declare class MonomerMoveOperation implements Operation {
    private monomerMoveModelChange;
    private invertMonomerMoveModelChange;
    monomer: BaseMonomer;
    constructor(monomerMoveModelChange: () => BaseMonomer, invertMonomerMoveModelChange: () => BaseMonomer);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
export declare class MonomerHoverOperation implements Operation {
    private peptide;
    private needRedrawAttachmentPoints;
    constructor(peptide: BaseMonomer, needRedrawAttachmentPoints: boolean);
    execute(renderersManager: RenderersManager): void;
    invert(): void;
}
export declare class AttachmentPointHoverOperation implements Operation {
    private peptide;
    private attachmentPointName;
    constructor(peptide: BaseMonomer, attachmentPointName: AttachmentPointName);
    execute(renderersManager: RenderersManager): void;
    invert(): void;
}
export declare class MonomerDeleteOperation implements Operation {
    addMonomerChangeModel: (monomer: BaseMonomer) => BaseMonomer;
    deleteMonomerChangeModel: (monomer: BaseMonomer) => void;
    private callback?;
    monomer: BaseMonomer;
    priority: number;
    constructor(monomer: BaseMonomer, addMonomerChangeModel: (monomer: BaseMonomer) => BaseMonomer, deleteMonomerChangeModel: (monomer: BaseMonomer) => void, callback?: (() => void) | undefined);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
export declare class MonomerItemModifyOperation implements Operation {
    updateMonomerItem: () => BaseMonomer;
    revertMonomerItem: () => BaseMonomer;
    monomer: BaseMonomer;
    constructor(monomer: BaseMonomer, updateMonomerItem: () => BaseMonomer, revertMonomerItem: () => BaseMonomer);
    execute(): void;
    invert(): void;
}
