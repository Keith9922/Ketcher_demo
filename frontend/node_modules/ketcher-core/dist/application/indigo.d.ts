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
import { AutomapMode, CalculateProps, CalculateResult, CheckResult, CheckTypes, ChemicalMimeType, ConvertResult, InfoResult, OutputFormatType } from "../domain/services";
import { StructOrString } from "./indigo.types";
import { Struct } from "../domain/entities";
declare type ConvertOptions = {
    outputFormat?: ChemicalMimeType;
    inputFormat?: ChemicalMimeType;
};
declare type AutomapOptions = {
    mode?: AutomapMode;
};
declare type CheckOptions = {
    types?: Array<CheckTypes>;
};
declare type CalculateOptions = {
    properties?: Array<CalculateProps>;
};
declare type RecognizeOptions = {
    version?: string;
};
declare type GenerateImageOptions = {
    outputFormat?: OutputFormatType;
    backgroundColor?: string;
    bondThickness?: number;
};
export declare class Indigo {
    #private;
    constructor(structService: any);
    info(): Promise<InfoResult>;
    convert(struct: StructOrString, options?: ConvertOptions): Promise<ConvertResult>;
    layout(struct: StructOrString, options: any): Promise<Struct>;
    clean(struct: StructOrString): Promise<Struct>;
    aromatize(struct: StructOrString): Promise<Struct>;
    dearomatize(struct: StructOrString): Promise<Struct>;
    calculateCip(struct: StructOrString): Promise<Struct>;
    automap(struct: StructOrString, options?: AutomapOptions): Promise<Struct>;
    check(struct: StructOrString, options?: CheckOptions): Promise<CheckResult>;
    calculate(struct: StructOrString, options?: CalculateOptions): Promise<CalculateResult>;
    recognize(image: Blob, options?: RecognizeOptions): Promise<Struct>;
    generateImageAsBase64(struct: StructOrString, options?: GenerateImageOptions): Promise<string>;
    toggleExplicitHydrogens(struct: StructOrString): Promise<Struct>;
}
export {};
