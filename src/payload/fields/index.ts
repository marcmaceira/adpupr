import type { ArrayField, Condition, Field, GroupField, SelectField, UploadField } from "payload";
import { ICON_OPTIONS } from "../../lib/icons";

/**
 * Shared field builders: the block contract's building blocks.
 * See docs/block-contract.md. Every label, description and message here is English (the admin is in English; site content is Spanish).
 */

const ANCHOR_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const URL_PATTERN = /^(https?:\/\/|mailto:|tel:|\/|#)\S*$/;

type Option = { readonly label: string; readonly value: string };

/* ───────────── Conditions ───────────── */

/** Shows a field only when `condition` holds (e.g. for one variant). Keeps the field's type. */
export function showWhen<T extends Field>(field: T, condition: Condition): T {
  const admin = "admin" in field && field.admin ? field.admin : {};
  return { ...field, admin: { ...admin, condition } };
}

/** Condition: the block's `variant` is one of `variants`. */
export const variantIs =
  (...variants: string[]): Condition =>
  (_, siblingData) =>
    variants.includes(String(siblingData?.variant));

/* ───────────── Text ───────────── */

export const text = (
  name: string,
  label: string,
  opts: { required?: boolean; description?: string; textarea?: boolean } = {},
): Field => {
  const admin = opts.description ? { description: opts.description } : undefined;
  const required = opts.required ?? false;
  return opts.textarea
    ? { name, type: "textarea", label, required, admin }
    : { name, type: "text", label, required, admin };
};

/** Rich text using the site editor (paragraphs, bold, italic, links, lists). */
export const richText = (
  name: string,
  label: string,
  opts: { required?: boolean; description?: string } = {},
): Field => ({
  name,
  type: "richText",
  label,
  required: opts.required ?? false,
  admin: opts.description ? { description: opts.description } : undefined,
});

/**
 * A headline: a textarea where each line break renders as a line break, plus an optional
 * fragment of that text shown in the accent color.
 */
export const headline = (
  name = "heading",
  label = "Heading",
  opts: { required?: boolean; highlight?: boolean } = {},
): Field[] => {
  const fields: Field[] = [
    {
      name,
      type: "textarea",
      label,
      required: opts.required ?? true,
      admin: { rows: 2, description: "Each line break is shown as a line break." },
    },
  ];
  if (opts.highlight) {
    fields.push({
      name: `${name}Highlight`,
      type: "text",
      label: "Highlighted text",
      admin: {
        description:
          "Optional. Type part of the heading exactly as written to show it in the accent color.",
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (!value) return true;
        const title = siblingData[name];
        return typeof title === "string" && typeof value === "string" && title.includes(value)
          ? true
          : "The highlighted text must appear exactly as written in the heading.";
      },
    });
  }
  return fields;
};

/* ───────────── Section header (eyebrow + heading + intro) ───────────── */

export const sectionHeader = (
  opts: { eyebrow?: boolean; intro?: boolean; requiredHeading?: boolean; highlight?: boolean } = {},
): Field[] => [
  ...(opts.eyebrow === false ? [] : [text("eyebrow", "Eyebrow")]),
  ...headline("heading", "Heading", {
    required: opts.requiredHeading ?? true,
    highlight: opts.highlight,
  }),
  ...(opts.intro ? [text("intro", "Intro", { textarea: true })] : []),
];

/* ───────────── Variant ───────────── */

/** Named design variants. Editors never get free color, spacing or class fields. */
export const variant = (
  options: readonly Option[],
  opts: { name?: string; label?: string; defaultValue?: string; description?: string } = {},
): SelectField => ({
  name: opts.name ?? "variant",
  type: "select",
  label: opts.label ?? "Variant",
  required: true,
  defaultValue: opts.defaultValue ?? options[0]?.value,
  options: options.map((o) => ({ label: o.label, value: o.value })),
  admin: opts.description ? { description: opts.description } : undefined,
});

/* ───────────── Section settings ───────────── */

export const TONE_OPTIONS = [
  { value: "bg", label: "Light gray (page background)" },
  { value: "surface", label: "White" },
  { value: "surface2", label: "Gray" },
  { value: "sky50", label: "Light blue" },
  { value: "primary", label: "Navy" },
  { value: "primary900", label: "Dark navy" },
  { value: "mustard", label: "Mustard" },
] as const;

export type Tone = (typeof TONE_OPTIONS)[number]["value"];

/**
 * `settings` group: anchor id plus, when a block allows more than one, background tone.
 * Blocks restrict tones to the ones the design uses for that section.
 */
export const sectionSettings = (
  opts: { tones?: readonly Tone[]; defaultTone?: Tone } = {},
): GroupField => {
  const tones = opts.tones ?? [];
  const fields: Field[] = [
    {
      name: "anchorId",
      type: "text",
      label: "Anchor ID",
      admin: {
        description:
          "Optional. Lets you link to this section with #anchor. Lowercase letters, numbers and hyphens.",
      },
      validate: (value: unknown) =>
        !value || (typeof value === "string" && ANCHOR_PATTERN.test(value))
          ? true
          : "Use only lowercase letters, numbers and hyphens (for example: comites).",
    },
  ];
  if (tones.length > 1) {
    fields.push({
      name: "tone",
      type: "select",
      label: "Background",
      required: true,
      defaultValue: opts.defaultTone ?? tones[0],
      options: TONE_OPTIONS.filter((t) => tones.includes(t.value)).map((t) => ({
        label: t.label,
        value: t.value,
      })),
    });
  }
  return {
    name: "settings",
    type: "group",
    label: "Section settings",
    admin: { hideGutter: true },
    fields,
  };
};

/* ───────────── Links ───────────── */

/**
 * A link: internal page (with optional anchor) or custom URL. Shape is shared through the
 * `CmsLink` interface; resolve it with `resolveHref` in `src/lib/links.ts`.
 */
export const link = (
  opts: { name?: string; label?: string; required?: boolean; description?: string } = {},
): GroupField => ({
  name: opts.name ?? "link",
  type: "group",
  label: opts.label ?? "Link",
  interfaceName: "CmsLink",
  admin: opts.description ? { description: opts.description } : undefined,
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Label",
          admin: { width: "50%" },
          validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
            const hasTarget = Boolean(siblingData.page || siblingData.url);
            if (opts.required && !value) return "Enter the link label.";
            if (hasTarget && !value) return "Enter the link label.";
            return true;
          },
        },
        {
          name: "type",
          type: "radio",
          label: "Link type",
          defaultValue: "internal",
          options: [
            { label: "Site page", value: "internal" },
            { label: "URL", value: "custom" },
            { label: "Site email", value: "email" },
          ],
          admin: { layout: "horizontal", width: "50%" },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "page",
          type: "relationship",
          relationTo: "pages",
          label: "Page",
          admin: {
            width: "50%",
            condition: (_: unknown, sibling: Record<string, unknown>) =>
              sibling?.type !== "custom" && sibling?.type !== "email",
          },
          validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
            siblingData.type === "custom" ||
            siblingData.type === "email" ||
            value ||
            (!opts.required && !siblingData.label)
              ? true
              : "Choose the page to link to.",
        },
        {
          name: "anchor",
          type: "text",
          label: "Anchor on the page",
          admin: {
            width: "50%",
            description: "Optional, without #. For example: comites",
            condition: (_: unknown, sibling: Record<string, unknown>) =>
              sibling?.type !== "custom" && sibling?.type !== "email",
          },
          validate: (value: unknown) =>
            !value || (typeof value === "string" && ANCHOR_PATTERN.test(value))
              ? true
              : "Use only lowercase letters, numbers and hyphens, without #.",
        },
      ],
    },
    {
      name: "url",
      type: "text",
      label: "URL",
      admin: {
        description: "https://…, mailto:…, tel:…, a path /… or an anchor #…",
        condition: (_: unknown, sibling: Record<string, unknown>) => sibling?.type === "custom",
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (siblingData.type !== "custom") return true;
        if (!value) return opts.required || siblingData.label ? "Enter the URL." : true;
        return typeof value === "string" && URL_PATTERN.test(value)
          ? true
          : "The URL must start with https://, mailto:, tel:, / or # and cannot contain spaces.";
      },
    },
    {
      name: "emailSubject",
      type: "text",
      label: "Email subject",
      admin: {
        description: "Optional. The link opens an email to the main address in Site Settings.",
        condition: (_: unknown, sibling: Record<string, unknown>) => sibling?.type === "email",
      },
    },
    {
      name: "newTab",
      type: "checkbox",
      label: "Open in a new tab",
    },
  ],
});

