import type { Block } from "payload";
import { array, headline, icon, richText, sectionSettings, text } from "../../payload/fields";

/**
 * Event benefits: the dark section listing what registration includes, with a highlighted
 * figure on the left (for example continuing-education hours) and a footnote.
 */
export const EventBenefitsBlock: Block = {
  slug: "eventBenefits",
  interfaceName: "EventBenefitsBlock",
  labels: { singular: "Beneficios del evento", plural: "Beneficios del evento" },
  admin: { group: "Conferencia" },
  fields: [
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    {
      name: "callout",
      type: "group",
      label: "Cifra destacada",
      fields: [
        text("label", "Etiqueta (por ejemplo: Educación continua)"),
        {
          type: "row",
          fields: [
            {
              name: "srPrefix",
              type: "text",
              label: "Prefijo para lectores de pantalla",
              admin: {
                width: "40%",
                description: "No se ve; se lee antes de la cifra. Por ejemplo: Hasta",
              },
            },
            {
              name: "value",
              type: "text",
              label: "Cifra",
              admin: { width: "60%", description: "Por ejemplo: 8.5 h" },
            },
          ],
        },
        text("note", "Nota", { textarea: true }),
      ],
    },
    array(
      "benefits",
      "Beneficios",
      "Beneficio",
      [
        icon("icon", "Ícono", { required: true }),
        text("title", "Beneficio", { required: true }),
        text("detail", "Detalle", { textarea: true }),
      ],
      { minRows: 1 },
    ),
    richText("footnote", "Nota al pie", {
      description: "El texto en negrita se muestra en mostaza.",
    }),
    sectionSettings(),
  ],
};
