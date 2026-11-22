import type { Block } from "payload";
import { array, headline, sectionSettings, text, variant } from "../../payload/fields";

export const NUMBERED_LIST_VARIANTS = [
  { value: "stacked", label: "Header on top, mustard numbers" },
  { value: "sidebar", label: "Header on the left with mustard bar, faint numbers" },
] as const;

/** Numbered list: a section header and an ordered list numbered 01, 02, 03… */
export const NumberedListBlock: Block = {
  slug: "numberedList",
  interfaceName: "NumberedListBlock",
  labels: { singular: "Numbered list", plural: "Numbered lists" },
  admin: { group: "Content" },
  fields: [
    variant(NUMBERED_LIST_VARIANTS, {
      description: "Numbering (01, 02, 03…) is generated automatically from the order.",
    }),
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    array("items", "Items", "Item", [text("text", "Text", { required: true, textarea: true })], {
      minRows: 1,
      required: true,
    }),
    sectionSettings(),
  ],
};
