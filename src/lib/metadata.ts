import type { Metadata } from "next";
import { mediaSrc } from "@/components/ui/media-image";
import { getSiteSettings } from "@/lib/cms";
import { siteUrl } from "@/lib/site";
import type { Media, Page, SiteSetting } from "@/payload-types";

interface OgImage {
  readonly url: string;
  readonly width?: number;
  readonly height?: number;
  readonly alt?: string;
}

/** The site's social image (relative URLs resolve against metadataBase). */
export function siteOgImage(settings: SiteSetting): OgImage | null {
  const media: number | Media | null | undefined = settings.seo?.ogImage;
  if (!media || typeof media !== "object" || !media.url) return null;
  return {
    url: mediaSrc(media.url),
    width: media.width ?? undefined,
    height: media.height ?? undefined,
    alt: media.alt || undefined,
  };
}

/** Open Graph fields every page shares: type, locale, site name and image. */
function baseOpenGraph(settings: SiteSetting) {
  const image = siteOgImage(settings);
  return {
    type: "website" as const,
    locale: settings.seo?.locale || undefined,
    siteName: settings.seo?.siteName || undefined,
    images: image ? [image] : undefined,
  };
}

/** Site-wide defaults, set once in the frontend layout. */
export function buildSiteMetadata(settings: SiteSetting): Metadata {
  const seo = settings.seo;
  const image = siteOgImage(settings);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.defaultTitle, template: `%s${seo.titleSuffix}` },
    description: seo.description,
    openGraph: {
      ...baseOpenGraph(settings),
      url: siteUrl,
      title: seo.defaultTitle,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.defaultTitle,
      description: seo.socialDescription || seo.description,
      images: image ? [image.url] : undefined,
    },
  };
}

/**
 * Page-level metadata. Next replaces the whole `openGraph` object per segment, so pages
 * repeat the shared Open Graph fields (type, locale, site name, image) with their own
 * title, description and URL. Twitter tags are inherited from the layout. Pages without
 * an SEO title or description (the home page) keep the site defaults.
 */
export async function buildPageMetadata(page: Page): Promise<Metadata> {
  const robots = page.noindex ? { index: false, follow: false } : undefined;
  const title = page.meta?.title?.trim();
  const description = page.meta?.description?.trim();
  if (!title && !description) return robots ? { robots } : {};

  const settings = await getSiteSettings();
  const ogDescription = page.meta?.ogDescription?.trim() || description;
  return {
    title: title || undefined,
    description: description || undefined,
    openGraph: {
      ...baseOpenGraph(settings),
      url: page.path,
      title: title ? `${title}${settings.seo.titleSuffix}` : settings.seo.defaultTitle,
      description: ogDescription || settings.seo.description,
    },
    robots,
  };
}
