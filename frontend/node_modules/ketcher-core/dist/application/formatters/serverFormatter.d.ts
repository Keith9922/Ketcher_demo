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
import { ConvertData, ConvertResult, LayoutData, LayoutResult, StructService, StructServiceOptions } from "../../domain/services";
import { StructFormatter, SupportedFormat } from './structFormatter.types';
import { KetSerializer } from "../../domain/serializers";
import { Struct } from "../../domain/entities";
import { DrawingEntitiesManager } from "../../domain/entities/DrawingEntitiesManager";
declare type ConvertPromise = (data: ConvertData, options?: StructServiceOptions) => Promise<ConvertResult>;
declare type LayoutPromise = (data: LayoutData, options?: StructServiceOptions) => Promise<LayoutResult>;
export declare class ServerFormatter implements StructFormatter {
    #private;
    constructor(structService: StructService, ketSerializer: KetSerializer, format: SupportedFormat, options?: StructServiceOptions);
    getStructureFromStructAsync(struct: Struct, drawingEntitiesManager?: DrawingEntitiesManager): Promise<string>;
    getCallingMethod(stringifiedStruct: string, format: SupportedFormat): {
        method: LayoutPromise | ConvertPromise;
        struct: string;
    };
    getStructureFromStringAsync(stringifiedStruct: string): Promise<Struct>;
}
export {};
