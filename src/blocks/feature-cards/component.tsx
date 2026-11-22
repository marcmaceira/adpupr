import type { FeatureCardsBlock } from "@/payload-types";
import { FeatureCards } from "@/components/sections/feature-cards";

export function FeatureCardsBlockComponent({ block }: { readonly block: FeatureCardsBlock }) {
  return <FeatureCards {...block} />;
}
