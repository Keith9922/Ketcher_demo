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
import { Pile } from './pile';
import { Struct } from './struct';
import { Vec2 } from './vec2';
import { BaseMicromoleculeEntity, initiallySelectedType } from "./BaseMicromoleculeEntity";
import { SGroup } from "./sgroup";
declare enum CIP {
    E = "E",
    Z = "Z",
    M = "M",
    P = "P"
}
export interface BondAttributes {
    reactingCenterStatus?: number | null;
    topology?: number | null;
    customQuery?: string | null;
    stereo?: number;
    xxx?: string;
    type: number;
    end: number;
    begin: number;
    cip?: CIP | null;
    isPreview?: boolean;
    initiallySelected?: initiallySelectedType;
    beginSuperatomAttachmentPointNumber?: number;
    endSuperatomAttachmentPointNumber?: number;
    beginSgroup?: SGroup;
    endSgroup?: SGroup;
}
export declare class Bond extends BaseMicromoleculeEntity {
    static PATTERN: {
        TYPE: {
            SINGLE: number;
            DOUBLE: number;
            TRIPLE: number;
            AROMATIC: number;
            SINGLE_OR_DOUBLE: number;
            SINGLE_OR_AROMATIC: number;
            DOUBLE_OR_AROMATIC: number;
            ANY: number;
            DATIVE: number;
            HYDROGEN: number;
        };
        STEREO: {
            NONE: number;
            UP: number;
            EITHER: number;
            DOWN: number;
            CIS_TRANS: number;
        };
        TOPOLOGY: {
            EITHER: number;
            RING: number;
            CHAIN: number;
        };
        REACTING_CENTER: {
            NOT_CENTER: number;
            UNMARKED: number;
            CENTER: number;
            UNCHANGED: number;
            MADE_OR_BROKEN: number;
            ORDER_CHANGED: number;
            MADE_OR_BROKEN_AND_CHANGED: number;
        };
    };
    static attrlist: {
        type: number;
        stereo: number;
        topology: number;
        reactingCenterStatus: number;
        cip: null;
        customQuery: null;
    };
    begin: number;
    end: number;
    readonly type: number;
    readonly xxx: string;
    stereo: number;
    readonly topology: number | null;
    readonly reactingCenterStatus: number | null;
    customQuery: string | null;
    len: number;
    sb: number;
    sa: number;
    cip?: CIP | null;
    hb1?: number;
    hb2?: number;
    angle: number;
    center: Vec2;
    isPreview: boolean;
    beginSuperatomAttachmentPointNumber?: number;
    endSuperatomAttachmentPointNumber?: number;
    beginSgroup?: SGroup;
    endSgroup?: SGroup;
    constructor(attributes: BondAttributes);
    static getAttrHash(bond: Bond): {};
    static getBondNeighbourIds(struct: Struct, bondId: number): {
        beginBondIds: number[];
        endBondIds: number[];
    };
    static getFusingConditions(bond: Bond, bondBegin: Bond, bondEnd: Bond): {
        isFusingToSingleBond: boolean;
        isFusingToDoubleBond: boolean;
        isFusingDoubleSingleSingle: boolean;
        isFusingSingleSingleDouble: boolean;
        isAllSingle: boolean;
    };
    static getBenzeneConnectingBondType(bond: Bond, bondBegin: Bond, bondEnd: Bond): number | null;
    static getCyclopentadieneFusingBondType(bond: Bond, bondBegin: Bond, bondEnd: Bond): number | null;
    static getCyclopentadieneDoubleBondIndexes(bond: Bond, bondBegin: Bond, bondEnd: Bond): number[];
    static attrGetDefault(attr: string): any;
    isQuery(): boolean;
    hasRxnProps(): boolean;
    getCenter(struct: any): Vec2;
    getDir(struct: any): Vec2;
    clone(aidMap?: Map<number, number> | null): Bond;
    getAttachedSGroups(struct: Struct): Pile<number>;
    isExternalBondBetweenMonomers(struct: Struct): boolean;
    static isBondToHiddenLeavingGroup(struct: Struct, bond: Bond): boolean | 0 | null | undefined;
    static isBondToExpandedMonomer(struct: Struct, bond: Bond): boolean;
}
export {};
