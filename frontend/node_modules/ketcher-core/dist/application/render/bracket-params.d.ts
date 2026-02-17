import { Vec2 } from "../../domain/entities";
export default class BracketParams {
    center: Vec2;
    bracketAngleDirection: Vec2;
    bracketDirection: Vec2;
    width: number;
    height: number;
    constructor(center: Vec2, bracketAngleDirection: Vec2, width: number, height: number, bracketDirection?: Vec2);
}
