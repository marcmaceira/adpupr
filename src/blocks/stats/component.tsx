import type { StatsBlock } from "@/payload-types";
import { Stats } from "@/components/sections/stats";

export function StatsBlockComponent({ block }: { readonly block: StatsBlock }) {
  return <Stats {...block} />;
}
