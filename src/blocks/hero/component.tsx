import type { HeroBlock } from "@/payload-types";
import { Hero } from "@/components/sections/hero";

export function HeroBlockComponent({ block }: { readonly block: HeroBlock }) {
  return <Hero {...block} />;
}
