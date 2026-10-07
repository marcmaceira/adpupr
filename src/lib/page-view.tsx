import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/blocks/render-blocks";
import { LivePreview } from "@/components/live-preview";
import { getPageBySlug, getSiteSettings, isAuthenticatedPreview } from "./cms";
import { mediaUrl } from "./media";
import { HOME_SLUG, pathFromSlug } from "./paths";

export async function PageView({ slug }: { readonly slug: string }) {
  const [page, preview] = await Promise.all([getPageBySlug(slug), isAuthenticatedPreview()]);
  if (!page) notFound();
  return (
    <main id="main-content">
      {preview ? <LivePreview /> : null}
      <RenderBlocks blocks={page.layout} />
    </main>
  );
}

export async function pageMetadata(slug: string): Promise<Metadata> {
  const [page, settings, preview] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
    isAuthenticatedPreview(),
  ]);
  if (!page) return {};
  const title = page.meta?.title || (slug === HOME_SLUG ? settings.siteTitle : page.title);
  const description = page.meta?.description || settings.siteDescription;
  const image =
    mediaUrl(page.meta?.image) || mediaUrl(settings.shareImage) || "/opengraph-image.jpg";
  return {
    title: slug === HOME_SLUG ? { absolute: title } : title,
    description,
    alternates: { canonical: pathFromSlug(slug) },
    robots:
      preview || process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "es_PR",
      siteName: "ADPUPR",
      url: pathFromSlug(slug),
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
