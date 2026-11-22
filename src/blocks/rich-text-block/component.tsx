import type { RichTextBlock } from "@/payload-types";
import { RichTextSection } from "@/components/sections/rich-text-block";

export function RichTextBlockComponent({ block }: { readonly block: RichTextBlock }) {
  return <RichTextSection {...block} />;
}
