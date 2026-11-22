import type { TextSplitBlock } from "@/payload-types";
import { TextSplit } from "@/components/sections/text-split";

export function TextSplitBlockComponent({ block }: { readonly block: TextSplitBlock }) {
  return <TextSplit {...block} />;
}
