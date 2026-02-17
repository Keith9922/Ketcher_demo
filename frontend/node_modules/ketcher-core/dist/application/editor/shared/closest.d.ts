declare namespace _default {
    export { findClosestAtom as atom };
    export { findClosestItem as item };
    export { findCloseMerge as merge };
}
export default _default;
declare function findClosestAtom(restruct: any, pos: any, skip: any, minDist: any): {
    id: never;
    dist: any;
} | null;
declare function findClosestItem(restruct: any, pos: any, maps: any, skip: any, scale: any): any;
/**
 * @param restruct { ReStruct }
 * @param selected { object }
 * @param maps { Array<string> }
 * @param scale { number }
 * @return {{
 * 		atoms: Map<number, number>?
 * 		bonds: Map<number, number>?
 * }}
 */
declare function findCloseMerge(restruct: ReStruct, selected: object, maps: string[] | undefined, scale: number): {
    atoms: Map<number, number>;
    bonds: Map<number, number> | null;
};
