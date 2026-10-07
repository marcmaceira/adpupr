import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { revalidateGlobal } from "@/hooks/revalidate";
import { validateHref } from "@/lib/urls";

export const SOCIAL_PLATFORMS = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "YouTube", value: "youtube" },
  { label: "X (Twitter)", value: "x" },
] as const;

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Ajustes del sitio",
  admin: {
    group: "Navegaci\u00F3n",
    description: "Datos de la organizaci\u00F3n que se repiten en todo el sitio.",
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 20 },
  hooks: { afterChange: [revalidateGlobal] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "General",
          fields: [
            {
              name: "organizationName",
              type: "text",
              label: "Nombre de la organizaci\u00F3n",
              required: true,
              defaultValue: "Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico",
            },
            {
              name: "siteTitle",
              type: "text",
              label: "T\u00EDtulo del sitio",
              required: true,
              admin: { description: "T\u00EDtulo de la portada en buscadores y redes sociales." },
            },
            {
              name: "siteDescription",
              type: "textarea",
              label: "Descripci\u00F3n del sitio",
              required: true,
              admin: {
                description: "Descripci\u00F3n por defecto en buscadores (unos 150 caracteres).",
              },
            },
            {
              name: "shareImage",
              type: "upload",
              relationTo: "media",
              label: "Imagen para compartir",
              admin: {
                description:
                  "Opcional. Imagen de 1200 × 630 px que aparece al compartir enlaces. Si est\u00E1 vac\u00EDa se usa la imagen actual del sitio.",
              },
            },
          ],
        },
        {
          label: "Contacto",
          fields: [
            {
              name: "emails",
              type: "array",
              label: "Correos electr\u00F3nicos",
              labels: { singular: "Correo", plural: "Correos" },
              minRows: 1,
              admin: {
                description: "El primero es el principal y recibe el formulario de contacto.",
              },
              fields: [{ name: "email", type: "email", label: "Correo", required: true }],
            },
            {
              name: "postalAddress",
              type: "group",
              label: "Direcci\u00F3n postal",
              fields: [
                { name: "street", type: "text", label: "Direcci\u00F3n", required: true },
                {
                  type: "row",
                  fields: [
                    { name: "city", type: "text", label: "Pueblo", required: true },
                    {
                      name: "region",
                      type: "text",
                      label: "Estado",
                      defaultValue: "PR",
                      required: true,
                    },
                    {
                      name: "postalCode",
                      type: "text",
                      label: "C\u00F3digo postal",
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Redes sociales",
          fields: [
            {
              name: "social",
              type: "array",
              label: "Perfiles",
              labels: { singular: "Perfil", plural: "Perfiles" },
              fields: [
                {
                  type: "row",
                  fields: [
                    {
                      name: "platform",
                      type: "select",
                      label: "Red",
                      required: true,
                      options: SOCIAL_PLATFORMS.map(({ label, value }) => ({ label, value })),
                    },
                    {
                      name: "handle",
                      type: "text",
                      label: "Usuario",
                      admin: {
                        description: "Se muestra en la p\u00E1gina de contacto (p. ej. @adpupr).",
                      },
                    },
                  ],
                },
                {
                  name: "url",
                  type: "text",
                  label: "Enlace del perfil",
                  required: true,
                  validate: validateHref,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
