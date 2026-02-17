import { ReStruct } from "../../../render";
import { Vec2 } from "../../../../domain/entities";
import Base from '../base';
interface RxnArrowRotateData {
    id: number;
    angle: number;
    center: Vec2;
    noinvalidate?: boolean;
}
export declare class RxnArrowRotate extends Base {
    data: RxnArrowRotateData;
    constructor(id: number, angle: number, center: Vec2, noinvalidate?: boolean);
    execute(reStruct: ReStruct): void;
    invert(): RxnArrowRotate;
}
export {};
