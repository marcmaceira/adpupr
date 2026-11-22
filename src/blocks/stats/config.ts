import type { Block, Condition } from "payload";
import { array, sectionSettings, showWhen, text, variant, variantIs } from "../../payload/fields";

export const STATS_VARIANTS = [
  { value: "band", label: "Banda celeste (cifras grandes, sin título)" },
  { value: "tiles", label: "Mosaico oscuro con título (hitos)" },
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
  labels: { singular: "Cifras destacadas", plural: "Cifras destacadas" },
  admin: { group: "Encabezados y bandas" },
  fields: [
    variant(STATS_VARIANTS, {
      description: "Cada variante reproduce una sección de cifras existente del sitio.",
    }),
    showWhen(
      text("eyebrow", "Antetítulo", {
        description: "Texto corto en mayúsculas que aparece sobre el título.",
      }),
      when("tiles"),
    ),
    {
      name: "heading",
      type: "text",
      label: "Título",
      admin: { condition: when("tiles") },
      validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) =>
        siblingData.variant !== "tiles" || (typeof value === "string" && value.trim() !== "")
          ? true
          : "Escribe el título de la sección.",
    },
    array(
      "items",
      "Cifras",
      "Cifra",
      [
        {
          type: "row",
          fields: [
            {
              name: "value",
              type: "text",
              label: "Cifra",
              required: true,
              admin: { width: "30%", description: "Por ejemplo: 50 o 2023" },
            },
            {
              name: "suffix",
              type: "text",
              label: "Sufijo",
              admin: {
                width: "20%",
                description: "Opcional, por ejemplo: +",
                condition: blockIs("band"),
              },
            },
            {
              name: "label",
              type: "text",
              label: "Descripción",
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
        description: "La banda celeste muestra dos cifras por fila; el mosaico, hasta cuatro.",
      },
    ),
    sectionSettings(),
  ],
};
