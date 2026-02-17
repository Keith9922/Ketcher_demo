import { BaseMonomer } from './BaseMonomer';
import { SubChainNode } from "./monomer-chains/types";
import { Vec2 } from "./vec2";
import { KetMonomerClass } from "../../application/formatters";
import { IVariantMonomer } from "./types";
import { AmbiguousMonomerType, AttachmentPointName } from "../types";
export declare const DEFAULT_VARIANT_MONOMER_LABEL = "%";
export declare class AmbiguousMonomer extends BaseMonomer implements IVariantMonomer {
    variantMonomerItem: AmbiguousMonomerType;
    monomers: BaseMonomer[];
    monomerClass: KetMonomerClass;
    constructor(variantMonomerItem: AmbiguousMonomerType, position?: Vec2, generateId?: boolean);
    static getMonomerClass(monomers: BaseMonomer[]): KetMonomerClass;
    private static getAttachmentPoints;
    get monomerCaps(): Partial<Record<AttachmentPointName, string>> | undefined;
    getValidSourcePoint(_secondMonomer?: BaseMonomer): any;
    getValidTargetPoint(_firstMonomer: BaseMonomer): any;
    get SubChainConstructor(): any;
    isMonomerTypeDifferentForChaining(monomerToChain: SubChainNode): any;
}