/* ───────────── Media ───────────── */

export const media = (
  name: string,
  label: string,
  opts: { required?: boolean; description?: string } = {},
): UploadField => ({
  name,
  type: "upload",
  relationTo: "media",
  label,
  required: opts.required ?? false,
  admin: {
    description: opts.description ?? "Alt text is edited on the file in Media.",
  },
});

/* ───────────── Icon ───────────── */

export const icon = (
  name = "icon",
  label = "Icon",
  opts: { required?: boolean } = {},
): SelectField => ({
  name,
  type: "select",
  label,
  required: opts.required ?? false,
  options: ICON_OPTIONS.map((o) => ({ label: o.label, value: o.value })),
});

/* ───────────── Arrays ───────────── */

/**
 * Array field. ALWAYS use this instead of a raw `type: "array"`.
 * The hook works around payloadcms/payload#19798 (4.0.0-beta.11): when an array sits inside
 * another array and an earlier parent row omits it, the next row's children are saved under
 * the wrong parent. Normalizing a missing value to [] prevents it.
 */
export const array = (
  name: string,
  label: string,
  singular: string,
  fields: Field[],
  opts: { minRows?: number; maxRows?: number; description?: string; required?: boolean } = {},
): ArrayField => ({
  name,
  type: "array",
  label,
  labels: { singular, plural: label },
  minRows: opts.minRows,
  maxRows: opts.maxRows,
  required: opts.required,
  admin: { initCollapsed: true, ...(opts.description ? { description: opts.description } : {}) },
  hooks: { beforeValidate: [({ value }) => value ?? []] },
  fields,
});
