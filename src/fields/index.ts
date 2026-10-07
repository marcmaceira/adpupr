import type { ArrayField, Field, GroupField, SelectField, TextField } from "payload";
import { ICON_OPTIONS } from "@/lib/icon-options";
import { validateHref } from "@/lib/urls";

const URL_DESCRIPTION =
  "Ruta interna (p. ej. /membresia o /recursos#biblioteca), direcci\u00F3n completa (https://…) o mailto:correo@dominio.com. Los enlaces externos abren en una pesta\u00F1a nueva.";

export const INLINE_FORMAT_DESCRIPTION = "Escribe **texto** para resaltarlo en negritas.";

interface LinkOptions {
  readonly required?: boolean;
  readonly withStyle?: boolean;
}

export function linkFields({ required = true, withStyle = false }: LinkOptions = {}): Field[] {
  const fields: Field[] = [
    {
      type: "row",
      fields: [
        {
          name: "label",
          type: "text",
          label: "Texto del enlace",
          required,
          admin: { width: "50%" },
        },
        {
          name: "url",
          type: "text",
          label: "Direcci\u00F3n",
          required,
          validate: validateHref,
          admin: { width: "50%", description: URL_DESCRIPTION },
        },
      ],
    },
  ];

  if (withStyle) {
    fields.push({
      name: "style",
      type: "select",
      label: "Estilo",
      defaultValue: "primary",
      options: [
        { label: "Principal (relleno)", value: "primary" },
        { label: "Secundario (borde)", value: "secondary" },
      ],
    });
  }

  return fields;
}

export function linkGroup(name: string, label: string, options: LinkOptions = {}): GroupField {
  return {
    name,
    type: "group",
    label,
    fields: linkFields(options),
  };
}

export function buttonsField(name = "buttons", label = "Botones", maxRows = 2): ArrayField {
  return {
    name,
    type: "array",
    label,
    labels: { singular: "Bot\u00F3n", plural: "Botones" },
    maxRows,
    admin: { initCollapsed: true },
    fields: linkFields({ withStyle: true }),
  };
}

export function iconField(required = false): SelectField {
  return {
    name: "icon",
    type: "select",
    label: "\u00CDcono",
    required,
    options: ICON_OPTIONS.map(({ value, label }) => ({ value, label })),
  };
}

export const eyebrowField: TextField = {
  name: "eyebrow",
  type: "text",
  label: "Antet\u00EDtulo",
  admin: { description: "Etiqueta corta en may\u00FAsculas que aparece sobre el t\u00EDtulo." },
};

export const headingField: TextField = {
  name: "heading",
  type: "text",
  label: "T\u00EDtulo",
};

export const anchorField: TextField = {
  name: "anchor",
  type: "text",
  label: "ID de ancla",
  admin: {
    description:
      "Opcional. Permite enlazar directamente a esta secci\u00F3n (p. ej. «comites» para /pagina#comites). Solo min\u00FAsculas, n\u00FAmeros y guiones.",
  },
  validate: (value: string | null | undefined) =>
    !value || /^[a-z0-9-]+$/.test(value) || "Usa solo min\u00FAsculas, n\u00FAmeros y guiones.",
};

export const BACKGROUND_OPTIONS = [
  { label: "Gris muy claro", value: "bg" },
  { label: "Blanco", value: "surface" },
  { label: "Gris claro", value: "surface-2" },
] as const;

export function backgroundField(defaultValue: (typeof BACKGROUND_OPTIONS)[number]["value"]) {
  const field: SelectField = {
    name: "background",
    type: "select",
    label: "Fondo",
    defaultValue,
    options: BACKGROUND_OPTIONS.map(({ label, value }) => ({ label, value })),
  };
  return field;
}
