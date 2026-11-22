import type { Metadata } from "next";
import type { Page } from "@/payload-types";

/** Page-level metadata. Site defaults (title template, Open Graph base) live in the layout. */
export function buildPageMetadata(page: Page): Metadata {
  const title = page.meta?.title?.trim();
  const description = page.meta?.description?.trim();
  if (!title && !description) return {};

  return {
    title: title || undefined,
    description: description || undefined,
    robots: page.noindex ? { index: false, follow: false } : undefined,
  };
}
