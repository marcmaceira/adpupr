import type { Media } from "@/payload-types";

/** Narrows a relationship value that may be an ID (unpopulated) to the populated document. */
export function populated<T extends { id: number }>(
  value: number | T | null | undefined,
): T | null {
  return value && typeof value === "object" ? value : null;
}

export function uploadUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  // Payload includes serverURL on local files. Relative paths work on every preview
  // origin and go through Next's local image allowlist rather than a remote host.
  try {
    const url = new URL(value);
    if (/^\/api\/(media|documents)\/file\//.test(url.pathname))
      return `${url.pathname}${url.search}`;
  } catch {
    // Local adapters can also return relative paths.
  }
  return value;
}

export function mediaUrl(media: number | Media | null | undefined): string | null {
  return uploadUrl(populated(media)?.url);
}
