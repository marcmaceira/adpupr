import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { withRowLabel } from "./row-label";
import { array, link, media, text } from "../fields";

/**
 * Site footer. Social profiles, the postal address and the emails come from
 * Configuración del sitio, so they are edited in one place.
 */
export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Pie de página",
  admin: {
    group: "Configuración",
    description:
      "Contenido del pie de página. Las redes sociales, la dirección y los correos se editan en «Configuración del sitio».",
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 25 },
  fields: [
    media("logo", "Logotipo", {
      required: true,
      description:
        "Versión clara para fondo oscuro, a 120 px de alto. El texto alternativo se edita en el archivo de Medios.",
    }),
    text("blurb", "Descripción breve", { required: true, textarea: true }),
    withRowLabel(
      array(
        "columns",
        "Columnas de enlaces",
        "Columna",
        [
          text("heading", "Título de la columna", { required: true }),
          withRowLabel(
            array("links", "Enlaces", "Enlace", [link({ required: true })], { minRows: 1 }),
          ),
        ],
        { maxRows: 3, description: "Hasta tres columnas, en el orden en que aparecen." },
      ),
    ),
    {
      type: "row",
      fields: [
        text("addressLabel", "Título de la dirección", {
          required: true,
          description: "La dirección se toma de «Configuración del sitio».",
        }),
        text("emailLabel", "Título de los correos", {
          required: true,
          description: "Los correos se toman de «Configuración del sitio».",
        }),
      ],
    },
    {
      type: "row",
      fields: [
        text("copyright", "Derechos de autor", {
          required: true,
          description: "Escribe {year} donde debe aparecer el año actual.",
        }),
        text("location", "Ubicación", { required: true }),
      ],
    },
  ],
};
