import type { ComponentType } from "react";
import { bandsComponents } from "./groups/bands.components";
import { conferenceComponents } from "./groups/conference.components";
import { contentComponents } from "./groups/content.components";
import { engageComponents } from "./groups/engage.components";
import { peopleComponents } from "./groups/people.components";
import type { BlockRegistry, LayoutBlock } from "./types";

const registry = {
  ...bandsComponents,
  ...contentComponents,
  ...conferenceComponents,
  ...engageComponents,
  ...peopleComponents,
} satisfies BlockRegistry;

/** Renders a page layout. Unknown block types render nothing. */
export function RenderBlocks({
  blocks,
}: {
  readonly blocks: readonly LayoutBlock[] | null | undefined;
}) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((block, index) => {
        const Component = registry[block.blockType] as
          | ComponentType<{ readonly block: LayoutBlock }>
          | undefined;
        if (!Component) return null;
        return <Component key={block.id ?? `${block.blockType}-${index}`} block={block} />;
      })}
    </>
  );
}
