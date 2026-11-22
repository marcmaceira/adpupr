import Image from "next/image";
import type { Media } from "@/payload-types";

interface MediaImageProps {
  /** A populated media document. IDs and nulls render nothing. */
  readonly media: Media | number | null | undefined;
  readonly className?: string;
  readonly sizes?: string;
  /** Rendered size hints when the design fixes them (e.g. a logo). */
  readonly width?: number;
  readonly height?: number;
  readonly fill?: boolean;
  readonly priority?: boolean;
  readonly loading?: "eager" | "lazy";
  /** Overrides the media's own alt text (for example an empty alt on decorative use). */
  readonly alt?: string;
}

/**
 * Payload returns absolute URLs for local uploads (it knows its serverURL). next/image
 * treats those as remote, so same-site URLs are made relative; Blob URLs stay absolute.
 */
export function mediaSrc(url: string): string {
  const site = process.env.NEXT_PUBLIC_SERVER_URL;
  if (site && url.startsWith(site)) return url.slice(site.length) || "/";
  return url.replace(/^https?:\/\/localhost(:\d+)?/, "");
}

/** next/image for a Payload media document. Alt text comes from the media record. */
export function MediaImage({
  media,
  className,
  sizes,
  width,
  height,
  fill,
  priority,
  loading,
  alt,
}: MediaImageProps) {
  if (!media || typeof media !== "object" || !media.url) return null;
  const altText = alt ?? media.alt ?? "";

  if (fill) {
    return (
      <Image
        src={mediaSrc(media.url)}
        alt={altText}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        loading={loading}
      />
    );
  }

  return (
    <Image
      src={mediaSrc(media.url)}
      alt={altText}
      width={width ?? media.width ?? 1200}
      height={height ?? media.height ?? 800}
      sizes={sizes}
      className={className}
      priority={priority}
      loading={loading}
    />
  );
}
