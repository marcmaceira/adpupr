import { FeatureCardsBlockComponent } from "../feature-cards/component";
import { IconColumnsBlockComponent } from "../icon-columns/component";
import { NumberedListBlockComponent } from "../numbered-list/component";
import { RichTextBlockComponent } from "../rich-text-block/component";
import { TextSplitBlockComponent } from "../text-split/component";
import { VideoFeatureBlockComponent } from "../video-feature/component";
import type { BlockComponents } from "../types";

/** Renderers owned by the "content" group, keyed by block slug. */
export const contentComponents = {
  textSplit: TextSplitBlockComponent,
  featureCards: FeatureCardsBlockComponent,
  numberedList: NumberedListBlockComponent,
  iconColumns: IconColumnsBlockComponent,
  videoFeature: VideoFeatureBlockComponent,
  richTextBlock: RichTextBlockComponent,
} satisfies BlockComponents;
