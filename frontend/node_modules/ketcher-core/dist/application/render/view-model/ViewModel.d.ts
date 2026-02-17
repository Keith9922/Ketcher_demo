import { HalfEdge } from "./HalfEdge";
import { Bond } from "../../../domain/entities/CoreBond";
import { Atom } from "../../../domain/entities/CoreAtom";
import { Loop } from "./Loop";
export declare class ViewModel {
    halfEdges: Map<number, HalfEdge>;
    atomsToHalfEdges: Map<Atom, HalfEdge[]>;
    bondsToHalfEdges: Map<Bond, HalfEdge[]>;
    loops: Map<number, Loop>;
    private setHalfBondProperties;
    private setAtomsToHalfEdgesMap;
    private setBondsToHalfEdgesMap;
    private initHalfEdge;
    private initHalfEdges;
    private setHalfEdgesAngle;
    private sortAtomsHalfEdges;
    private partitionLoop;
    private getAngleBetweenHalfEdges;
    private loopIsInner;
    private loopHasSelfIntersections;
    private loopIsConvex;
    private findLoops;
    private clearState;
    initialize(bonds: Bond[]): void;
}
