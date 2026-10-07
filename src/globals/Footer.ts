import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { linkFields } from "@/fields";
import { revalidateGlobal } from "@/hooks/revalidate";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Pie de p\u00E1gina",
  admin: {
    group: "Navegaci\u00F3n",
    description:
      "La direcci\u00F3n, los correos y las redes sociales se editan en Ajustes del sitio.",
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 20 },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    { name: "description", type: "textarea", label: "Descripci\u00F3n bajo el logo" },
    {
      name: "columns",
      type: "array",
      label: "Columnas de enlaces",
      labels: { singular: "Columna", plural: "Columnas" },
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: "heading", type: "text", label: "T\u00EDtulo", required: true },
        {
          name: "links",
          type: "array",
          label: "Enlaces",
          labels: { singular: "Enlace", plural: "Enlaces" },
          fields: linkFields(),
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "copyright",
          type: "text",
          label: "Texto de derechos",
          defaultValue: "ADPUPR · Todos los derechos reservados",
          admin: { description: "El a\u00F1o actual se agrega autom\u00E1ticamente al inicio." },
        },
        {
          name: "location",
          type: "text",
          label: "Ubicaci\u00F3n",
          defaultValue: "San Juan, Puerto Rico",
        },
      ],
    },
  ],
};
