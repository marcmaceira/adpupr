import type { Block } from "payload";
import { CommitteesBlock } from "../committees/config";
import { PeopleGridBlock } from "../people-grid/config";

/** Block configs owned by the "people" group. Register new blocks here only. */
export const peopleBlocks: Block[] = [PeopleGridBlock, CommitteesBlock];
