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
import { MonomerToAtomBond } from "../../../../domain/entities/MonomerToAtomBond";
export declare class MonomerToAtomBondAddOperation implements Operation {
    addMonomerToAtomBondChangeModel: (monomerToAtomBond?: MonomerToAtomBond) => MonomerToAtomBond;
    deleteMonomerToAtomBondChangeModel: (monomerToAtomBond: MonomerToAtomBond) => void;
    monomerToAtomBond: MonomerToAtomBond;
    constructor(addMonomerToAtomBondChangeModel: (monomerToAtomBond?: MonomerToAtomBond) => MonomerToAtomBond, deleteMonomerToAtomBondChangeModel: (monomerToAtomBond: MonomerToAtomBond) => void);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
export declare class MonomerToAtomBondDeleteOperation implements Operation {
    monomerToAtomBond: MonomerToAtomBond;
    deleteMonomerToAtomBondChangeModel: (monomerToAtomBond?: MonomerToAtomBond) => void;
    addMonomerToAtomBondChangeModel: (monomerToAtomBond?: MonomerToAtomBond) => MonomerToAtomBond;
    constructor(monomerToAtomBond: MonomerToAtomBond, deleteMonomerToAtomBondChangeModel: (monomerToAtomBond?: MonomerToAtomBond) => void, addMonomerToAtomBondChangeModel: (monomerToAtomBond?: MonomerToAtomBond) => MonomerToAtomBond);
    execute(renderersManager: RenderersManager): void;
    invert(renderersManager: RenderersManager): void;
}
