import { BaseRenderer } from "../internal";
import { D3SvgElementSelection } from "../../types";
import { Vec2 } from "../../../../domain/entities/vec2";
export declare class BaseSequenceRenderer extends BaseRenderer {
    protected appendHover(_hoverArea: any): D3SvgElementSelection<SVGUseElement, void> | void;
    protected appendHoverAreaElement(): void;
    drawSelection(): void;
    moveSelection(): void;
    protected removeHover(): void;
    show(_theme?: any): void;
    get center(): Vec2;
}
