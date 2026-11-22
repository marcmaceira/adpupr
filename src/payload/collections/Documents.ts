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
  labels: { singular: "Document", plural: "Documents" },
  versions: false,
  // Same order as the library on the site.
  defaultSort: ["-publishedAt", "sortOrder"],
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedAt", "filename"],
    description:
      "Files downloaded from the Resources library. Upload the file, enter the title and choose the category.",
  },
  access: { create: authenticated, read: anyone, update: authenticated, delete: humanEditors },
  upload: {
    // Local disk during development. In production, Vercel Blob takes over when
    // USE_VERCEL_BLOB=true (see payload.config.ts).
    staticDir: path.resolve(dirname, "../../../media/documents"),
    mimeTypes: ["application/pdf", "image/*"],
    // Library links download the file, as the old Blob `?download=1` links did.
    modifyResponseHeaders: ({ headers }) => {
      headers.set("Content-Disposition", "attachment");
      return headers;
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      admin: { description: "How it appears in the list and on the download button." },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "document-categories",
      label: "Category",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Publication date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "The list shows the most recent documents first.",
      },
    },
    {
      name: "sortOrder",
      type: "number",
      label: "Order within the same date",
      admin: {
        position: "sidebar",
        description:
          "Optional. If two documents have the same date, the one with the lower number appears first.",
      },
    },
  ],
};
