/** Slug of the CMS page rendered at "/". */
export const HOME_SLUG = "inicio";

const RESERVED = new Set(["admin", "api", "next", "favicon.ico", "sitemap.xml", "robots.txt"]);

export function isPageSlug(value: string | null | undefined): value is string {
  return Boolean(
    value &&
    value.length <= 200 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(value) &&
    !RESERVED.has(value.split("/")[0]),
  );
}

export function pathFromSlug(slug: string) {
  return slug === HOME_SLUG ? "/" : `/${slug}`;
}
