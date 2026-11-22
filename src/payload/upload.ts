/** Image types editors may upload. SVG is left out: it can carry scripts and is served from the site's own origin. */
export const RASTER_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

/** Largest accepted upload, in bytes. */
export const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;
