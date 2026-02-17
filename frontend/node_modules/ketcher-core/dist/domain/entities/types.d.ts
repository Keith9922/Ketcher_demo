import { BaseMonomer } from "./BaseMonomer";
import { KetMonomerClass } from "../../application/formatters";
export interface IVariantMonomer {
    monomers: BaseMonomer[];
    monomerClass: KetMonomerClass;
}
