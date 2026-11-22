import type { Block } from "payload";
import { array, headline, sectionSettings, text } from "../../payload/fields";

/**
 * Numbered grid: a split header and a joined grid of numbered themes, each with a
 * prefixed number ("EJE 01"), a title and a description with a bold lead-in.
 */
export const NumberedGridBlock: Block = {
  slug: "numberedGrid",
  interfaceName: "NumberedGridBlock",
  labels: { singular: "Numbered grid", plural: "Numbered grids" },
  admin: { group: "Conference" },
  fields: [
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    text("intro", "Intro", {
      textarea: true,
      description: "Shown to the right of the heading.",
    }),
    {
      type: "row",
      fields: [
        {
          name: "numberPrefix",
          type: "text",
          label: "Number prefix",
          admin: { width: "50%", description: "For example: EJE (shown as «EJE 01»)." },
        },
        {
          name: "leadIn",
          type: "text",
          label: "Bold lead-in",
          admin: {
            width: "50%",
            description: "Goes before each description. For example: Enfoque:",
          },
        },
      ],
    },
    array(
      "items",
      "Items",
      "Item",
      [
        {
          type: "row",
          fields: [
            {
              name: "number",
              type: "text",
              label: "Number (for example: 01)",
              required: true,
              admin: { width: "30%" },
            },
            {
              name: "title",
              type: "text",
              label: "Heading",
              required: true,
              admin: { width: "70%" },
            },
          ],
        },
        text("description", "Description", { textarea: true }),
      ],
      { minRows: 1 },
    ),
    sectionSettings(),
  ],
};
