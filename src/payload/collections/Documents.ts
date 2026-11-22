import path from "node:path";
import { fileURLToPath } from "node:url";
import type { CollectionConfig } from "payload";
import { anyone, authenticated, humanEditors } from "../access";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Downloadable files of the /recursos library (PDFs and images). The library lists them
 * newest first by `publishedAt`; `sortOrder` breaks ties between equal dates.
 */
export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "Documento", plural: "Documentos" },
  versions: false,
  // Same order as the library on the site.
  defaultSort: ["-publishedAt", "sortOrder"],
  admin: {
    group: "Contenido",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "filename"],
    description:
      "Archivos que se descargan desde la biblioteca de Recursos. Sube el archivo, escribe el título y elige la categoría.",
  },
  access: { create: authenticated, read: anyone, update: authenticated, delete: humanEditors },
  upload: {
    // Local disk during development. In production, Vercel Blob takes over when
    // USE_VERCEL_BLOB=true (see payload.config.ts).
    staticDir: path.resolve(dirname, "../../../media/documents"),
    mimeTypes: ["application/pdf", "image/*"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Título",
      required: true,
      admin: { description: "Así aparece en la lista y en el botón de descarga." },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "document-categories",
      label: "Categoría",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Fecha de publicación",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "La lista muestra primero los documentos más recientes.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      label: "Orden en la misma fecha",
      admin: {
        position: "sidebar",
        description:
          "Opcional. Si dos documentos tienen la misma fecha, el de número menor aparece primero.",
      },
    },
  ],
};
