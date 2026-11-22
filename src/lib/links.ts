import type { CmsLink } from "@/payload-types";

/**
 * Resolves a CMS link to an href, or null when it points nowhere.
 * Internal links need the page populated (depth >= 1) to read its path.
 */
export function resolveHref(link: CmsLink | null | undefined): string | null {
  if (!link) return null;

  // "email" links get their mailto: url from the site settings (src/lib/site-email.ts).
  if (link.type === "custom" || link.type === "email") {
    return link.url?.trim() || null;
  }

  const page = link.page;
  if (!page || typeof page !== "object") return null;
  const anchor = link.anchor ? `#${link.anchor}` : "";
  return `${page.path}${anchor}`;
}

/** True for links that leave the site or open a mail/phone client. */
export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

export interface ResolvedLink {
  readonly href: string;
  readonly label: string;
  readonly newTab: boolean;
}

/** Resolves a link with its label; null when either is missing (renders nothing). */
export function resolveLink(link: CmsLink | null | undefined): ResolvedLink | null {
  const href = resolveHref(link);
  const label = link?.label?.trim();
  if (!href || !label) return null;
  return { href, label, newTab: Boolean(link?.newTab) };
}
