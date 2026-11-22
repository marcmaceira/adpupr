import type { Block, Condition } from "payload";
import {
  array,
  headline,
  icon,
  link,
  sectionSettings,
  showWhen,
  text,
  variant,
  variantIs,
} from "../../payload/fields";

export const FEATURE_CARDS_LAYOUTS = [
  {
    value: "separate",
    label: "Separate cards (with header, icon and link)",
  },
  { value: "joined", label: "Joined panels (no header)" },
] as const;

/** Item fields that only the separate-card layout shows. */
const isSeparate: Condition = (_, __, { blockData }) =>
  Reflect.get(blockData ?? {}, "variant") === "separate";

/**
 * Feature cards: two or more light or dark cards side by side. The tone of each card is
 * chosen on the card itself.
 */
export const FeatureCardsBlock: Block = {
  slug: "featureCards",
  interfaceName: "FeatureCardsBlock",
  labels: { singular: "Feature cards", plural: "Feature cards" },
  admin: { group: "Content" },
  fields: [
    variant(FEATURE_CARDS_LAYOUTS, {
      label: "Layout",
      description: "Joined panels show each panel's heading in a large size.",
    }),
    showWhen(text("eyebrow", "Eyebrow"), variantIs("separate")),
    ...headline("heading", "Heading", { required: false }).map((field) =>
      showWhen(field, variantIs("separate")),
    ),
    array(
      "items",
      "Cards",
      "Card",
      [
        {
          name: "tone",
          type: "select",
          label: "Card color",
          required: true,
          defaultValue: "light",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark (blue)", value: "dark" },
          ],
        },
        showWhen(icon("icon", "Icon"), isSeparate),
        text("eyebrow", "Eyebrow"),
        text("title", "Heading", { required: true }),
        text("text", "Text", { required: true, textarea: true }),
        showWhen(link({ label: "Link" }), isSeparate),
      ],
      { minRows: 1, maxRows: 4, required: true },
    ),
    sectionSettings({ tones: ["bg", "surface2"], defaultTone: "bg" }),
  ],
};
