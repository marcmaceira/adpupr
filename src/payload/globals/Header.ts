import type { Condition, GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { withRowLabel } from "./row-label";
import { array, link, media, showWhen, text } from "../fields";

const isLink: Condition = (_, siblingData) => siblingData?.type !== "dropdown";
const isDropdown: Condition = (_, siblingData) => siblingData?.type === "dropdown";

/** Site header: logo, main navigation (links and dropdowns), call to action and aria labels. */
export const Header: GlobalConfig = {
  slug: "header",
  label: "Encabezado",
  admin: {
    group: "Configuración",
    description:
      "Logotipo, menú de navegación y botón principal que aparecen arriba en todas las páginas.",
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 25 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Navegación",
          fields: [
            media("logo", "Logotipo", {
              required: true,
              description:
                "Se muestra a 40 px de alto. El texto alternativo se edita en el archivo de Medios.",
            }),
            text("homeAriaLabel", "Descripción del enlace del logotipo", {
              required: true,
              description:
                "Lo anuncian los lectores de pantalla al enfocar el logotipo, que lleva a Inicio.",
            }),
            withRowLabel(
              array(
                "navItems",
                "Menú de navegación",
                "Elemento",
                [
                  {
                    name: "type",
                    type: "radio",
                    label: "Tipo",
                    defaultValue: "link",
                    options: [
                      { label: "Enlace", value: "link" },
                      { label: "Menú desplegable", value: "dropdown" },
                    ],
                    admin: { layout: "horizontal" },
                  },
                  showWhen(link({ required: true }), isLink),
                  showWhen(
                    text("label", "Texto del menú", {
                      required: true,
                      description: "El botón que abre el menú desplegable, por ejemplo «Nosotros».",
                    }),
                    isDropdown,
                  ),
                  showWhen(
                    withRowLabel(
                      array(
                        "children",
                        "Enlaces del menú desplegable",
                        "Enlace",
                        [link({ required: true })],
                        {
                          minRows: 1,
                          description:
                            "El elemento se marca como activo cuando la página actual está dentro de alguna de estas rutas.",
                        },
                      ),
                    ),
                    isDropdown,
                  ),
                ],
                {
                  minRows: 1,
                  description:
                    "En el orden en que aparecen. Arrastra los elementos para cambiar el orden.",
                },
              ),
            ),
            link({ name: "cta", label: "Botón principal", required: true }),
          ],
        },
        {
          name: "a11y",
          label: "Accesibilidad",
          description: "Textos que solo anuncian los lectores de pantalla.",
          fields: [
            text("navLabel", "Nombre del menú principal", { required: true }),
            text("mobileNavLabel", "Nombre del menú móvil", { required: true }),
            {
              type: "row",
              fields: [
                text("openMenuLabel", "Botón para abrir el menú móvil", { required: true }),
                text("closeMenuLabel", "Botón para cerrar el menú móvil", { required: true }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
