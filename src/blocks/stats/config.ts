import type { Block, Condition } from "payload";
import { array, sectionSettings, showWhen, text, variant, variantIs } from "../../payload/fields";

export const STATS_VARIANTS = [
  { value: "band", label: "Light blue band (large figures, no heading)" },
  { value: "tiles", label: "Dark tiles with heading (milestones)" },
] as const;

type StatsVariant = (typeof STATS_VARIANTS)[number]["value"];
const when = (...variants: StatsVariant[]) => variantIs(...variants);

/** Condition for fields inside the items array: reads the enclosing block's variant. */
const blockIs =
  (...variants: StatsVariant[]): Condition =>
  (_, __, { blockData }) =>
    variants.some((v) => v === blockData?.variant);

/**
 * Stats: headline figures. `band` is the light strip under the home hero; `tiles` is the
 * dark milestones section with its own heading.
 */
export const StatsBlock: Block = {
  slug: "stats",
  interfaceName: "StatsBlock",
  labels: { singular: "Key figures", plural: "Key figures" },
  admin: { group: "Headers and bands" },
  fields: [
    variant(STATS_VARIANTS, {
      description: "Each variant reproduces an existing figures section on the site.",
    }),
    showWhen(
      text("eyebrow", "Eyebrow", {
        description: "Short uppercase text shown above the heading.",
      }),
      when("tiles"),
    ),
    {
      name: "heading",
      type: "text",
      label: "Heading",
      admin: { condition: when("tiles") },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
        siblingData.variant !== "tiles" || (typeof value === "string" && value.trim() !== "")
          ? true
          : "Enter the section heading.",
    },
    array(
      "items",
      "Figures",
      "Figure",
      [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              label: "Figure",
              required: true,
              admin: { width: "30%", description: "For example: 50 or 2023" },
            },
            {
              name: "suffix",
              type: "text",
              label: "Suffix",
              admin: {
                width: "20%",
                description: "Optional, for example: +",
                condition: blockIs("band"),
              },
            },
            {
              name: "label",
              type: "text",
              label: "Description",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
      ],
      {
        minRows: 1,
        maxRows: 4,
        required: true,
        description: "The light blue band shows two figures per row; the tiles, up to four.",
      },
    ),
    sectionSettings(),
  ],
};
