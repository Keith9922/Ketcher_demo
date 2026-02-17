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
import { Box2Abs, Pile, Pool, Struct, Vec2 } from "../../../domain/entities";
import { LayerMap } from './generalEnumTypes';
import ReAtom from './reatom';
import ReBond from './rebond';
import ReDataSGroupData from './redatasgroupdata';
import ReEnhancedFlag from './reenhancedFlag';
import ReFrag from './refrag';
import ReLoop from './reloop';
import ReRGroup from './rergroup';
import ReRxnArrow from './rerxnarrow';
import ReRxnPlus from './rerxnplus';
import ReSGroup from './resgroup';
import ReSimpleObject from './resimpleObject';
import ReText from './retext';
import { Render } from '../raphaelRender';
import Visel from './visel';
import { ReRGroupAttachmentPoint } from './rergroupAttachmentPoint';
import { ReImage } from "./reImage";
import { ReMultitailArrow } from './remultitailArrow';
declare class ReStruct {
    static readonly maps: {
        readonly atoms: typeof ReAtom;
        readonly bonds: typeof ReBond;
        readonly rxnPluses: typeof ReRxnPlus;
        readonly rxnArrows: typeof ReRxnArrow;
        readonly frags: typeof ReFrag;
        readonly rgroups: typeof ReRGroup;
        readonly rgroupAttachmentPoints: typeof ReRGroupAttachmentPoint;
        readonly sgroupData: typeof ReDataSGroupData;
        readonly enhancedFlags: typeof ReEnhancedFlag;
        readonly sgroups: typeof ReSGroup;
        readonly reloops: typeof ReLoop;
        readonly simpleObjects: typeof ReSimpleObject;
        readonly texts: typeof ReText;
        readonly images: typeof ReImage;
        readonly multitailArrows: typeof ReMultitailArrow;
    };
    render: Render;
    molecule: Struct;
    atoms: Map<number, ReAtom>;
    bonds: Map<number, ReBond>;
    reloops: Map<number, ReLoop>;
    rxnPluses: Map<number, ReRxnPlus>;
    rxnArrows: Map<number, ReRxnArrow>;
    frags: Pool;
    rgroups: Pool;
    rgroupAttachmentPoints: Pool<ReRGroupAttachmentPoint>;
    sgroups: Map<number, ReSGroup>;
    sgroupData: Map<number, ReDataSGroupData>;
    enhancedFlags: Map<number, ReEnhancedFlag>;
    simpleObjects: Map<number, ReSimpleObject>;
    texts: Map<number, ReText>;
    images: Map<number, ReImage>;
    multitailArrows: Map<number, ReMultitailArrow>;
    private initialized;
    private layers;
    connectedComponents: Pool;
    private ccFragmentType;
    private structChanged;
    private atomsChanged;
    private simpleObjectsChanged;
    private rxnArrowsChanged;
    private rxnPlusesChanged;
    private enhancedFlagsChanged;
    private bondsChanged;
    private textsChanged;
    private imagesChanged;
    private multitailArrowsChanged;
    private snappingBonds;
    constructor(molecule: any, render: Render | {
        skipRaphaelInitialization: boolean;
        theme: any;
    });
    get visibleRGroupAttachmentPoints(): Pool<ReRGroupAttachmentPoint>;
    connectedComponentRemoveAtom(aid: number, reAtom?: ReAtom): void;
    clearConnectedComponents(): void;
    getConnectedComponent(aid: Array<number> | number, adjacentComponents: Pile): Pile;
    addConnectedComponent(idSet: Pile<number>): number;
    removeConnectedComponent(ccid: number): boolean;
    assignConnectedComponents(): void;
    initLayers(): void;
    addReObjectPath(group: LayerMap, visel: Visel, path: any, pos?: Vec2 | null, visible?: boolean): void;
    clearMarks(): void;
    markItemRemoved(): void;
    markBond(bid: number, mark: number): void;
    markAtom(aid: number, mark: number): void;
    markRgroupAttachmentPoint(rgAPid: number, mark: number): void;
    markItem(map: string, id: number, mark: number): void;
    clearVisel(visel: Visel): void;
    eachItem(func: any): void;
    /**
     * Why?
     * we can't use just getVBoxObj and the center for atoms
     * because this will lead incorrect center position for the move atom around it
     * because of atom's vBox contain text label with is not constant after flip/rotate
     * and this lead to unstable flip tool work
     */
    getSelectionBoxCenter(selection: SelectionMap): Vec2 | undefined;
    getVBoxObj(selection?: SelectionMap): Box2Abs;
    private getAllElementsAsSelectionMap;
    private getBoundingBoxForSelection;
    translate(d: any): void;
    scale(s: number): void;
    clearVisels(): void;
    update(force: boolean): boolean;
    updateLoops(): void;
    showLoops(): void;
    showSimpleObjects(): void;
    showTexts(): void;
    showReactionSymbols(): void;
    showSGroups(): void;
    showFragments(): void;
    showRGroups(): void;
    loopRemove(loopId: number): void;
    verifyLoops(): void;
    getRGroupAttachmentPointsVBoxByAtomIds(atomsIds: number[]): Box2Abs | null;
    private showRgroupAttachmentPoints;
    private showAtoms;
    showEnhancedFlags(): void;
    showBonds(): void;
    showImages(): void;
    showMultitailArrows(): void;
    setSelection(selection?: any): void;
    showItemSelection(item: any, selected: any): void;
    addSnappingBonds(bondId: number): void;
    clearSnappingBonds(): void;
    isSnappingBond(bondId: number): boolean;
}
declare type SelectionMap = Partial<Record<keyof typeof ReStruct.maps, number[] | undefined>>;
export default ReStruct;
