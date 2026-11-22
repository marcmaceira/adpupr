import type { CtaBandBlock } from "@/payload-types";
import { CtaBand } from "@/components/sections/cta-band";

export function CtaBandBlockComponent({ block }: { readonly block: CtaBandBlock }) {
  return <CtaBand {...block} />;
}
