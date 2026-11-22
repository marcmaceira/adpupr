import type { Block } from "payload";
import { headline, link, richText, sectionSettings, text, variant } from "../../payload/fields";

export const TEXT_SPLIT_RATIOS = [
  { value: "wideLeft", label: "Wide heading on the left (home page)" },
  { value: "fixedLeft", label: "Narrow fixed left column" },
  { value: "narrowLeft", label: "Narrow left column, wide text" },
] as const;

export const TEXT_SPLIT_ACCENTS = [
  { value: "rightRule", label: "Mustard line beside the text" },
  { value: "goldBar", label: "Mustard bar under the heading" },
  { value: "bottomRule", label: "Divider line at the end" },
  { value: "none", label: "No accent" },
] as const;

export const TEXT_SPLIT_HEADING_SIZES = [
  { value: "section", label: "Large (section heading)" },
  { value: "compact", label: "Compact" },
] as const;

/**
 * Text split: eyebrow and heading on the left, rich text (and an optional link) on the
 * right. Column ratio, accent and heading size are named presets taken from the design.
 */
export const TextSplitBlock: Block = {
  slug: "textSplit",
  interfaceName: "TextSplitBlock",
  labels: { singular: "Two-column text", plural: "Two-column text" },
  admin: { group: "Content" },
  fields: [
    variant(TEXT_SPLIT_RATIOS, {
      name: "ratio",
      label: "Column ratio",
      description: "Also adjusts the text size and the section spacing.",
    }),
    variant(TEXT_SPLIT_ACCENTS, { name: "accent", label: "Accent" }),
    variant(TEXT_SPLIT_HEADING_SIZES, { name: "headingSize", label: "Heading size" }),
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    richText("body", "Text", { required: true }),
    link({
      label: "Link (optional)",
      description: "Shown underlined, with an arrow, below the text.",
    }),
    sectionSettings({ tones: ["bg", "surface"], defaultTone: "bg" }),
  ],
};
