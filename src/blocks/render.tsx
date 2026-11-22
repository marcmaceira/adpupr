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

type Renderer = ComponentType<{ readonly block: LayoutBlock }>;

/**
 * The registry is keyed by slug, so the renderer found for `block.blockType` accepts that
 * block. TypeScript cannot correlate the two through an index, hence this guard.
 */
function isRenderer(value: unknown): value is Renderer {
  return typeof value === "function";
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
        const Component: unknown = Reflect.get(registry, block.blockType);
        if (!isRenderer(Component)) return null;
        return <Component key={block.id ?? `${block.blockType}-${index}`} block={block} />;
      })}
    </>
  );
}
