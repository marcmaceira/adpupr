import type { Block } from "payload";
import { headline, richText, sectionSettings, text } from "../../payload/fields";

/**
 * Free text: eyebrow, heading and rich text in the house style, for new pages. Standard
 * section spacing and a comfortable reading width.
 */
export const RichTextBlockBlock: Block = {
  slug: "richTextBlock",
  interfaceName: "RichTextBlock",
  labels: { singular: "Free text", plural: "Free text" },
  admin: { group: "Content" },
  fields: [
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading", { required: false }),
    richText("body", "Text", { required: true }),
    sectionSettings({ tones: ["bg", "surface"], defaultTone: "bg" }),
  ],
};
