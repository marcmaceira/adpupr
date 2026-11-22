import type { Block } from "payload";
import { FeatureCardsBlock } from "../feature-cards/config";
import { IconColumnsBlock } from "../icon-columns/config";
import { NumberedListBlock } from "../numbered-list/config";
import { RichTextBlockBlock } from "../rich-text-block/config";
import { TextSplitBlock } from "../text-split/config";
import { VideoFeatureBlock } from "../video-feature/config";

/** Block configs owned by the "content" group. Register new blocks here only. */
export const contentBlocks: Block[] = [
  TextSplitBlock,
  FeatureCardsBlock,
  NumberedListBlock,
  IconColumnsBlock,
  VideoFeatureBlock,
  RichTextBlockBlock,
];
