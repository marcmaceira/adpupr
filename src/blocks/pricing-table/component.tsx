import type { PricingTableBlock } from "@/payload-types";
import { getSiteSettings } from "@/lib/cms";
import { PricingTable } from "@/components/sections/pricing-table";

/** Reads the ATH Móvil link from the site settings so it lives in one place. */
export async function PricingTableBlockComponent({ block }: { readonly block: PricingTableBlock }) {
  const settings = await getSiteSettings();
  return <PricingTable {...block} athMovilUrl={settings.payments?.athMovilUrl} />;
}
