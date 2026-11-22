import type { EventOverviewBlock } from "@/payload-types";
import { EventOverview } from "@/components/sections/event-overview";

export function EventOverviewBlockComponent({ block }: { readonly block: EventOverviewBlock }) {
  return <EventOverview {...block} />;
}
