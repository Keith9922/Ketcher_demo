export default Dfs;
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
declare function Dfs(mol: any, atomData: any, components: any, nReactants: any): void;
declare class Dfs {
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
    constructor(mol: any, atomData: any, components: any, nReactants: any);
    molecule: any;
    atom_data: any;
    components: any;
    nComponentsInReactants: number;
    nReactants: any;
    vertices: any[];
    edges: any[];
    v_seq: any[];
    walk(): void;
    edgeClosingCycle(eIdx: any): boolean;
    numBranches(vIdx: any): any;
    numOpeningCycles(eIdx: any): any;
    toString(): string;
}
declare namespace Dfs {
    function VertexDesc(): void;
    function EdgeDesc(): void;
    function SeqElem(vIdx: any, parVertex: any, parEdge: any): void;
}
