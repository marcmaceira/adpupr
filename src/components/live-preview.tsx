"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

export function LivePreview() {
  const router = useRouter();
  // The admin iframe and frontend share an origin. This only runs in draft mode.
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={origin} />;
}
