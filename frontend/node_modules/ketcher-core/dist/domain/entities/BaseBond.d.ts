import { DrawingEntity } from './DrawingEntity';
import { Vec2 } from "./vec2";
export declare abstract class BaseBond extends DrawingEntity {
    endPosition: Vec2;
    abstract get firstEndEntity(): DrawingEntity;
    abstract get secondEndEntity(): DrawingEntity | undefined;
    get finished(): boolean;
    get center(): Vec2;
    moveToLinkedEntities(): void;
    moveBondStartAbsolute(x: any, y: any): void;
    moveBondEndAbsolute(x: any, y: any): void;
    get startPosition(): Vec2;
    getAnotherEntity(monomer: DrawingEntity): DrawingEntity | undefined;
}
