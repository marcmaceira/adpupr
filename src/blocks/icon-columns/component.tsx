import type { IconColumnsBlock } from "@/payload-types";
import { IconColumns } from "@/components/sections/icon-columns";

export function IconColumnsBlockComponent({ block }: { readonly block: IconColumnsBlock }) {
  return <IconColumns {...block} />;
}
