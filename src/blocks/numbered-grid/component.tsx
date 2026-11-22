import type { NumberedGridBlock } from "@/payload-types";
import { NumberedGrid } from "@/components/sections/numbered-grid";

export function NumberedGridBlockComponent({ block }: { readonly block: NumberedGridBlock }) {
  return <NumberedGrid {...block} />;
}
