import type { Block } from "payload";
import { anchorField, backgroundField, eyebrowField, headingField, linkGroup } from "@/fields";

export const Stats: Block = {
  slug: "stats",
  interfaceName: "StatsBlock",
  labels: { singular: "Cifras", plural: "Cifras" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Estilo",
      defaultValue: "band",
      options: [
        { label: "Franja clara (cifras grandes)", value: "band" },
        { label: "Panel oscuro con t\u00EDtulo", value: "panel" },
      ],
    },
    { ...eyebrowField, admin: { condition: (_, siblingData) => siblingData?.variant === "panel" } },
    { ...headingField, admin: { condition: (_, siblingData) => siblingData?.variant === "panel" } },
    {
      name: "items",
      type: "array",
      label: "Cifras",
      labels: { singular: "Cifra", plural: "Cifras" },
      minRows: 1,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              label: "Valor",
              required: true,
              admin: { width: "30%" },
            },
            {
              name: "suffix",
              type: "text",
              label: "Sufijo",
              admin: { width: "20%", description: "p. ej. +" },
            },
            {
              name: "label",
              type: "text",
              label: "Descripci\u00F3n",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
    anchorField,
  ],
};

export const SplitContent: Block = {
  slug: "splitContent",
  interfaceName: "SplitContentBlock",
  labels: { singular: "Texto en dos columnas", plural: "Textos en dos columnas" },
  fields: [
    backgroundField("bg"),
    {
      name: "style",
      type: "select",
      label: "Estilo",
      defaultValue: "border",
      options: [
        { label: "Texto con borde amarillo", value: "border" },
        { label: "L\u00EDnea amarilla bajo el t\u00EDtulo", value: "bar" },
        { label: "Sin adornos", value: "plain" },
      ],
    },
    eyebrowField,
    { ...headingField, required: true },
    { name: "body", type: "richText", label: "Texto", required: true },
    { ...linkGroup("link", "Enlace (opcional)", { required: false }) },
    anchorField,
  ],
};

export const NumberedList: Block = {
  slug: "numberedList",
  interfaceName: "NumberedListBlock",
  labels: { singular: "Lista numerada", plural: "Listas numeradas" },
  fields: [
    backgroundField("bg"),
    {
      name: "layout",
      type: "select",
      label: "Disposici\u00F3n",
      defaultValue: "stacked",
      options: [
        { label: "T\u00EDtulo arriba", value: "stacked" },
        { label: "T\u00EDtulo a la izquierda", value: "split" },
      ],
    },
    eyebrowField,
    { ...headingField, required: true },
    {
      name: "items",
      type: "array",
      label: "Elementos",
      labels: { singular: "Elemento", plural: "Elementos" },
      minRows: 1,
      fields: [{ name: "text", type: "textarea", label: "Texto", required: true }],
    },
    anchorField,
  ],
};

export const FeaturePair: Block = {
  slug: "featurePair",
  interfaceName: "FeaturePairBlock",
  labels: { singular: "Dos tarjetas (misi\u00F3n y visi\u00F3n)", plural: "Dos tarjetas" },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Tarjetas",
      labels: { singular: "Tarjeta", plural: "Tarjetas" },
      minRows: 2,
      maxRows: 2,
      admin: { description: "La primera tarjeta es clara y la segunda azul." },
      fields: [
        eyebrowField,
        { ...headingField, required: true },
        { name: "text", type: "textarea", label: "Texto", required: true },
      ],
    },
    anchorField,
  ],
};

export const Checklist: Block = {
  slug: "checklist",
  interfaceName: "ChecklistBlock",
  labels: { singular: "Lista de beneficios", plural: "Listas de beneficios" },
  fields: [
    backgroundField("surface-2"),
    eyebrowField,
    { ...headingField, required: true },
    {
      name: "items",
      type: "array",
      label: "Elementos",
      labels: { singular: "Elemento", plural: "Elementos" },
      minRows: 1,
      fields: [{ name: "text", type: "textarea", label: "Texto", required: true }],
    },
    anchorField,
  ],
};

export const Content: Block = {
  slug: "content",
  interfaceName: "ContentBlock",
  labels: { singular: "Texto libre", plural: "Textos libres" },
  fields: [
    backgroundField("bg"),
    eyebrowField,
    headingField,
    { name: "body", type: "richText", label: "Texto", required: true },
    anchorField,
  ],
};

export const MediaBlock: Block = {
  slug: "mediaBlock",
  interfaceName: "MediaBlockBlock",
  labels: { singular: "Imagen", plural: "Im\u00E1genes" },
  fields: [
    backgroundField("bg"),
    { name: "image", type: "upload", relationTo: "media", label: "Imagen", required: true },
    { name: "caption", type: "text", label: "Leyenda" },
    anchorField,
  ],
};

export const Video: Block = {
  slug: "video",
  interfaceName: "VideoBlock",
  labels: { singular: "Video de YouTube", plural: "Videos de YouTube" },
  fields: [
    eyebrowField,
    { ...headingField, required: true },
    { name: "description", type: "textarea", label: "Descripci\u00F3n" },
    {
      name: "videoUrl",
      type: "text",
      label: "Enlace del video",
      required: true,
      admin: {
        description: "Pega el enlace de YouTube (p. ej. https://www.youtube.com/watch?v=…).",
      },
    },
    linkGroup("channel", "Bot\u00F3n del canal", { required: false }),
    anchorField,
  ],
};
