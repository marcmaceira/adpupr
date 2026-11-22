import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { array, link, media, text } from "../fields";

/**
 * Facts shown in more than one place live here: organization name, emails, postal address,
 * social profiles, the ATH Móvil payment link and site-wide SEO defaults.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configuración del sitio",
  admin: {
    group: "Configuración",
    description:
      "Datos que aparecen en varias partes del sitio. Cambiarlos aquí los actualiza en todas.",
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 25 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "organization",
          label: "Organización",
          fields: [
            text("name", "Nombre completo", { required: true }),
            text("shortName", "Siglas", { required: true }),
          ],
        },
        {
          name: "contact",
          label: "Contacto",
          fields: [
            array(
              "emails",
              "Correos electrónicos",
              "Correo",
              [{ name: "email", type: "email", label: "Correo", required: true }],
              {
                minRows: 1,
                description: "El primero es el correo principal (formulario de contacto).",
              },
            ),
            {
              name: "postal",
              type: "group",
              label: "Dirección postal",
              fields: [
                {
                  type: "row",
                  fields: [
                    text("line1", "Línea 1", { required: true }),
                    text("city", "Ciudad", { required: true }),
                  ],
                },
                {
                  type: "row",
                  fields: [
                    text("region", "Estado o región", { required: true }),
                    text("postalCode", "Código postal", { required: true }),
                    text("country", "País (código ISO)", { required: true }),
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "social",
          label: "Redes sociales",
          fields: [
            array("profiles", "Perfiles", "Perfil", [
              {
                type: "row",
                fields: [
                  {
                    name: "network",
                    type: "select",
                    label: "Red",
                    required: true,
                    options: [
                      { label: "Facebook", value: "facebook" },
                      { label: "Instagram", value: "instagram" },
                      { label: "LinkedIn", value: "linkedin" },
                      { label: "YouTube", value: "youtube" },
                    ],
                  },
                  text("label", "Nombre visible", { required: true }),
                  text("handle", "Usuario o identificador"),
                ],
              },
              { name: "url", type: "text", label: "URL", required: true },
              {
                name: "showInFooter",
                type: "checkbox",
                label: "Mostrar en el pie de página",
                defaultValue: true,
              },
            ]),
          ],
        },
        {
          name: "payments",
          label: "Pagos",
          fields: [
            text("athMovilUrl", "Enlace de pago ATH Móvil", {
              required: true,
              description: "Se usa en Membresía y en la Conferencia.",
            }),
          ],
        },
        {
          name: "seo",
          label: "SEO predeterminado",
          fields: [
            text("siteName", "Nombre del sitio", { required: true }),
            text("defaultTitle", "Título predeterminado", { required: true }),
            text("titleSuffix", "Sufijo de títulos", {
              required: true,
              description: "Se añade a cada título de página, por ejemplo « | ADPUPR».",
            }),
            text("description", "Descripción predeterminada", { required: true, textarea: true }),
            text("socialDescription", "Descripción corta para X/Twitter", { textarea: true }),
            media("ogImage", "Imagen para redes sociales (1200×630)"),
            text("locale", "Configuración regional (Open Graph)", { required: true }),
            text("skipLinkLabel", "Texto del enlace «saltar al contenido»", { required: true }),
          ],
        },
        {
          name: "notFound",
          label: "Página no encontrada",
          description: "Lo que ve quien abre una dirección que no existe (error 404).",
          fields: [
            text("eyebrow", "Antetítulo"),
            text("title", "Título", { required: true }),
            text("text", "Texto", { required: true, textarea: true }),
            link({ label: "Botón", required: true }),
          ],
        },
      ],
    },
  ],
};
