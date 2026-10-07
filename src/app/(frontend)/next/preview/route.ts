import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/cms";
import { HOME_SLUG, isPageSlug, pathFromSlug } from "@/lib/paths";

export async function GET(request: NextRequest) {
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: request.headers });
  if (!user) return new Response("Unauthorized", { status: 401 });
  const path = request.nextUrl.searchParams.get("path");
  const slug = path === "/" ? HOME_SLUG : path?.slice(1);
  if (!path?.startsWith("/") || !isPageSlug(slug))
    return new Response("Invalid preview path", { status: 400 });
  const { docs } = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    draft: true,
    user,
    overrideAccess: false,
    depth: 0,
    limit: 1,
  });
  const page = docs[0];
  if (!page) return new Response("Page not found", { status: 404 });
  (await draftMode()).enable();
  // The redirect is derived from the validated CMS record, never an arbitrary URL.
  return redirect(pathFromSlug(page.slug));
}
