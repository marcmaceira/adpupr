import "server-only";
import config from "@payload-config";
import { draftMode, headers } from "next/headers";
import { getPayload } from "payload";
import { cache } from "react";
import type { Committee, Document } from "@/payload-types";

export function getPayloadClient() {
  return getPayload({ config });
}

export const isAuthenticatedPreview = cache(async () => {
  if (!(await draftMode()).isEnabled) return false;
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: await headers() });
  return Boolean(user);
});

export const getPageBySlug = cache(async (slug: string) => {
  const draft = await isAuthenticatedPreview();
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    draft,
    // Drafts are only visible to logged-in editors through the preview route.
    overrideAccess: draft,
    depth: 2,
    limit: 1,
    pagination: false,
  });

  return docs[0] ?? null;
});

export const getPublishedPageSlugs = cache(async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "pages",
    where: { _status: { equals: "published" } },
    select: { slug: true, updatedAt: true },
    overrideAccess: false,
    limit: 0,
    pagination: false,
  });

  return docs;
});

export const getHeader = cache(async () => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "header", depth: 0 });
});

export const getFooter = cache(async () => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "footer", depth: 0 });
});

export const getSiteSettings = cache(async () => {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "site-settings", depth: 1 });
});

export const getCommittees = cache(async (): Promise<Committee[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "committees",
    sort: "_order",
    depth: 1,
    limit: 100,
    pagination: false,
  });

  return docs;
});

export const getDocuments = cache(async (): Promise<Document[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "documents",
    sort: "-publishedAt",
    depth: 1,
    limit: 1000,
    pagination: false,
  });

  return docs;
});

export const getDocumentCategories = cache(async () => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "document-categories",
    sort: "_order",
    limit: 100,
    pagination: false,
  });

  return docs;
});
