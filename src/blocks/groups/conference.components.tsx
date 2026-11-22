import { EventBenefitsBlockComponent } from "../event-benefits/component";
import { EventOverviewBlockComponent } from "../event-overview/component";
import { NumberedGridBlockComponent } from "../numbered-grid/component";
import { PricingTableBlockComponent } from "../pricing-table/component";
import type { BlockComponents } from "../types";

/** Renderers owned by the "conference" group, keyed by block slug. */
export const conferenceComponents = {
  eventOverview: EventOverviewBlockComponent,
  eventBenefits: EventBenefitsBlockComponent,
  pricingTable: PricingTableBlockComponent,
  numberedGrid: NumberedGridBlockComponent,
} satisfies BlockComponents;
