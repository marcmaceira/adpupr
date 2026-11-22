import type { Block } from "payload";
import {
  array,
  headline,
  link,
  sectionSettings,
  showWhen,
  text,
  variant,
  variantIs,
} from "../../payload/fields";

export const HERO_VARIANTS = [
  { value: "home", label: "Portada de inicio (título grande, dos botones)" },
  { value: "subhead", label: "Encabezado simple (antetítulo, título, texto)" },
  { value: "event", label: "Evento (tema central y fecha destacada)" },
  { value: "resources", label: "Centro de recursos (con índice de secciones)" },
  { value: "structure", label: "Institucional con botones" },
  { value: "history", label: "Institucional con texto amplio" },
  { value: "brief", label: "Institucional breve (solo título)" },
] as const;

type HeroVariant = (typeof HERO_VARIANTS)[number]["value"];
const when = (...variants: HeroVariant[]) => variantIs(...variants);

/**
 * Hero: the dark band that opens every page. One block, seven named variants that
 * reproduce the existing page headers. Fields irrelevant to a variant are hidden.
 */
export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  labels: { singular: "Encabezado de página", plural: "Encabezados de página" },
  admin: { group: "Encabezados y bandas" },
  fields: [
    variant(HERO_VARIANTS, {
      description: "Cada variante reproduce un encabezado existente del sitio.",
    }),
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título", { highlight: true }),
    showWhen(
      text("lede", "Texto introductorio", { textarea: true }),
      when("home", "subhead", "resources", "structure", "history"),
    ),
    {
      name: "themeBox",
      type: "group",
      label: "Tema central",
      admin: { condition: when("event") },
      fields: [text("label", "Etiqueta"), text("text", "Tema", { textarea: true })],
    },
    {
      name: "eventDate",
      type: "group",
      label: "Fecha destacada",
      admin: { condition: when("event") },
      fields: [
        {
          type: "row",
          fields: [
            text("day", "Día (por ejemplo 02)"),
            text("monthYear", "Mes y año", {
              textarea: true,
              description: "Cada línea se muestra en su propia línea.",
            }),
          ],
        },
        text("caption", "Detalle (día de la semana y lugar)"),
      ],
    },
    showWhen(
      array(
        "actions",
        "Botones",
        "Botón",
        [
          link({ required: true }),
          {
            name: "style",
            type: "select",
            label: "Estilo",
            required: true,
            defaultValue: "primary",
            options: [
              { label: "Principal (mostaza)", value: "primary" },
              { label: "Secundario (contorno blanco)", value: "secondary" },
            ],
          },
        ],
        { maxRows: 2 },
      ),
      when("home", "structure"),
    ),
    showWhen(
      array("sectionLinks", "Índice de secciones", "Enlace", [link({ required: true })], {
        maxRows: 6,
      }),
      when("resources"),
    ),
    sectionSettings(),
  ],
};
