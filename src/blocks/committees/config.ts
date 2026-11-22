import type { Block, Condition } from "payload";
import { sectionHeader, sectionSettings, showWhen, text } from "../../payload/fields";

const isSelected: Condition = (_, siblingData) => siblingData?.selection === "selected";

/**
 * Committees: split section header, a jump card per committee and each committee's full
 * detail (functions, editorial board, coordinator). Records come from the Committees collection.
 */
export const CommitteesBlock: Block = {
  slug: "committees",
  interfaceName: "CommitteesBlock",
  labels: { singular: "Working committees", plural: "Working committees" },
  admin: { group: "People and committees" },
  fields: [
    ...sectionHeader({ intro: true }),
    {
      name: "selection",
      type: "radio",
      label: "Committees to show",
      required: true,
      defaultValue: "all",
      options: [
        { label: "All, in collection order", value: "all" },
        { label: "Choose committees", value: "selected" },
      ],
      admin: { layout: "horizontal" },
    },
    showWhen(
      {
        name: "committees",
        type: "relationship",
        relationTo: "committees",
        hasMany: true,
        label: "Committees",
        admin: { description: "Shown in the order chosen here." },
        validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
          siblingData.selection !== "selected" || (Array.isArray(value) && value.length > 0)
            ? true
            : "Choose at least one committee.",
      },
      isSelected,
    ),
    {
      name: "labels",
      type: "group",
      label: "Interface text",
      admin: { description: "{nombre} is replaced with the committee's or the person's name." },
      fields: [
        text("navAria", "Committee index (screen reader)", {
          required: true,
          description: "For example: Comités de trabajo",
        }),
        {
          type: "row",
          fields: [
            text("committeeEyebrow", "Eyebrow for each committee", {
              required: true,
              description: "For example: Comité de trabajo",
            }),
            text("committeeHeading", "Heading for each committee", {
              required: true,
              description: "For example: Comité de {nombre}",
            }),
          ],
        },
        {
          type: "row",
          fields: [
            text("coordinator", "Coordinator label", {
              required: true,
              description: "For example: Coordinación",
            }),
            text("portraitAlt", "Portrait alt text", {
              required: true,
              description: "For example: Retrato de {nombre}",
            }),
          ],
        },
        {
          type: "row",
          fields: [
            text("members", "Members heading", {
              required: true,
              description: "For example: Integrantes",
            }),
            text("responsibilities", "Responsibilities heading", {
              required: true,
              description: "For example: Responsabilidades",
            }),
          ],
        },
      ],
    },
    sectionSettings(),
  ],
};
