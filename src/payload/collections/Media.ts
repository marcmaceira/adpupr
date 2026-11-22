import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CollectionConfig } from "payload";
import { anyone, staff, humanEditors } from "../access";
import { RASTER_IMAGE_TYPES } from "../upload";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Media" },
  versions: false,
  admin: {
    group: "Content",
    description: "Site images: logos, portraits and photos. Every image requires alt text.",
  },
  access: {
    create: staff,
    read: anyone,
    readVersions: staff,
    update: staff,
    delete: humanEditors,
  },
  upload: {
    // Local disk during development. In production, Vercel Blob takes over when
    // USE_VERCEL_BLOB=true (see payload.config.ts).
    staticDir: path.resolve(dirname, "../../../media/images"),
    mimeTypes: RASTER_IMAGE_TYPES,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt text",
      required: true,
      admin: {
        description: "Describe the image for people who use screen readers.",
      },
    },
  ],
};
