import type { Block } from "payload";
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

export const CTA_BAND_VARIANTS = [
  { value: "primary", label: "Blue with rings (event details and two buttons)" },
  { value: "mustard", label: "Mustard (one button)" },
  { value: "mustardIcon", label: "Mustard with circular icon (call for papers)" },
  { value: "navy", label: "Dark blue (one mustard button)" },
] as const;

type CtaBandVariant = (typeof CTA_BAND_VARIANTS)[number]["value"];
const when = (...variants: CtaBandVariant[]) => variantIs(...variants);

const [headingField, highlightField] = headline("heading", "Heading", { highlight: true });

/**
 * Call-to-action band: a full-width strip with a short message and one or two buttons.
 * Four named variants reproduce the existing bands (home conference, home membership,
 * resources call for papers, conference registration step 2).
 */
export const CtaBandBlock: Block = {
  slug: "ctaBand",
  interfaceName: "CtaBandBlock",
  labels: { singular: "Button band", plural: "Button bands" },
  admin: { group: "Headers and bands" },
  fields: [
    variant(CTA_BAND_VARIANTS, {
      description:
        "Each variant reproduces an existing band on the site, with its color and design.",
    }),
    showWhen({ ...icon("icon", "Circle icon"), defaultValue: "send" }, when("mustardIcon")),
    text("eyebrow", "Eyebrow", {
      description: "Short uppercase text shown above the heading. Optional.",
    }),
    ...(headingField ? [headingField] : []),
    ...(highlightField ? [showWhen(highlightField, when("primary"))] : []),
    text("body", "Text", { textarea: true }),
    showWhen(
      array(
        "meta",
        "Event details",
        "Detail",
        [
          {
            type: "row",
            fields: [
              { ...icon("icon", "Icon"), admin: { width: "40%" } },
              {
                name: "text",
                type: "text",
                label: "Text",
                required: true,
                admin: { width: "60%" },
              },
            ],
          },
        ],
        {
          maxRows: 4,
          description:
            "Row of details under the text (date, place, format). Without an icon, a dot (·) is shown.",
        },
      ),
      when("primary"),
    ),
    link({ name: "primaryAction", label: "Primary button", required: true }),
    showWhen(
      link({ name: "secondaryAction", label: "Secondary button (optional)" }),
      when("primary"),
    ),
    sectionSettings(),
  ],
};
