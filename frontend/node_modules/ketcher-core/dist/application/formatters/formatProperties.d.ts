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
import { ChemicalMimeType } from "../../domain/services";
import { SupportedFormat } from './structFormatter.types';
import { SupportedFormatProperties } from './supportedFormatProperties';
declare type FormatPropertiesMap = {
    [key in SupportedFormat]: SupportedFormatProperties;
};
declare const formatProperties: FormatPropertiesMap;
declare function getPropertiesByImgFormat(format: any): any;
declare function getPropertiesByFormat(format: SupportedFormat): SupportedFormatProperties;
declare function getFormatMimeTypeByFileName(fileName: string): ChemicalMimeType | undefined;
export { formatProperties, getPropertiesByFormat, getPropertiesByImgFormat, getFormatMimeTypeByFileName, };
