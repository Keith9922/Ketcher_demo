import { CoreEditor } from "../../application/editor/internal";
import { SequenceType } from "../entities";
import { RNA_DNA_NON_MODIFIED_PART } from "../constants/monomers";
import { KetMonomerClass } from "../../application/formatters";
export declare function getRnaPartLibraryItem(editor: CoreEditor, rnaBaseName: string, monomerClass?: KetMonomerClass): import("../types").MonomerItemType | undefined;
export declare function getPeptideLibraryItem(editor: CoreEditor, peptideName: string): import("../types").MonomerItemType | undefined;
export declare function getSugarBySequenceType(sequenceType: SequenceType): RNA_DNA_NON_MODIFIED_PART.SUGAR_RNA | RNA_DNA_NON_MODIFIED_PART.SUGAR_DNA | undefined;
