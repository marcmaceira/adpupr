import type { Block } from "payload";
import { CtaBandBlock } from "../cta-band/config";
import { HeroBlock } from "../hero/config";
import { StatsBlock } from "../stats/config";

/** Block configs owned by the "bands" group. Register new blocks here only. */
export const bandsBlocks: Block[] = [HeroBlock, CtaBandBlock, StatsBlock];
