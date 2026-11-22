import type { CollectionConfig } from "payload";
import { anyone, authenticated, humanEditors } from "../access";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Categories of the /recursos library. The filter buttons follow `order`. */
export const DocumentCategories: CollectionConfig = {
  slug: "document-categories",
  labels: { singular: "Document Category", plural: "Document Categories" },
  versions: false,
  defaultSort: "order",
  admin: {
    group: "Content",
    useAsTitle: "label",
    defaultColumns: ["label", "order", "slug"],
    description:
      "Categories of the Resources library. Each one appears as a filter button, in the order set.",
  },
  access: { create: authenticated, read: anyone, update: authenticated, delete: humanEditors },
  fields: [
    {
      name: "label",
      type: "text",
      label: "Name",
      required: true,
      admin: { description: "Text of the filter button and of the tag on each document." },
    },
    {
      name: "slug",
      type: "text",
      label: "Identifier",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Lowercase letters, numbers and hyphens. Not shown to visitors.",
      },
      validate: (value: unknown) =>
        typeof value === "string" && SLUG_PATTERN.test(value)
          ? true
          : "Use only lowercase letters, numbers and hyphens (for example: boletines).",
    },
    {
      name: "order",
      type: "number",
      label: "Order",
      required: true,
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Categories with a lower number appear first.",
      },
    },
  ],
};
