import { bandsComponents } from "./groups/bands.components";
import { conferenceComponents } from "./groups/conference.components";
import { contentComponents } from "./groups/content.components";
import { engageComponents } from "./groups/engage.components";
import { peopleComponents } from "./groups/people.components";
import type { BlockComponent, BlockOf, BlockRegistry, BlockSlug, LayoutBlock } from "./types";

const registry: BlockRegistry = {
  ...bandsComponents,
  ...contentComponents,
  ...conferenceComponents,
  ...engageComponents,
  ...peopleComponents,
};

/**
 * Renders one block with its registered adapter. Generic over the slug so the lookup and
 * the props stay correlated (`registry[S]` takes a `BlockOf<S>`) without a type assertion.
 * Adapters are server components without hooks (sync or async), so calling one directly
 * is equivalent to rendering it; RSC awaits a returned promise.
 */
function Block<S extends BlockSlug>({ block }: { readonly block: BlockOf<S> & { blockType: S } }) {
  const render: BlockComponent<S> = registry[block.blockType];
  return render({ block });
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
      {blocks.map((block, index) =>
        block.blockType in registry ? (
          <Block key={block.id ?? `${block.blockType}-${index}`} block={block} />
        ) : null,
      )}
    </>
  );
}
