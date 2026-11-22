import type { Block } from "payload";
import { EventBenefitsBlock } from "../event-benefits/config";
import { EventOverviewBlock } from "../event-overview/config";
import { NumberedGridBlock } from "../numbered-grid/config";
import { PricingTableBlock } from "../pricing-table/config";

/** Block configs owned by the "conference" group. Register new blocks here only. */
export const conferenceBlocks: Block[] = [
  EventOverviewBlock,
  EventBenefitsBlock,
  PricingTableBlock,
  NumberedGridBlock,
];
