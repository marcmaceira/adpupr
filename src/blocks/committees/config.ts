import type { Block, Condition } from "payload";
import { sectionHeader, sectionSettings, showWhen, text } from "../../payload/fields";

const isSelected: Condition = (_, siblingData) => siblingData?.selection === "selected";

/**
 * Committees: split section header, a jump card per committee and each committee's full
 * detail (functions, editorial board, coordinator). Records come from the Comités collection.
 */
export const CommitteesBlock: Block = {
  slug: "committees",
  interfaceName: "CommitteesBlock",
  labels: { singular: "Comités de trabajo", plural: "Comités de trabajo" },
  admin: { group: "Personas y comités" },
  fields: [
    ...sectionHeader({ intro: true }),
    {
      name: "selection",
      type: "radio",
      label: "Comités a mostrar",
      required: true,
      defaultValue: "all",
      options: [
        { label: "Todos, en el orden de la colección", value: "all" },
        { label: "Elegir comités", value: "selected" },
      ],
      admin: { layout: "horizontal" },
    },
    showWhen(
      {
        name: "committees",
        type: "relationship",
        relationTo: "committees",
        hasMany: true,
        label: "Comités",
        admin: { description: "Se muestran en el orden elegido aquí." },
        validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
          siblingData.selection !== "selected" || (Array.isArray(value) && value.length > 0)
            ? true
            : "Elige al menos un comité.",
      },
      isSelected,
    ),
    {
      name: "labels",
      type: "group",
      label: "Textos de la interfaz",
      admin: { description: "{nombre} se reemplaza por el nombre del comité o de la persona." },
      fields: [
        text("navAria", "Índice de comités (lector de pantalla)", {
          required: true,
          description: "Por ejemplo: Comités de trabajo",
        }),
        {
          type: "row",
          fields: [
            text("committeeEyebrow", "Antetítulo de cada comité", {
              required: true,
              description: "Por ejemplo: Comité de trabajo",
            }),
            text("committeeHeading", "Título de cada comité", {
              required: true,
              description: "Por ejemplo: Comité de {nombre}",
            }),
          ],
        },
        {
          type: "row",
          fields: [
            text("coordinator", "Etiqueta de coordinación", {
              required: true,
              description: "Por ejemplo: Coordinación",
            }),
            text("portraitAlt", "Texto alternativo del retrato", {
              required: true,
              description: "Por ejemplo: Retrato de {nombre}",
            }),
          ],
        },
        {
          type: "row",
          fields: [
            text("members", "Título de integrantes", {
              required: true,
              description: "Por ejemplo: Integrantes",
            }),
            text("responsibilities", "Título de responsabilidades", {
              required: true,
              description: "Por ejemplo: Responsabilidades",
            }),
          ],
        },
      ],
    },
    sectionSettings(),
  ],
};
