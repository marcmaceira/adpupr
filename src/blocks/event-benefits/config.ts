import type { Block } from "payload";
import { array, headline, icon, richText, sectionSettings, text } from "../../payload/fields";

/**
 * Event benefits: the dark section listing what registration includes, with a highlighted
 * figure on the left (for example continuing-education hours) and a footnote.
 */
export const EventBenefitsBlock: Block = {
  slug: "eventBenefits",
  interfaceName: "EventBenefitsBlock",
  labels: { singular: "Event benefits", plural: "Event benefits" },
  admin: { group: "Conference" },
  fields: [
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    {
      name: "callout",
      type: "group",
      label: "Highlighted figure",
      fields: [
        text("label", "Label (for example: Educación continua)"),
        {
          type: "row",
          fields: [
            {
              name: "srPrefix",
              type: "text",
              label: "Screen reader prefix",
              admin: {
                width: "40%",
                description: "Not visible; read before the figure. For example: Hasta",
              },
            },
            {
              name: "value",
              type: "text",
              label: "Figure",
              admin: { width: "60%", description: "For example: 8.5 h" },
            },
          ],
        },
        text("note", "Note", { textarea: true }),
      ],
    },
    array(
      "benefits",
      "Benefits",
      "Benefit",
      [
        icon("icon", "Icon", { required: true }),
        text("title", "Benefit", { required: true }),
        text("detail", "Detail", { textarea: true }),
      ],
      { minRows: 1 },
    ),
    richText("footnote", "Footnote", {
      description: "Bold text is shown in mustard.",
    }),
    sectionSettings(),
  ],
};
