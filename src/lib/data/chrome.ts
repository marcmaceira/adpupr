import "server-only";
import { cache } from "react";
import { getPayloadClient, getSiteSettings } from "@/lib/cms";
import { type ResolvedLink, resolveLink } from "@/lib/links";
import type { CmsLink, Footer, Header, Media, SiteSetting } from "@/payload-types";
import { applySiteEmail } from "@/lib/site-email";

/**
 * Header and footer data, resolved into plain props (links as hrefs, media populated,
 * the copyright year filled in) so the layout components never talk to Payload.
 */

const siteEmail = async () => (await getSiteSettings()).contact?.emails?.[0]?.email;

export const getHeader = cache(async (): Promise<Header> => {
  const payload = await getPayloadClient();
  const header = await payload.findGlobal({ slug: "header", depth: 2, overrideAccess: false });
  return applySiteEmail(header, await siteEmail());
});

export const getFooter = cache(async (): Promise<Footer> => {
  const payload = await getPayloadClient();
  const footer = await payload.findGlobal({ slug: "footer", depth: 2, overrideAccess: false });
  return applySiteEmail(footer, await siteEmail());
});

/* ───────────── Header ───────────── */

export type HeaderNavItem =
  | { readonly kind: "link"; readonly key: string; readonly link: ResolvedLink }
  | {
      readonly kind: "dropdown";
      readonly key: string;
      /** Stable DOM id stem ("nosotros" → nosotros-desktop-menu / nosotros-mobile-menu). */
      readonly menuId: string;
      readonly label: string;
      readonly children: readonly ResolvedLink[];
    };

export interface HeaderData {
  readonly logo: Media | null;
  readonly homeAriaLabel: string;
  readonly items: readonly HeaderNavItem[];
  readonly cta: ResolvedLink | null;
  readonly navLabel: string;
  readonly mobileNavLabel: string;
  readonly openMenuLabel: string;
  readonly closeMenuLabel: string;
}

/** "Historia de Fundación" → "historia-de-fundacion". */
function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveLinks(rows: ReadonlyArray<{ link?: CmsLink | null }> | null | undefined) {
  return (rows ?? [])
    .map((row) => resolveLink(row.link))
    .filter((link): link is ResolvedLink => link !== null);
}

function populated(media: number | Media | null | undefined): Media | null {
  return media && typeof media === "object" ? media : null;
}

export function toHeaderData(header: Header): HeaderData {
  const usedIds = new Set<string>();
  const items: HeaderNavItem[] = [];
  for (const [index, item] of (header.navItems ?? []).entries()) {
    const key = item.id ?? String(index);
    if (item.type === "dropdown") {
      const label = item.label?.trim();
      const children = resolveLinks(item.children);
      if (!label || children.length === 0) continue;
      let menuId = slugify(label) || `menu-${index + 1}`;
      if (usedIds.has(menuId)) menuId = `${menuId}-${index + 1}`;
      usedIds.add(menuId);
      items.push({ kind: "dropdown", key, menuId, label, children });
      continue;
    }
    const link = resolveLink(item.link);
    if (link) items.push({ kind: "link", key, link });
  }

  return {
    logo: populated(header.logo),
    homeAriaLabel: header.homeAriaLabel ?? "",
    items,
    cta: resolveLink(header.cta),
    navLabel: header.a11y?.navLabel ?? "",
    mobileNavLabel: header.a11y?.mobileNavLabel ?? "",
    openMenuLabel: header.a11y?.openMenuLabel ?? "",
    closeMenuLabel: header.a11y?.closeMenuLabel ?? "",
  };
}

/* ───────────── Footer ───────────── */

type SocialProfile = NonNullable<NonNullable<SiteSetting["social"]>["profiles"]>[number];
export type SocialNetwork = SocialProfile["network"];

export interface FooterSocial {
  readonly network: SocialNetwork;
  readonly label: string;
  readonly url: string;
}

export interface FooterData {
  readonly logo: Media | null;
  readonly blurb: string;
  readonly socials: readonly FooterSocial[];
  readonly columns: ReadonlyArray<{
    readonly key: string;
    readonly heading: string;
    readonly links: readonly ResolvedLink[];
  }>;
  readonly addressLabel: string;
  readonly addressLines: readonly string[];
  readonly emailLabel: string;
  readonly emails: readonly string[];
  readonly copyright: string;
  readonly location: string;
}

/** Social profiles flagged for the footer, in editor order. Also feeds JSON-LD sameAs. */
export function footerSocials(settings: SiteSetting): FooterSocial[] {
  return (settings.social?.profiles ?? [])
    .filter((profile) => profile.showInFooter && profile.url)
    .map((profile) => ({ network: profile.network, label: profile.label, url: profile.url }));
}

/** Postal address lines as printed: name, PO box, "City, ST 00000". */
export function addressLines(settings: SiteSetting): string[] {
  const postal = settings.contact?.postal;
  const cityLine = [postal?.city, [postal?.region, postal?.postalCode].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  return [settings.organization?.shortName, postal?.line1, cityLine].filter(
    (line): line is string => Boolean(line),
  );
}

export function contactEmails(settings: SiteSetting): string[] {
  return (settings.contact?.emails ?? []).map((row) => row.email).filter(Boolean);
}

export function toFooterData(footer: Footer, settings: SiteSetting, year: number): FooterData {
  return {
    logo: populated(footer.logo),
    blurb: footer.blurb ?? "",
    socials: footerSocials(settings),
    columns: (footer.columns ?? []).map((column, index) => ({
      key: column.id ?? String(index),
      heading: column.heading,
      links: resolveLinks(column.links),
    })),
    addressLabel: footer.addressLabel ?? "",
    addressLines: addressLines(settings),
    emailLabel: footer.emailLabel ?? "",
    emails: contactEmails(settings),
    copyright: (footer.copyright ?? "").replaceAll("{year}", String(year)),
    location: footer.location ?? "",
  };
}

/** Everything the site frame needs, read once per request. */
export const getChrome = cache(async () => {
  const [header, footer, settings] = await Promise.all([
    getHeader(),
    getFooter(),
    getSiteSettings(),
  ]);
  // Read per request (pages render dynamically), never during a component render.
  const year = new Date().getFullYear();
  return {
    header: toHeaderData(header),
    footer: toFooterData(footer, settings, year),
    settings,
  };
});
