import type { MetadataRoute } from "next";
import { getPublishedPageSlugs } from "@/lib/cms";
import { HOME_SLUG, pathFromSlug } from "@/lib/paths";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await getPublishedPageSlugs()).map((page) => ({
    url: `${siteUrl}${pathFromSlug(page.slug)}`,
    lastModified: page.updatedAt,
    changeFrequency: "monthly",
    priority: page.slug === HOME_SLUG ? 1 : 0.8,
  }));
}
