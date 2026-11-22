import type { Block } from "payload";
import { array, headline, sectionSettings, text } from "../../payload/fields";

/**
 * Numbered grid: a split header and a joined grid of numbered themes, each with a
 * prefixed number ("EJE 01"), a title and a description with a bold lead-in.
 */
export const NumberedGridBlock: Block = {
  slug: "numberedGrid",
  interfaceName: "NumberedGridBlock",
  labels: { singular: "Cuadrícula numerada", plural: "Cuadrículas numeradas" },
  admin: { group: "Conferencia" },
  fields: [
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    text("intro", "Introducción", {
      textarea: true,
      description: "Se muestra a la derecha del título.",
    }),
    {
      type: "row",
      fields: [
        {
          name: "numberPrefix",
          type: "text",
          label: "Prefijo del número",
          admin: { width: "50%", description: "Por ejemplo: EJE (se muestra «EJE 01»)." },
        },
        {
          name: "leadIn",
          type: "text",
          label: "Entrada en negrita",
          admin: {
            width: "50%",
            description: "Va antes de cada descripción. Por ejemplo: Enfoque:",
          },
        },
      ],
    },
    array(
      "items",
      "Elementos",
      "Elemento",
      [
        {
          type: "row",
          fields: [
            {
              name: "number",
              type: "text",
              label: "Número (por ejemplo: 01)",
              required: true,
              admin: { width: "30%" },
            },
            {
              name: "title",
              type: "text",
              label: "Título",
              required: true,
              admin: { width: "70%" },
            },
          ],
        },
        text("description", "Descripción", { textarea: true }),
      ],
      { minRows: 1 },
    ),
    sectionSettings(),
  ],
};
