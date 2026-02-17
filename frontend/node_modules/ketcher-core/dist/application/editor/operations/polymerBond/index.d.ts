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
import { PolymerBond } from "../../../../domain/entities/PolymerBond";
import { RenderersManager } from "../../../render/renderers/RenderersManager";
import { Operation } from "../../../../domain/entities/Operation";
import { BaseMonomer } from "../../../../domain/entities/BaseMonomer";
import { HydrogenBond } from "../../../../domain/entities";
export declare class PolymerBondAddOperation implements Operation {
    private addPolymerBondChangeModel;
    private deletePolymerBondChangeModel;
    polymerBond: any;
    priority: number;
    constructor(addPolymerBondChangeModel: (polymerBond?: PolymerBond | HydrogenBond) => PolymerBond | HydrogenBond, deletePolymerBondChangeModel: (polymerBond: any) => void);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
export declare class PolymerBondDeleteOperation implements Operation {
    polymerBond: PolymerBond | HydrogenBond;
    private deletePolymerBondChangeModel;
    private finishPolymerBondCreationModelChange;
    priority: number;
    constructor(polymerBond: PolymerBond | HydrogenBond, deletePolymerBondChangeModel: () => void, finishPolymerBondCreationModelChange: (polymerBond?: PolymerBond | HydrogenBond) => PolymerBond | HydrogenBond);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
export declare class PolymerBondMoveOperation implements Operation {
    polymerBond: PolymerBond;
    constructor(polymerBond: PolymerBond);
    execute(renderersManager: RenderersManager): void;
    invert(): void;
}
export declare class PolymerBondShowInfoOperation implements Operation {
    polymerBond: PolymerBond;
    constructor(polymerBond: PolymerBond);
    execute(renderersManager: RenderersManager): void;
    invert(): void;
}
export declare class PolymerBondCancelCreationOperation implements Operation {
    polymerBond: PolymerBond;
    private secondMonomer?;
    constructor(polymerBond: PolymerBond, secondMonomer?: BaseMonomer | undefined);
    execute(renderersManager: RenderersManager): void;
    invert(): void;
}
export declare class PolymerBondFinishCreationOperation implements Operation {
    private finishPolymerBondCreationModelChange;
    private deletePolymerBondCreationModelChange;
    polymerBond: any;
    priority: number;
    constructor(finishPolymerBondCreationModelChange: (polymerBond?: PolymerBond) => PolymerBond, deletePolymerBondCreationModelChange: (polymerBond: any) => void);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
export declare class SelectLayoutModeOperation implements Operation {
    _onExecute: () => void;
    _onInvert: () => void;
    mode: any;
    prevMode: any;
    private onExecute;
    private onInvert;
    constructor(_onExecute: () => void, _onInvert: () => void, mode: any, prevMode: any);
    execute(): void;
    invert(): void;
}
export declare class ReconnectPolymerBondOperation implements Operation {
    private reconnectPolymerBondModelChange;
    private revertReconnectPolymerBondModelChange;
    polymerBond: any;
    constructor(reconnectPolymerBondModelChange: () => PolymerBond, revertReconnectPolymerBondModelChange: () => PolymerBond);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
