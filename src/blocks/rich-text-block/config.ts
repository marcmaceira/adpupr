import type { Block } from "payload";
import { headline, richText, sectionSettings, text } from "../../payload/fields";

/**
 * Free text: eyebrow, heading and rich text in the house style, for new pages. Standard
 * section spacing and a comfortable reading width.
 */
export const RichTextBlockBlock: Block = {
  slug: "richTextBlock",
  interfaceName: "RichTextBlock",
  labels: { singular: "Texto libre", plural: "Textos libres" },
  admin: { group: "Contenido" },
  fields: [
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título", { required: false }),
    richText("body", "Texto", { required: true }),
    sectionSettings({ tones: ["bg", "surface"], defaultTone: "bg" }),
  ],
};
