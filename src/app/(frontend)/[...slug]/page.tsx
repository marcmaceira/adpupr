import { permanentRedirect } from "next/navigation";
import { getPublishedPageSlugs } from "@/lib/cms";
import { PageView, pageMetadata } from "@/lib/page-view";
import { HOME_SLUG } from "@/lib/paths";

type Args = { params: Promise<{ slug: string[] }> };

export async function generateStaticParams() {
  const pages = await getPublishedPageSlugs();
  return pages
    .filter((page) => page.slug !== HOME_SLUG)
    .map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: Args) {
  return pageMetadata((await params).slug.join("/"));
}

export default async function CmsPage({ params }: Args) {
  const slug = (await params).slug.join("/");
  if (slug === HOME_SLUG) permanentRedirect("/");
  return <PageView slug={slug} />;
}
