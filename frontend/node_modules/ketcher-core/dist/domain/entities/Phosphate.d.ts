import { BaseMonomer } from './BaseMonomer';
import { AttachmentPointName, MonomerItemType } from "../types";
import { Vec2 } from './vec2';
import { PhosphateSubChain } from "./monomer-chains/PhosphateSubChain";
import { SubChainNode } from "./monomer-chains/types";
export declare class Phosphate extends BaseMonomer {
    constructor(monomerItem: MonomerItemType, _position?: Vec2);
    getValidSourcePoint(secondMonomer: BaseMonomer): AttachmentPointName | undefined;
    getValidTargetPoint(firstMonomer: BaseMonomer): AttachmentPointName | undefined;
    private getValidPoint;
    isMonomerTypeDifferentForChaining(monomerToChain: SubChainNode): boolean;
    get SubChainConstructor(): typeof PhosphateSubChain;
}
