import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/cms";

/**
 * Entry point for the admin's Preview and Live Preview: verifies the shared secret and the
 * signed-in user, turns on Next draft mode and redirects to the page.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  const secret = searchParams.get("previewSecret");

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response(null, { status: 403 });
  }
  if (!path?.startsWith("/") || path.startsWith("//")) {
    return new Response(null, { status: 400 });
  }

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: request.headers });
  const draft = await draftMode();

  if (!user) {
    draft.disable();
    return new Response(null, { status: 403 });
  }

  draft.enable();
  return redirect(path);
}
