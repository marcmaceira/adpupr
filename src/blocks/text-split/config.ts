import type { Block } from "payload";
import { headline, link, richText, sectionSettings, text, variant } from "../../payload/fields";

export const TEXT_SPLIT_RATIOS = [
  { value: "wideLeft", label: "Título amplio a la izquierda (portada)" },
  { value: "fixedLeft", label: "Columna izquierda estrecha y fija" },
  { value: "narrowLeft", label: "Columna izquierda estrecha, texto amplio" },
] as const;

export const TEXT_SPLIT_ACCENTS = [
  { value: "rightRule", label: "Línea mostaza junto al texto" },
  { value: "goldBar", label: "Barra mostaza bajo el título" },
  { value: "bottomRule", label: "Línea divisoria al final" },
  { value: "none", label: "Sin acento" },
] as const;

export const TEXT_SPLIT_HEADING_SIZES = [
  { value: "section", label: "Grande (título de sección)" },
  { value: "compact", label: "Compacto" },
] as const;

/**
 * Text split: eyebrow and heading on the left, rich text (and an optional link) on the
 * right. Column ratio, accent and heading size are named presets taken from the design.
 */
export const TextSplitBlock: Block = {
  slug: "textSplit",
  interfaceName: "TextSplitBlock",
  labels: { singular: "Texto en dos columnas", plural: "Textos en dos columnas" },
  admin: { group: "Contenido" },
  fields: [
    variant(TEXT_SPLIT_RATIOS, {
      name: "ratio",
      label: "Proporción de columnas",
      description: "También ajusta el tamaño del texto y el espaciado de la sección.",
    }),
    variant(TEXT_SPLIT_ACCENTS, { name: "accent", label: "Acento" }),
    variant(TEXT_SPLIT_HEADING_SIZES, { name: "headingSize", label: "Tamaño del título" }),
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    richText("body", "Texto", { required: true }),
    link({
      label: "Enlace (opcional)",
      description: "Se muestra subrayado, con una flecha, debajo del texto.",
    }),
    sectionSettings({ tones: ["bg", "surface"], defaultTone: "bg" }),
  ],
};
