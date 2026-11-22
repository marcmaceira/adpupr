import type { EventBenefitsBlock } from "@/payload-types";
import { EventBenefits } from "@/components/sections/event-benefits";

export function EventBenefitsBlockComponent({ block }: { readonly block: EventBenefitsBlock }) {
  return <EventBenefits {...block} />;
}
