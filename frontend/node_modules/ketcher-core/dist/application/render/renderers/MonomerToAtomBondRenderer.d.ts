import { BaseRenderer } from "./BaseRenderer";
import { D3SvgElementSelection } from "../types";
import { MonomerToAtomBond } from "../../../domain/entities/MonomerToAtomBond";
export declare class MonomerToAtomBondRenderer extends BaseRenderer {
    monomerToAtomBond: MonomerToAtomBond;
    private selectionElement;
    constructor(monomerToAtomBond: MonomerToAtomBond);
    private get scaledPosition();
    show(): void;
    protected appendHover(): D3SvgElementSelection<SVGUseElement, void> | void;
    protected appendHoverAreaElement(): void;
    drawSelection(): void;
    appendSelection(): void;
    removeSelection(): void;
    move(): void;
    protected removeHover(): void;
    moveSelection(): void;
}
