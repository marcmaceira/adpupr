import type { ReactNode } from "react";
import type { Page } from "@/payload-types";

/** One block in a page layout, as Payload returns it. */
export type LayoutBlock = NonNullable<Page["layout"]>[number];
export type BlockSlug = LayoutBlock["blockType"];
export type BlockOf<S extends BlockSlug> = Extract<LayoutBlock, { blockType: S }>;

export type BlockComponent<S extends BlockSlug> = (props: {
  readonly block: BlockOf<S>;
}) => ReactNode | Promise<ReactNode>;

/** A partial slug → renderer map. Each group file exports one. */
export type BlockComponents = { readonly [S in BlockSlug]?: BlockComponent<S> };

/** The full map: the compiler fails if any registered block lacks a renderer. */
export type BlockRegistry = { readonly [S in BlockSlug]: BlockComponent<S> };
