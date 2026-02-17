import { Struct } from "../domain/entities";
import { DrawingEntitiesManager } from "../domain/entities/DrawingEntitiesManager";
import { FormatterFactory, SupportedFormat } from './formatters';
import { Ketcher } from './ketcher';
import { StructService } from "../domain/services";
import { EditorSelection } from './editor/editor.types';
declare class KetcherProvider {
    private ketcherInstance;
    setKetcherInstance(ketcherInstance: Ketcher): void;
    getKetcher(): Ketcher;
}
declare const ketcherProvider: KetcherProvider;
export { ketcherProvider };
export declare function getStructure(structureFormat: SupportedFormat | undefined, formatterFactory: FormatterFactory, struct: Struct, drawingEntitiesManager?: DrawingEntitiesManager, selection?: EditorSelection): Promise<string>;
export declare function prepareStructToRender(structStr: string, structService: StructService, ketcherInstance: Ketcher): Promise<Struct>;
export declare function parseStruct(structStr: string, structService: StructService, ketcherInstance: Ketcher): Promise<Struct>;
export declare function deleteAllEntitiesOnCanvas(): void;
export declare function parseAndAddMacromoleculesOnCanvas(struct: string, structService: StructService): Promise<void>;
