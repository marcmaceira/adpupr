import type { Block } from "payload";
import { array, headline, sectionSettings, text, variant } from "../../payload/fields";

export const NUMBERED_LIST_VARIANTS = [
  { value: "stacked", label: "Encabezado arriba, números mostaza" },
  { value: "sidebar", label: "Encabezado a la izquierda con barra mostaza, números tenues" },
] as const;

/** Numbered list: a section header and an ordered list numbered 01, 02, 03… */
export const NumberedListBlock: Block = {
  slug: "numberedList",
  interfaceName: "NumberedListBlock",
  labels: { singular: "Lista numerada", plural: "Listas numeradas" },
  admin: { group: "Contenido" },
  fields: [
    variant(NUMBERED_LIST_VARIANTS, {
      description: "La numeración (01, 02, 03…) se genera sola según el orden.",
    }),
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    array(
      "items",
      "Elementos",
      "Elemento",
      [text("text", "Texto", { required: true, textarea: true })],
      {
        minRows: 1,
        required: true,
      },
    ),
    sectionSettings(),
  ],
};
