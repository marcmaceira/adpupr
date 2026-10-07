import type { Block } from "payload";
import { anchorField, buttonsField, eyebrowField } from "@/fields";
import { validateHref } from "@/lib/urls";

export const HomeHero: Block = {
  slug: "homeHero",
  interfaceName: "HomeHeroBlock",
  labels: { singular: "Portada principal", plural: "Portadas principales" },
  fields: [
    eyebrowField,
    {
      name: "heading",
      type: "textarea",
      label: "T\u00EDtulo",
      required: true,
      admin: { description: "Presiona Enter para forzar un salto de l\u00EDnea." },
    },
    {
      name: "highlight",
      type: "text",
      label: "Palabra destacada",
      admin: {
        description: "Parte del t\u00EDtulo que se muestra en amarillo (p. ej. «acci\u00F3n»).",
      },
    },
    { name: "description", type: "textarea", label: "Descripci\u00F3n" },
    buttonsField(),
    anchorField,
  ],
};

export const PageHero: Block = {
  slug: "pageHero",
  interfaceName: "PageHeroBlock",
  labels: { singular: "Encabezado de p\u00E1gina", plural: "Encabezados de p\u00E1gina" },
  fields: [
    eyebrowField,
    { name: "title", type: "text", label: "T\u00EDtulo", required: true },
    {
      name: "titleSize",
      type: "select",
      label: "Tama\u00F1o del t\u00EDtulo",
      defaultValue: "large",
      options: [
        { label: "Grande (t\u00EDtulos cortos)", value: "large" },
        { label: "Mediano (t\u00EDtulos largos)", value: "medium" },
      ],
    },
    { name: "description", type: "textarea", label: "Descripci\u00F3n" },
    buttonsField("buttons", "Botones", 3),
    {
      name: "sideLinks",
      type: "array",
      label: "\u00CDndice lateral",
      labels: { singular: "Enlace", plural: "Enlaces" },
      admin: {
        initCollapsed: true,
        description:
          "Opcional. Lista de enlaces a secciones de la p\u00E1gina, a la derecha del t\u00EDtulo.",
      },
      fields: [
        {
          type: "row",
          fields: [
            { name: "label", type: "text", label: "Texto", required: true },
            {
              name: "url",
              type: "text",
              label: "Direcci\u00F3n",
              required: true,
              validate: validateHref,
            },
          ],
        },
      ],
    },
    anchorField,
  ],
};

export const EventHero: Block = {
  slug: "eventHero",
  interfaceName: "EventHeroBlock",
  labels: { singular: "Encabezado de evento", plural: "Encabezados de evento" },
  fields: [
    eyebrowField,
    { name: "title", type: "text", label: "T\u00EDtulo", required: true },
    {
      type: "row",
      fields: [
        {
          name: "themeLabel",
          type: "text",
          label: "Etiqueta del tema",
          defaultValue: "Tema central",
        },
        { name: "theme", type: "text", label: "Tema" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "dateNumber",
          type: "text",
          label: "D\u00EDa",
          admin: { description: "N\u00FAmero grande en amarillo (p. ej. 02)." },
        },
        {
          name: "dateLabel",
          type: "textarea",
          label: "Mes y a\u00F1o",
          admin: { description: "Usa Enter para separar l\u00EDneas." },
        },
      ],
    },
    { name: "detail", type: "text", label: "Detalle", admin: { description: "D\u00EDa y lugar." } },
    anchorField,
  ],
};
