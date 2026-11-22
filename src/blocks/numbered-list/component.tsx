import type { NumberedListBlock } from "@/payload-types";
import { NumberedList } from "@/components/sections/numbered-list";

export function NumberedListBlockComponent({ block }: { readonly block: NumberedListBlock }) {
  return <NumberedList {...block} />;
}
