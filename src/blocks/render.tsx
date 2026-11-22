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
 * The registry pairs each slug with its own renderer, which TypeScript cannot express for
 * a lookup by a runtime slug (and a cast is rejected once there is more than one block
 * type). Lookup goes through `unknown` plus this guard instead.
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
        const Component: unknown = Reflect.get(registry, block.blockType);
        if (!isBlockComponent(Component)) return null;
        return <Component key={block.id ?? `${block.blockType}-${index}`} block={block} />;
      })}
    </>
  );
}
