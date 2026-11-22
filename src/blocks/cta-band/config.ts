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
  { value: "primary", label: "Azul con anillos (información del evento y dos botones)" },
  { value: "mustard", label: "Mostaza (un botón)" },
  { value: "mustardIcon", label: "Mostaza con ícono circular (convocatoria)" },
  { value: "navy", label: "Azul oscuro (un botón mostaza)" },
] as const;

type CtaBandVariant = (typeof CTA_BAND_VARIANTS)[number]["value"];
const when = (...variants: CtaBandVariant[]) => variantIs(...variants);

const [headingField, highlightField] = headline("heading", "Título", { highlight: true });

/**
 * Call-to-action band: a full-width strip with a short message and one or two buttons.
 * Four named variants reproduce the existing bands (home conference, home membership,
 * resources call for papers, conference registration step 2).
 */
export const CtaBandBlock: Block = {
  slug: "ctaBand",
  interfaceName: "CtaBandBlock",
  labels: { singular: "Banda con botones", plural: "Bandas con botones" },
  admin: { group: "Encabezados y bandas" },
  fields: [
    variant(CTA_BAND_VARIANTS, {
      description: "Cada variante reproduce una banda existente del sitio, con su color y diseño.",
    }),
    showWhen({ ...icon("icon", "Ícono del círculo"), defaultValue: "send" }, when("mustardIcon")),
    text("eyebrow", "Antetítulo", {
      description: "Texto corto en mayúsculas que aparece sobre el título. Opcional.",
    }),
    ...(headingField ? [headingField] : []),
    ...(highlightField ? [showWhen(highlightField, when("primary"))] : []),
    text("body", "Texto", { textarea: true }),
    showWhen(
      array(
        "meta",
        "Datos del evento",
        "Dato",
        [
          {
            type: "row",
            fields: [
              { ...icon("icon", "Ícono"), admin: { width: "40%" } },
              {
                name: "text",
                type: "text",
                label: "Texto",
                required: true,
                admin: { width: "60%" },
              },
            ],
          },
        ],
        {
          maxRows: 4,
          description:
            "Fila de datos bajo el texto (fecha, lugar, modalidad). Sin ícono se muestra un punto (·).",
        },
      ),
      when("primary"),
    ),
    link({ name: "primaryAction", label: "Botón principal", required: true }),
    showWhen(
      link({ name: "secondaryAction", label: "Botón secundario (opcional)" }),
      when("primary"),
    ),
    sectionSettings(),
  ],
};
