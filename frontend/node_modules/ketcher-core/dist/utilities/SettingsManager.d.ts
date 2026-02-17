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
export declare const KETCHER_SAVED_SETTINGS_KEY = "ketcher_editor_saved_settings";
export declare const KETCHER_SAVED_OPTIONS_KEY = "ketcher-opts";
interface SavedSettings {
    selectionTool?: any;
    disableCustomQuery?: boolean;
}
interface SavedOptions {
    ignoreChiralFlag?: boolean;
    disableQueryElements?: string[] | null;
}
export declare class SettingsManager {
    static _disableCustomQuery?: boolean;
    static getSettings(): SavedSettings;
    static saveSettings(settings: SavedSettings): void;
    static getOptions(): SavedOptions;
    static saveOptions(options: SavedOptions): void;
    static get selectionTool(): any;
    static set selectionTool(selectionTool: any);
    static get disableCustomQuery(): boolean | undefined;
    static set disableCustomQuery(disableCustomQuery: boolean | undefined);
    static get ignoreChiralFlag(): boolean | undefined;
    static set ignoreChiralFlag(ignoreChiralFlag: boolean | undefined);
}
export {};
