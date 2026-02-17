import { FlexModePolymerBondRenderer } from "./FlexModePolymerBondRenderer";
import { SnakeModePolymerBondRenderer } from "./SnakeModePolymerBondRenderer";
import { PolymerBond } from "../../../../domain/entities/PolymerBond";
import { HydrogenBond } from "../../../../domain/entities/HydrogenBond";
export declare enum LayoutMode {
    Flex = "Flex",
    Snake = "Snake"
}
declare type PolymerBondRendererClass = FlexModePolymerBondRenderer | SnakeModePolymerBondRenderer;
export declare class PolymerBondRendererFactory {
    static createInstance(polymerBond: PolymerBond | HydrogenBond): PolymerBondRendererClass;
    static createInstanceByMode(mode: LayoutMode, polymerBond: PolymerBond): PolymerBondRendererClass | never;
}
export {};
