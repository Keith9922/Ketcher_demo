import { IKetMacromoleculesContent, IKetMonomerNode, IKetMonomerTemplate, IKetAmbiguousMonomerNode, IKetAmbiguousMonomerTemplate } from "../../../../application/formatters/types/ket";
import { Struct } from "../../../entities";
import { DrawingEntitiesManager } from "../../../entities/DrawingEntitiesManager";
export declare function templateToMonomerProps(template: IKetMonomerTemplate): {
    id: string;
    Name: string;
    MonomerNaturalAnalogCode: string;
    MonomerName: string;
    MonomerFullName: string | undefined;
    MonomerType: string | undefined;
    MonomerClass: import("../../../../application/formatters/types/ket").KetMonomerClass | undefined;
    MonomerCaps: {};
    idtAliases: import("../../../../application/formatters/types/ket").IKetIdtAliases | undefined;
    unresolved: boolean | undefined;
};
export declare function monomerToDrawingEntity(node: IKetMonomerNode, template: IKetMonomerTemplate, struct: Struct, drawingEntitiesManager: DrawingEntitiesManager): import("../../../entities/Command").Command;
export declare function createMonomersForVariantMonomer(variantMonomerTemplate: IKetAmbiguousMonomerTemplate, parsedFileContent: IKetMacromoleculesContent): (import("../../../entities").Chem | import("../../../entities").Sugar | import("../../../entities").Peptide | import("../../../entities").RNABase | import("../../../entities").Phosphate)[];
export declare function variantMonomerToDrawingEntity(drawingEntitiesManager: DrawingEntitiesManager, node: IKetAmbiguousMonomerNode, template: IKetAmbiguousMonomerTemplate, parsedFileContent: IKetMacromoleculesContent): import("../../../entities/Command").Command;
