import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RenderBlocks } from "@/blocks/render";
import { LivePreviewListener } from "@/components/layout/live-preview-listener";
import { getPageByPath, isDraftMode } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/metadata";

// Every request reads Payload, so published edits show without a rebuild.
export const dynamic = "force-dynamic";

interface PageProps {
  readonly params: Promise<{ segments?: string[] }>;
}

async function resolvePath(params: PageProps["params"]): Promise<string> {
  const { segments } = await params;
  return `/${(segments ?? []).map((s) => decodeURIComponent(s)).join("/")}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageByPath(await resolvePath(params));
  if (!page) return {};
  return buildPageMetadata(page);
}

export default async function CmsPage({ params }: PageProps) {
  const page = await getPageByPath(await resolvePath(params));
  if (!page) notFound();
  const draft = await isDraftMode();

  return (
    <main id="main-content" className="isolate">
      {draft ? <LivePreviewListener /> : null}
      <RenderBlocks blocks={page.layout} />
    </main>
  );
}
