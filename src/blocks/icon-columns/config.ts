import type { Block } from "payload";
import { array, headline, icon, sectionSettings, text } from "../../payload/fields";

/**
 * Icon columns: a split header (heading left, introduction right), two columns with an
 * icon, title, text and status label, and a footnote bar with an icon.
 */
export const IconColumnsBlock: Block = {
  slug: "iconColumns",
  interfaceName: "IconColumnsBlock",
  labels: { singular: "Icon columns", plural: "Icon columns" },
  admin: { group: "Content" },
  fields: [
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    text("intro", "Intro", { textarea: true }),
    array(
      "columns",
      "Columns",
      "Column",
      [
        icon("icon", "Icon"),
        text("title", "Heading", { required: true }),
        text("text", "Text", { textarea: true }),
        text("status", "Status label", {
          description: "For example: Archivo en preparación.",
        }),
      ],
      { minRows: 1, maxRows: 2, required: true },
    ),
    {
      name: "note",
      type: "group",
      label: "Footnote",
      fields: [icon("icon", "Icon"), text("text", "Text", { textarea: true })],
    },
    sectionSettings(),
  ],
};
