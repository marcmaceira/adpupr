import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CollectionConfig } from "payload";
import { anyone, authenticated, humanEditors } from "../access";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Imagen", plural: "Medios" },
  versions: false,
  admin: {
    group: "Contenido",
    description:
      "Imágenes del sitio: logotipos, retratos y fotos. Todas requieren texto alternativo.",
  },
  access: { create: authenticated, read: anyone, update: authenticated, delete: humanEditors },
  upload: {
    // Local disk during development. In production, Vercel Blob takes over when
    // USE_VERCEL_BLOB=true (see payload.config.ts).
    staticDir: path.resolve(dirname, "../../../media/images"),
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texto alternativo",
      required: true,
      admin: {
        description: "Describe la imagen para personas que usan lectores de pantalla.",
      },
    },
  ],
};
