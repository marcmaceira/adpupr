import type { ArrayField, Condition, Field, GroupField, SelectField, UploadField } from "payload";
import { ICON_OPTIONS } from "../../lib/icons";

/**
 * Shared field builders: the block contract's building blocks.
 * See docs/block-contract.md. Every label, description and message here is Spanish.
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
  label = "Título",
  opts: { required?: boolean; highlight?: boolean } = {},
): Field[] => {
  const fields: Field[] = [
    {
      name,
      type: "textarea",
      label,
      required: opts.required ?? true,
      admin: { rows: 2, description: "Cada salto de línea se muestra como un salto de línea." },
    },
  ];
  if (opts.highlight) {
    fields.push({
      name: `${name}Highlight`,
      type: "text",
      label: "Texto resaltado",
      admin: {
        description:
          "Opcional. Escribe exactamente una parte del título para mostrarla en color de acento.",
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (!value) return true;
        const title = siblingData[name];
        return typeof title === "string" && typeof value === "string" && title.includes(value)
          ? true
          : "El texto resaltado debe aparecer tal cual dentro del título.";
      },
    });
  }
  return fields;
};

/* ───────────── Section header (eyebrow + heading + intro) ───────────── */

export const sectionHeader = (
  opts: { eyebrow?: boolean; intro?: boolean; requiredHeading?: boolean; highlight?: boolean } = {},
): Field[] => [
  ...(opts.eyebrow === false ? [] : [text("eyebrow", "Antetítulo")]),
  ...headline("heading", "Título", {
    required: opts.requiredHeading ?? true,
    highlight: opts.highlight,
  }),
  ...(opts.intro ? [text("intro", "Introducción", { textarea: true })] : []),
];

/* ───────────── Variant ───────────── */

/** Named design variants. Editors never get free color, spacing or class fields. */
export const variant = (
  options: readonly Option[],
  opts: { name?: string; label?: string; defaultValue?: string; description?: string } = {},
): SelectField => ({
  name: opts.name ?? "variant",
  type: "select",
  label: opts.label ?? "Variante",
  required: true,
  defaultValue: opts.defaultValue ?? options[0]?.value,
  options: options.map((o) => ({ label: o.label, value: o.value })),
  admin: opts.description ? { description: opts.description } : undefined,
});

/* ───────────── Section settings ───────────── */

export const TONE_OPTIONS = [
  { value: "bg", label: "Gris claro (fondo)" },
  { value: "surface", label: "Blanco" },
  { value: "surface2", label: "Gris" },
  { value: "sky50", label: "Celeste" },
  { value: "primary", label: "Azul institucional" },
  { value: "primary900", label: "Azul oscuro" },
  { value: "mustard", label: "Mostaza" },
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
      label: "Ancla (id)",
      admin: {
        description:
          "Opcional. Permite enlazar a esta sección con #ancla. Minúsculas, números y guiones.",
      },
      validate: (value: unknown) =>
        !value || (typeof value === "string" && ANCHOR_PATTERN.test(value))
          ? true
          : "Usa solo minúsculas, números y guiones (por ejemplo: comites).",
    },
  ];
  if (tones.length > 1) {
    fields.push({
      name: "tone",
      type: "select",
      label: "Fondo",
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
    label: "Ajustes de la sección",
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
  label: opts.label ?? "Enlace",
  interfaceName: "CmsLink",
  admin: opts.description ? { description: opts.description } : undefined,
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Texto",
          admin: { width: "50%" },
          validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
            const hasTarget = Boolean(siblingData.page || siblingData.url);
            if (opts.required && !value) return "Escribe el texto del enlace.";
            if (hasTarget && !value) return "Escribe el texto del enlace.";
            return true;
          },
        },
        {
          name: "type",
          type: "radio",
          label: "Destino",
          defaultValue: "internal",
          options: [
            { label: "Página del sitio", value: "internal" },
            { label: "URL", value: "custom" },
            { label: "Correo del sitio", value: "email" },
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
          label: "Página",
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
              : "Elige la página de destino.",
        },
        {
          name: "anchor",
          type: "text",
          label: "Ancla en la página",
          admin: {
            width: "50%",
            description: "Opcional, sin #. Por ejemplo: comites",
            condition: (_: unknown, sibling: Record<string, unknown>) =>
              sibling?.type !== "custom" && sibling?.type !== "email",
          },
          validate: (value: unknown) =>
            !value || (typeof value === "string" && ANCHOR_PATTERN.test(value))
              ? true
              : "Usa solo minúsculas, números y guiones, sin #.",
        },
      ],
    },
    {
      name: "url",
      type: "text",
      label: "URL",
      admin: {
        description: "https://…, mailto:…, tel:…, una ruta /… o un ancla #…",
        condition: (_: unknown, sibling: Record<string, unknown>) => sibling?.type === "custom",
      },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (siblingData.type !== "custom") return true;
        if (!value) return opts.required || siblingData.label ? "Escribe la URL." : true;
        return typeof value === "string" && URL_PATTERN.test(value)
          ? true
          : "La URL debe empezar con https://, mailto:, tel:, / o # y no puede tener espacios.";
      },
    },
    {
      name: "emailSubject",
      type: "text",
      label: "Asunto del correo",
      admin: {
        description:
          "Opcional. El enlace abre un correo dirigido al correo principal de Configuración del sitio.",
        condition: (_: unknown, sibling: Record<string, unknown>) => sibling?.type === "email",
      },
    },
    {
      name: "newTab",
      type: "checkbox",
      label: "Abrir en una pestaña nueva",
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
    description: opts.description ?? "El texto alternativo se edita en el archivo de Medios.",
  },
});

/* ───────────── Icon ───────────── */

export const icon = (
  name = "icon",
  label = "Ícono",
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
