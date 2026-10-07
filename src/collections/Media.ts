import path from "node:path";
import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Imagen", plural: "Im\u00E1genes" },
  admin: {
    group: "Archivos",
    description: "Fotos y gr\u00E1ficos usados en las p\u00E1ginas.",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  upload: {
    // Used only when Vercel Blob is not configured (local development).
    staticDir: path.resolve(process.cwd(), "uploads/media"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
    focalPoint: true,
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 320 },
      { name: "card", width: 900 },
    ],
  },
  fields: [
    // Stable identity for the one-time import; editors manage the uploaded file normally.
    {
      name: "sourceUrl",
      type: "text",
      unique: true,
      admin: { hidden: true },
      access: { create: () => false, update: () => false },
    },
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      required: true,
      admin: {
        description:
          "Describe la imagen para personas que usan lectores de pantalla (p. ej. «Retrato de Jonnathan Garc\u00EDa»).",
      },
    },
  ],
};
