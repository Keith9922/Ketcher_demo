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
import { Struct } from "../../entities";
declare type Mapping = {
    [key in number]: number;
};
interface ParseCTFileProps {
    molfileLines: string[];
    shouldReactionRelayout?: boolean;
    ignoreChiralFlag?: boolean;
}
export declare class Molfile {
    molecule: Struct | null;
    molfile: string | null;
    reaction: boolean;
    mapping: Mapping;
    bondMapping: Mapping;
    constructor();
    parseCTFile(props: ParseCTFileProps): any;
    prepareSGroups(skipErrors: boolean, preserveIndigoDesc?: boolean): void;
    getCTab(molecule: Struct, rgroups?: Map<any, any>): string;
    saveMolecule(molecule: Struct, skipSGroupErrors: boolean, norgroups?: boolean, preserveIndigoDesc?: boolean): string;
    writeHeader(): void;
    write(str: string): void;
    writeCR(str?: string): void;
    writeWhiteSpace(length?: number): void;
    writePadded(str: string, width: number): void;
    writePaddedNumber(number: number, width: number): void;
    writePaddedFloat(number: string | number, width: number, precision: number): void;
    writeCTab2000Header(): void;
    writeCTab2000(rgroups?: Map<any, any>): void;
    private writeAtom;
    private writeBond;
    private writeAtomProps;
    private writeAtomPropList;
    private writeSGroupAttachmentPointLine;
}
export {};
