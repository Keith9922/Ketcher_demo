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
import { Bond } from "../../../../domain/entities/CoreBond";
export declare class BondAddOperation implements Operation {
    addBondChangeModel: (bond?: Bond) => Bond;
    deleteBondChangeModel: (bond: Bond) => void;
    bond: Bond;
    private bondInMoleculeStruct?;
    priority: number;
    constructor(addBondChangeModel: (bond?: Bond) => Bond, deleteBondChangeModel: (bond: Bond) => void);
    execute(): void;
    invert(): void;
    executeAfterAllOperations(renderersManager: RenderersManager): void;
    invertAfterAllOperations(renderersManager: RenderersManager): void;
}
export declare class BondDeleteOperation implements Operation {
    bond: Bond;
    deleteBondChangeModel: (bond: Bond) => void;
    addBondChangeModel: (bond: Bond) => Bond;
    private bondInMoleculeStruct?;
    priority: number;
    constructor(bond: Bond, deleteBondChangeModel: (bond: Bond) => void, addBondChangeModel: (bond: Bond) => Bond);
    execute(): void;
    invert(): void;
    executeAfterAllOperations(renderersManager: RenderersManager): void;
    invertAfterAllOperations(renderersManager: RenderersManager): void;
}
