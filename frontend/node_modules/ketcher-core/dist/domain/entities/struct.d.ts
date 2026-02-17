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
import { Atom } from './atom';
import { EditorSelection } from "../../application/editor";
import { Bond } from './bond';
import { Fragment } from './fragment';
import { FunctionalGroup } from './functionalGroup';
import { HalfBond } from './halfBond';
import { Loop } from './loop';
import { Pile } from './pile';
import { Pool } from './pool';
import { RGroup } from './rgroup';
import { RxnArrow } from './rxnArrow';
import { RxnPlus } from './rxnPlus';
import { SGroup } from './sgroup';
import { SGroupForest } from './sgroupForest';
import { SimpleObject } from './simpleObject';
import { Text } from './text';
import { Vec2 } from './vec2';
import { Highlight } from './highlight';
import { RGroupAttachmentPoint } from './rgroupAttachmentPoint';
import { Image } from './image';
import { MultitailArrow } from './multitailArrow';
export declare type Neighbor = {
    aid: number;
    bid: number;
};
export declare type StructProperty = {
    key: string;
    value: string;
};
export declare class Struct {
    atoms: Pool<Atom>;
    bonds: Pool<Bond>;
    sgroups: Pool<SGroup>;
    halfBonds: Pool<HalfBond>;
    loops: Pool<Loop>;
    isReaction: boolean;
    rxnArrows: Pool<RxnArrow>;
    rxnPluses: Pool<RxnPlus>;
    frags: Pool<Fragment | null>;
    rgroups: Pool<RGroup>;
    rgroupAttachmentPoints: Pool<RGroupAttachmentPoint>;
    name: string;
    abbreviation?: string;
    sGroupForest: SGroupForest;
    simpleObjects: Pool<SimpleObject>;
    texts: Pool<Text>;
    functionalGroups: Pool<FunctionalGroup>;
    highlights: Pool<Highlight>;
    images: Pool<Image>;
    multitailArrows: Pool<MultitailArrow>;
    constructor();
    hasRxnProps(): boolean;
    hasRxnArrow(): boolean;
    hasMultitailArrow(): boolean;
    hasRxnPluses(): boolean;
    isRxn(): boolean;
    isBlank(): boolean;
    isSingleGroup(): boolean;
    clone(atomSet?: Pile<number> | null, bondSet?: Pile<number> | null, dropRxnSymbols?: boolean, aidMap?: Map<number, number> | null, simpleObjectsSet?: Pile<number> | null, textsSet?: Pile<number> | null, rgroupAttachmentPointSet?: Pile<number> | null, imagesSet?: Pile<number> | null, multitailArrowsSet?: Pile<number> | null, bidMap?: Map<number, number> | null): Struct;
    getScaffold(): Struct;
    getFragmentIds(_fid: number | number[]): Pile<number>;
    getFragment(fid: number | number[], copyNonFragmentObjects?: boolean, aidMap?: Map<number, number>): Struct;
    mergeInto(cp: Struct, atomSet?: Pile<number> | null, bondSet?: Pile<number> | null, dropRxnSymbols?: boolean, keepAllRGroups?: boolean, aidMap?: Map<number, number> | null, simpleObjectsSet?: Pile<number> | null, textsSet?: Pile<number> | null, rgroupAttachmentPointSet?: Pile<number> | null, imagesSet?: Pile<number> | null, multitailArrowsSet?: Pile<number> | null, bidMapEntity?: Map<number, number> | null): Struct;
    prepareLoopStructure(): void;
    atomAddToSGroup(sgid: any, aid: any): void;
    calcConn(atom: any): any[];
    findBondId(begin: any, end: any): number | null;
    initNeighbors(): void;
    bondInitHalfBonds(bid: any, bond?: Bond): void;
    halfBondUpdate(halfBondId: number): void;
    initHalfBonds(): void;
    setHbNext(hbid: any, next: any): void;
    halfBondSetAngle(hbid: any, left: any): void;
    atomAddNeighbor(hbid: any): void;
    atomSortNeighbors(aid: any): void;
    sortNeighbors(list: any): void;
    atomUpdateHalfBonds(atomId: number): void;
    updateHalfBonds(list: any): void;
    sGroupsRecalcCrossBonds(): void;
    sGroupDelete(sgid: number): void;
    atomSetPos(id: number, pp: Vec2): void;
    rxnPlusSetPos(id: number, pp: Vec2): void;
    rxnArrowSetPos(id: number, pos: Array<Vec2>): void;
    simpleObjectSetPos(id: number, pos: Array<Vec2>): void;
    textSetPosition(id: number, position: Vec2): void;
    getCoordBoundingBox(atomSet?: Pile<number>): any;
    getCoordBoundingBoxObj(): any;
    getBondLengthData(): {
        cnt: number;
        totalLength: number;
    };
    getAvgBondLength(): number;
    getAvgClosestAtomDistance(): number;
    checkBondExists(begin: number, end: number): boolean;
    findConnectedComponent(firstaid: number): Pile<number>;
    findConnectedComponents(discardExistingFragments?: boolean): any[];
    markFragment(idSet: Pile<number>, properties: [StructProperty]): void;
    markFragments(properties?: any): void;
    scale(scale: number): void;
    rescale(): void;
    loopHasSelfIntersections(hbs: Array<number>): boolean;
    partitionLoop(loop: any): any[];
    halfBondAngle(hbid1: number, hbid2: number): number;
    loopIsConvex(loop: Array<any>): boolean;
    loopIsInner(loop: Array<any>): boolean;
    findLoops(): {
        newLoops: any[];
        bondsToMark: number[];
    };
    calcImplicitHydrogen(aid: number): void;
    setImplicitHydrogen(list?: Array<number>): void;
    setStereoLabelsToAtoms(): void;
    atomGetNeighbors(aid: number): Array<Neighbor> | undefined;
    getComponents(): {
        reactants: any[];
        products: any[];
    };
    defineRxnFragmentTypeForAtomset(atomset: Pile<number>, arrowpos: number): 1 | 2;
    getBondFragment(bid: number): number | undefined;
    bindSGroupsToFunctionalGroups(): void;
    getGroupIdFromAtomId(atomId: number): number | null;
    getGroupFromAtomId(atomId: number | undefined): SGroup | undefined;
    getGroupIdFromBondId(bondId: number): number | null;
    getGroupFromBondId(atomId: number): SGroup | undefined;
    getGroupsIdsFromBondId(bondId: number): number[];
    getBondIdByHalfBond(halfBondId: number): number | undefined;
    /**
     * @returns visibleAtoms = selected atoms
     *                       - atoms in contracted functional groups
     *                       + functional groups's attachment atoms
     */
    getSelectedVisibleAtoms(selection: EditorSelection | null): number[];
    getRGroupAttachmentPointsByAtomId(atomId: number): number[];
    isAtomFromMacromolecule(atomId: number): boolean;
    isBondFromMacromolecule(bondOrBondId: Bond | number): boolean;
    isFunctionalGroupFromMacromolecule(functionalGroupId: number): boolean;
    isTargetFromMacromolecule(target?: {
        id: number;
        map: string;
    } | null): boolean | null | undefined;
    disableInitiallySelected(): void;
    enableInitiallySelected(): void;
}
