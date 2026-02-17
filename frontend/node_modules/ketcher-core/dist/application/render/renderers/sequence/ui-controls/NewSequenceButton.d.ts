import { D3SvgElementSelection } from "../../../types";
export declare class NewSequenceButton {
    private indexOfRowBefore;
    private buttonElement?;
    private canvas;
    private rootElement?;
    private bodyElement?;
    constructor(indexOfRowBefore: number);
    show(): void;
    static appendPlusIcon(element: D3SvgElementSelection<SVGElement, void>): void;
    protected appendHover(): D3SvgElementSelection<SVGUseElement, void> | void;
    protected appendHoverAreaElement(): void;
    drawSelection(): void;
    moveSelection(): void;
    protected removeHover(): void;
    remove(): void;
}
