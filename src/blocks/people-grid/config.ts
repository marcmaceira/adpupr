import type { Block, Condition } from "payload";
import {
  array,
  sectionHeader,
  sectionSettings,
  showWhen,
  text,
  variant,
  variantIs,
} from "../../payload/fields";

export const PEOPLE_GRID_VARIANTS = [
  {
    value: "bioOverlay",
    label: "Tarjetas con biografía (Junta Directiva: fondo gris claro, se abren al pulsar)",
  },
  {
    value: "portrait",
    label: "Retratos (Junta Fundadora: fondo gris, nombre sobre la foto)",
  },
] as const;

type PeopleGridVariant = (typeof PEOPLE_GRID_VARIANTS)[number]["value"];
const when = (...variants: PeopleGridVariant[]) => variantIs(...variants);

/**
 * For fields nested in the `labels` group: `variantIs` reads the sibling data, which inside
 * a group is the group itself, so read the enclosing block's variant instead.
 */
const blockIsBioOverlay: Condition = (_, __, { blockData }) => blockData?.variant === "bioOverlay";

const NAME_TOKEN_HELP = "{nombre} se reemplaza por el nombre de cada persona.";

/**
 * People grid: a section header plus an ordered list of people with a role per placement.
 * People come from the Personas collection, so a portrait or biography is edited once.
 */
export const PeopleGridBlock: Block = {
  slug: "peopleGrid",
  interfaceName: "PeopleGridBlock",
  labels: { singular: "Grupo de personas", plural: "Grupos de personas" },
  admin: { group: "Personas y comités" },
  fields: [
    variant(PEOPLE_GRID_VARIANTS, {
      description:
        "Tarjetas con biografía: encabezado a dos columnas; en pantallas grandes 4 tarjetas por fila y la última fila centrada. Retratos: encabezado apilado; 2, 3 o 4 retratos por fila.",
    }),
    ...sectionHeader({ intro: true }),
    array(
      "members",
      "Personas",
      "Persona",
      [
        {
          name: "person",
          type: "relationship",
          relationTo: "people",
          label: "Persona",
          required: true,
        },
        {
          type: "row",
          fields: [
            text("role", "Cargo en esta sección", { required: true }),
            text("displayName", "Nombre a mostrar (opcional)", {
              description:
                "Déjalo vacío para usar el nombre de Personas. Si lo llenas, reemplaza el nombre solo en esta sección (cambiarlo en Personas no lo actualiza aquí).",
            }),
          ],
        },
      ],
      {
        minRows: 1,
        required: true,
        description: "En el orden en que se muestran. El cargo es propio de esta sección.",
      },
    ),
    {
      name: "labels",
      type: "group",
      label: "Textos de la interfaz",
      admin: {
        description: "Textos de botones y lectores de pantalla. " + NAME_TOKEN_HELP,
      },
      fields: [
        text("portraitAlt", "Texto alternativo del retrato", {
          required: true,
          description: "Por ejemplo: Retrato de {nombre}",
        }),
        showWhen(
          text("open", "Texto del pie de la tarjeta", {
            required: true,
            description: "Por ejemplo: Ver biografía",
          }),
          blockIsBioOverlay,
        ),
        showWhen(
          text("openAria", "Botón para abrir (lector de pantalla)", {
            required: true,
            description: "Por ejemplo: Ver biografía de {nombre}",
          }),
          blockIsBioOverlay,
        ),
        showWhen(
          text("bioAria", "Panel de biografía (lector de pantalla)", {
            required: true,
            description: "Por ejemplo: Biografía de {nombre}",
          }),
          blockIsBioOverlay,
        ),
        showWhen(
          text("closeAria", "Botón para cerrar (lector de pantalla)", {
            required: true,
            description: "Por ejemplo: Cerrar biografía de {nombre}",
          }),
          blockIsBioOverlay,
        ),
      ],
    },
    showWhen(
      {
        name: "showBios",
        type: "checkbox",
        label: "Mostrar biografías al pasar el cursor o pulsar el nombre",
        defaultValue: false,
        admin: {
          description:
            "Desactivado: solo retrato, cargo y nombre (como la Junta Fundadora actual).",
        },
      },
      when("portrait"),
    ),
    sectionSettings(),
  ],
};
