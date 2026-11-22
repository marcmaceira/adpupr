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
    label: "Tarjetas separadas (con encabezado, ícono y enlace)",
  },
  { value: "joined", label: "Paneles unidos (sin encabezado)" },
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
  labels: { singular: "Tarjetas destacadas", plural: "Tarjetas destacadas" },
  admin: { group: "Contenido" },
  fields: [
    variant(FEATURE_CARDS_LAYOUTS, {
      label: "Diseño",
      description: "Los paneles unidos muestran el título de cada panel en tamaño grande.",
    }),
    showWhen(text("eyebrow", "Antetítulo"), variantIs("separate")),
    ...headline("heading", "Título", { required: false }).map((field) =>
      showWhen(field, variantIs("separate")),
    ),
    array(
      "items",
      "Tarjetas",
      "Tarjeta",
      [
        {
          name: "tone",
          type: "select",
          label: "Color de la tarjeta",
          required: true,
          defaultValue: "light",
          options: [
            { label: "Clara", value: "light" },
            { label: "Oscura (azul)", value: "dark" },
          ],
        },
        showWhen(icon("icon", "Ícono"), isSeparate),
        text("eyebrow", "Antetítulo"),
        text("title", "Título", { required: true }),
        text("text", "Texto", { required: true, textarea: true }),
        showWhen(link({ label: "Enlace" }), isSeparate),
      ],
      { minRows: 1, maxRows: 4, required: true },
    ),
    sectionSettings({ tones: ["bg", "surface2"], defaultTone: "bg" }),
  ],
};
