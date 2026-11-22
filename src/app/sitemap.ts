import type { MetadataRoute } from "next";
import { getPublishedPages } from "@/lib/cms";
import { siteUrl } from "@/lib/site";

// Read on every request so page edits (inclusion, priority, frequency) show at once.
export const dynamic = "force-dynamic";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

/** Published pages marked for the sitemap and not hidden from search engines. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getPublishedPages();
  return (
    pages
      .filter((page) => page.sitemap?.include && !page.noindex)
      // Stable order: home first, then alphabetical by path.
      .toSorted((a, b) => a.path.localeCompare(b.path))
      .map((page) => {
        const changeFrequency: ChangeFrequency | undefined =
          page.sitemap?.changeFrequency ?? undefined;
        const priority = Number(page.sitemap?.priority);
        return {
          // The home page is the bare site URL, without a trailing slash.
          url: page.path === "/" ? siteUrl : `${siteUrl}${page.path}`,
          lastModified: page.updatedAt,
          changeFrequency,
          priority: Number.isFinite(priority) ? priority : undefined,
        };
      })
  );
}
