import type { Block } from "payload";
import { array, headline, icon, sectionSettings, text } from "../../payload/fields";

/**
 * Icon columns: a split header (heading left, introduction right), two columns with an
 * icon, title, text and status label, and a footnote bar with an icon.
 */
export const IconColumnsBlock: Block = {
  slug: "iconColumns",
  interfaceName: "IconColumnsBlock",
  labels: { singular: "Columnas con ícono", plural: "Columnas con ícono" },
  admin: { group: "Contenido" },
  fields: [
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    text("intro", "Introducción", { textarea: true }),
    array(
      "columns",
      "Columnas",
      "Columna",
      [
        icon("icon", "Ícono"),
        text("title", "Título", { required: true }),
        text("text", "Texto", { textarea: true }),
        text("status", "Etiqueta de estado", {
          description: "Por ejemplo: Archivo en preparación.",
        }),
      ],
      { minRows: 1, maxRows: 2, required: true },
    ),
    {
      name: "note",
      type: "group",
      label: "Nota al pie",
      fields: [icon("icon", "Ícono"), text("text", "Texto", { textarea: true })],
    },
    sectionSettings(),
  ],
};
