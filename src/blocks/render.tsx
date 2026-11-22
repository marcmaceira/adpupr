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

type AnyBlockComponent = ComponentType<{ readonly block: LayoutBlock }>;

/**
 * The registry pairs each slug with the renderer for that slug's block type, but TypeScript
 * cannot correlate `registry[block.blockType]` with `block` across the union, so the lookup
 * is widened to `unknown` and narrowed here (an `as` cast is an unsafe narrowing once the
 * registry holds more than one block type).
 */
function isBlockComponent(value: unknown): value is AnyBlockComponent {
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
        const Component: unknown = registry[block.blockType];
        if (!isBlockComponent(Component)) return null;
        return <Component key={block.id ?? `${block.blockType}-${index}`} block={block} />;
      })}
    </>
  );
}
