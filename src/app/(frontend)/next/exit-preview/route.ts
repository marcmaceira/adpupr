import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  (await draftMode()).disable();
  const path = new URL(request.url).searchParams.get("path");
  return redirect(path?.startsWith("/") && !path.startsWith("//") ? path : "/");
}
