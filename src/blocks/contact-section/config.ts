import type { Block } from "payload";
import { array, headline, richText, sectionSettings, text } from "../../payload/fields";

const NAME_TOKEN = "{nombre}";

/**
 * Contact section: intro, a form that opens the visitor's email app (mailto:), and an
 * aside with the direct channels. Emails, address and social profiles come from
 * Configuración del sitio.
 */
export const ContactSectionBlock: Block = {
  slug: "contactSection",
  interfaceName: "ContactSectionBlock",
  labels: { singular: "Sección de contacto", plural: "Secciones de contacto" },
  admin: { group: "Membresía, contacto y recursos" },
  fields: [
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    richText("body", "Texto"),
    {
      name: "form",
      type: "group",
      label: "Formulario",
      admin: {
        description:
          "El formulario abre la aplicación de correo del visitante con el mensaje listo para enviar. No guarda datos.",
      },
      fields: [
        text("eyebrow", "Antetítulo"),
        text("heading", "Título", { required: true }),
        {
          type: "row",
          fields: [
            text("nameLabel", "Etiqueta: nombre", { required: true }),
            text("namePlaceholder", "Texto de ejemplo: nombre"),
          ],
        },
        {
          type: "row",
          fields: [
            text("contactLabel", "Etiqueta: contacto", { required: true }),
            text("contactPlaceholder", "Texto de ejemplo: contacto"),
          ],
        },
        {
          type: "row",
          fields: [
            text("messageLabel", "Etiqueta: mensaje", { required: true }),
            text("messagePlaceholder", "Texto de ejemplo: mensaje"),
          ],
        },
        text("privacyNote", "Nota de privacidad"),
        text("submitLabel", "Texto del botón", { required: true }),
        {
          name: "email",
          type: "group",
          label: "Correo que se genera",
          fields: [
            {
              name: "recipient",
              type: "email",
              label: "Destinatario",
              admin: {
                description:
                  "Opcional. Si lo dejas vacío, se usa el primer correo de Configuración del sitio → Contacto.",
              },
            },
            {
              name: "subjectTemplate",
              type: "text",
              label: "Asunto",
              required: true,
              admin: {
                description: `Escribe ${NAME_TOKEN} donde debe ir el nombre de la persona.`,
              },
            },
            {
              type: "row",
              fields: [
                text("nameLine", "Línea del nombre", {
                  required: true,
                  description: "Por ejemplo «Nombre:». Le sigue el nombre escrito.",
                }),
                text("contactLine", "Línea del contacto", {
                  required: true,
                  description: "Se omite si la persona no escribe su contacto.",
                }),
                text("messageLine", "Encabezado del mensaje", {
                  required: true,
                  description: "Va en su propia línea, antes del mensaje.",
                }),
              ],
            },
          ],
        },
      ],
    },
    {
      name: "channels",
      type: "group",
      label: "Canales directos",
      admin: {
        description:
          "Los correos, la dirección y los enlaces de redes se editan en Configuración del sitio.",
      },
      fields: [
        text("eyebrow", "Antetítulo"),
        text("ariaLabel", "Nombre del bloque para lectores de pantalla", { required: true }),
        {
          type: "row",
          fields: [
            text("emailHeading", "Título: correos"),
            text("postalHeading", "Título: dirección"),
            text("socialHeading", "Título: redes"),
          ],
        },
        array(
          "networks",
          "Redes que se muestran",
          "Red",
          [
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
          ],
          { description: "En el orden en que aparecen. Solo se muestran redes configuradas." },
        ),
      ],
    },
    sectionSettings(),
  ],
};
