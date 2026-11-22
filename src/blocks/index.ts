import type { Block } from "payload";
import { bandsBlocks } from "./groups/bands";
import { conferenceBlocks } from "./groups/conference";
import { contentBlocks } from "./groups/content";
import { engageBlocks } from "./groups/engage";
import { peopleBlocks } from "./groups/people";

/** Every block available in a page layout, in the order editors see them. */
export const blocks: Block[] = [
  ...bandsBlocks,
  ...contentBlocks,
  ...conferenceBlocks,
  ...engageBlocks,
  ...peopleBlocks,
];
