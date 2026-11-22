import type { CollectionBeforeValidateHook, CollectionConfig, Field } from "payload";
import { media, text } from "../fields";
import { anyone, staff, humanEditors } from "../access";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** "Urayoán Jordán Salivia" → "urayoan-jordan-salivia". */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Fills an empty `slug` from another text field of the same document. Never changes an
 * existing slug: anchors and seed keys must survive a rename or a partial update.
 */
export const slugFrom =
  (source: string): CollectionBeforeValidateHook =>
  ({ data, originalDoc }) => {
    if (!data || data.slug || originalDoc?.slug) return data;
    const value: unknown = Reflect.get(data, source);
    return typeof value === "string" ? { ...data, slug: slugify(value) } : data;
  };

/** Unique, URL-safe identifier field. `description` explains what it is used for. */
export const slugField = (label: string, description: string, example: string): Field => ({
  name: "slug",
  type: "text",
  label,
  unique: true,
  index: true,
  admin: { position: "sidebar", description },
  validate: (value: unknown) =>
    !value || (typeof value === "string" && SLUG_PATTERN.test(value))
      ? true
      : `Use only lowercase letters, numbers and hyphens (for example: ${example}).`,
});

/**
 * One record per real person. Every place that shows people (Board of Directors, Founding
 * Board, committees) points here, so a name, portrait or biography is edited once.
 */
export const People: CollectionConfig = {
  slug: "people",
  labels: { singular: "Person", plural: "People" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "portrait", "updatedAt"],
    group: "Organization",
    description:
      "Members of boards and committees. Each person exists only once: their portrait and biography update in every section where they appear.",
  },
  access: {
    create: staff,
    read: anyone,
    readVersions: staff,
    update: staff,
    delete: humanEditors,
  },
  defaultSort: "name",
  hooks: { beforeValidate: [slugFrom("name")] },
  fields: [
    text("name", "Name", {
      required: true,
      description:
        "As usually shown, with titles or degrees if any. Each section can show a different form of the name.",
    }),
    media("portrait", "Portrait", {
      description:
        "Portrait-orientation photo (4:5 or 3:4 ratio). Alt text is edited on the file in Media.",
    }),
    text("bio", "Biography", {
      textarea: true,
      description:
        "Shown when the card is opened in the Board of Directors and in a committee's coordinator profile.",
    }),
    slugField(
      "Identifier",
      "Filled in automatically from the name. Lowercase letters, numbers and hyphens.",
      "maria-rivera",
    ),
  ],
};
