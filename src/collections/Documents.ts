import path from "node:path";
import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";

export const Documents: CollectionConfig = {
  slug: "documents",
  labels: { singular: "Documento", plural: "Documentos" },
  defaultSort: "-publishedAt",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt"],
    group: "Archivos",
    description:
      "Boletines, comunicados y otros archivos descargables que aparecen en la biblioteca de Recursos.",
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
    staticDir: path.resolve(process.cwd(), "uploads/documents"),
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/avif",
    ],
  },
  fields: [
    // Stable identity for idempotent imports; never replaces an editor's existing document.
    {
      name: "sourceUrl",
      type: "text",
      unique: true,
      admin: { hidden: true },
      access: { create: () => false, update: () => false },
    },
    {
      name: "title",
      type: "text",
      label: "T\u00EDtulo",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "document-categories",
      label: "Categor\u00EDa",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Fecha de publicaci\u00F3n",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        description: "Los documentos m\u00E1s recientes aparecen primero.",
        date: { pickerAppearance: "dayOnly", displayFormat: "d 'de' MMMM 'de' yyyy" },
      },
    },
  ],
};
