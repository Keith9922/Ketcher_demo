import { Nucleoside } from "../Nucleoside";
import { Nucleotide } from "../Nucleotide";
import { MonomerSequenceNode } from "../MonomerSequenceNode";
import { EmptySequenceNode } from "../EmptySequenceNode";
import { LinkerSequenceNode } from "./..";
export declare type SubChainNode = MonomerSequenceNode | Nucleoside | Nucleotide | EmptySequenceNode | LinkerSequenceNode;
export declare enum SequenceType {
    RNA = "RNA",
    DNA = "DNA",
    PEPTIDE = "PEPTIDE"
}
export declare enum IsChainCycled {
    NOT_CYCLED = 0,
    CYCLED = 1
}
