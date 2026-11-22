import { bandsComponents } from "./groups/bands.components";
import { conferenceComponents } from "./groups/conference.components";
import { contentComponents } from "./groups/content.components";
import { engageComponents } from "./groups/engage.components";
import { peopleComponents } from "./groups/people.components";
import type { BlockComponent, BlockRegistry, BlockSlug, LayoutBlock } from "./types";

const registry: BlockRegistry = {
  ...bandsComponents,
  ...contentComponents,
  ...conferenceComponents,
  ...engageComponents,
  ...peopleComponents,
} satisfies BlockRegistry;

/**
 * The renderer for a slug. Indexing the mapped registry with a generic key keeps the
 * slug and its block type correlated, so no type assertion is needed (sync and async
 * renderers alike).
 */
function rendererFor<S extends BlockSlug>(slug: S): BlockComponent<S> | undefined {
  return registry[slug];
}

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
        const Component = rendererFor(block.blockType);
        if (!Component) return null;
        return <Component key={block.id ?? `${block.blockType}-${index}`} block={block} />;
      })}
    </>
  );
}
