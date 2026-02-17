import { IKetConnection } from "../../../../application/formatters/types/ket";
import { Command } from "../../../entities/Command";
import { DrawingEntitiesManager } from "../../../entities/DrawingEntitiesManager";
import { BaseMonomer } from "../../../entities";
export declare function polymerBondToDrawingEntity(connection: IKetConnection, drawingEntitiesManager: DrawingEntitiesManager, atomIdMap: Map<number, number>, superatomMonomerToUsedAttachmentPoint: Map<BaseMonomer, Set<string>>, firstMonomer: BaseMonomer, secondMonomer: BaseMonomer): Command;
