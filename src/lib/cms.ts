import "server-only";
import config from "@payload-config";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import { cache } from "react";
import type { Page, SiteSetting } from "@/payload-types";

/**
 * Server-side reads from Payload. Pages render dynamically on each request, so a published
 * edit appears on the next page load with no rebuild, restart or cache purge.
 * React `cache` dedupes reads within one request (layout + page + metadata).
 */

export const getPayloadClient = cache(() => getPayload({ config }));

export const isDraftMode = cache(async () => (await draftMode()).isEnabled);

export const getPageByPath = cache(async (path: string): Promise<Page | null> => {
  const payload = await getPayloadClient();
  const draft = await isDraftMode();
  const { docs } = await payload.find({
    collection: "pages",
    where: { path: { equals: path } },
    draft,
    // Visitors read through access control (published only); previews see drafts.
    overrideAccess: draft,
    depth: 2,
    limit: 1,
    pagination: false,
  });
  return docs[0] ?? null;
});

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "site-settings", depth: 1, overrideAccess: false });
});

/** Published pages for the sitemap. */
export const getPublishedPages = cache(async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: { _status: { equals: "published" } },
    overrideAccess: false,
    depth: 0,
    pagination: false,
    select: { path: true, updatedAt: true, sitemap: true, noindex: true },
  });
  return docs;
});
