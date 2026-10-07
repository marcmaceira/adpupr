import type { Block } from "payload";
import {
  anchorField,
  backgroundField,
  buttonsField,
  eyebrowField,
  headingField,
  iconField,
  INLINE_FORMAT_DESCRIPTION,
  linkGroup,
} from "@/fields";

export const CtaBand: Block = {
  slug: "ctaBand",
  interfaceName: "CtaBandBlock",
  labels: {
    singular: "Franja de llamada a la acci\u00F3n",
    plural: "Franjas de llamada a la acci\u00F3n",
  },
  fields: [
    {
      name: "style",
      type: "select",
      label: "Color",
      defaultValue: "mustard",
      options: [
        { label: "Amarillo", value: "mustard" },
        { label: "Azul con aros decorativos", value: "navy" },
        { label: "Azul oscuro", value: "navy-deep" },
      ],
    },
    {
      ...iconField(),
      admin: { description: "Opcional. Se muestra en un c\u00EDrculo a la izquierda." },
    },
    eyebrowField,
    { ...headingField, required: true },
    {
      name: "highlight",
      type: "text",
      label: "Palabra destacada",
      admin: {
        description: "Parte del t\u00EDtulo que se muestra en amarillo (solo en fondos azules).",
      },
    },
    { name: "description", type: "textarea", label: "Descripci\u00F3n" },
    {
      name: "meta",
      type: "group",
      label: "Datos del evento (opcional)",
      fields: [
        {
          type: "row",
          fields: [
            { name: "date", type: "text", label: "Fecha" },
            { name: "location", type: "text", label: "Lugar" },
            { name: "format", type: "text", label: "Modalidad" },
          ],
        },
      ],
    },
    buttonsField(),
    anchorField,
  ],
};

export const CardGrid: Block = {
  slug: "cardGrid",
  interfaceName: "CardGridBlock",
  labels: { singular: "Tarjetas", plural: "Tarjetas" },
  fields: [
    backgroundField("bg"),
    {
      name: "style",
      type: "select",
      label: "Estilo",
      defaultValue: "cards",
      options: [
        { label: "Tarjetas grandes con enlace", value: "cards" },
        { label: "Columnas sencillas", value: "columns" },
      ],
    },
    eyebrowField,
    { ...headingField, required: true },
    { name: "intro", type: "textarea", label: "Introducci\u00F3n" },
    {
      name: "cards",
      type: "array",
      label: "Tarjetas",
      labels: { singular: "Tarjeta", plural: "Tarjetas" },
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        iconField(),
        eyebrowField,
        { name: "title", type: "text", label: "T\u00EDtulo", required: true },
        { name: "description", type: "textarea", label: "Descripci\u00F3n" },
        linkGroup("link", "Enlace (opcional)", { required: false }),
        {
          name: "status",
          type: "text",
          label: "Estado",
          admin: {
            description:
              "Opcional. Etiqueta peque\u00F1a al final (p. ej. «Archivo en preparaci\u00F3n»).",
          },
        },
        {
          name: "dark",
          type: "checkbox",
          label: "Fondo azul",
          admin: { description: "Solo para el estilo de tarjetas grandes." },
        },
      ],
    },
    {
      name: "note",
      type: "text",
      label: "Nota al pie",
      admin: { description: "Opcional. Aparece en una franja azul clara bajo las tarjetas." },
    },
    anchorField,
  ],
};

export const NumberedGrid: Block = {
  slug: "numberedGrid",
  interfaceName: "NumberedGridBlock",
  labels: { singular: "Tarjetas numeradas", plural: "Tarjetas numeradas" },
  fields: [
    backgroundField("surface"),
    eyebrowField,
    { ...headingField, required: true },
    { name: "intro", type: "textarea", label: "Introducci\u00F3n" },
    {
      type: "row",
      fields: [
        {
          name: "numberPrefix",
          type: "text",
          label: "Prefijo del n\u00FAmero",
          defaultValue: "Eje",
          admin: { description: "Se muestra antes del n\u00FAmero (p. ej. EJE 01)." },
        },
        {
          name: "descriptionPrefix",
          type: "text",
          label: "Prefijo de la descripci\u00F3n",
          admin: { description: "Opcional, en negritas (p. ej. «Enfoque:»)." },
        },
      ],
    },
    {
      name: "items",
      type: "array",
      label: "Tarjetas",
      labels: { singular: "Tarjeta", plural: "Tarjetas" },
      minRows: 1,
      fields: [
        { name: "title", type: "text", label: "T\u00EDtulo", required: true },
        { name: "description", type: "textarea", label: "Descripci\u00F3n", required: true },
      ],
    },
    anchorField,
  ],
};

export const IconList: Block = {
  slug: "iconList",
  interfaceName: "IconListBlock",
  labels: { singular: "Lista con \u00EDconos", plural: "Listas con \u00EDconos" },
  fields: [
    backgroundField("bg"),
    eyebrowField,
    { ...headingField, required: true },
    {
      name: "items",
      type: "array",
      label: "Elementos",
      labels: { singular: "Elemento", plural: "Elementos" },
      minRows: 1,
      fields: [
        iconField(),
        { name: "title", type: "text", label: "T\u00EDtulo" },
        {
          name: "text",
          type: "textarea",
          label: "Texto",
          required: true,
          admin: { description: INLINE_FORMAT_DESCRIPTION },
        },
        { name: "emphasis", type: "checkbox", label: "Resaltar el texto" },
      ],
    },
    anchorField,
  ],
};
