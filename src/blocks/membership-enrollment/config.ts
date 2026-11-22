import type { Block } from "payload";
import { array, headline, link, richText, sectionSettings, text } from "../../payload/fields";

/**
 * Membership enrollment: benefits list, then step 1 (form) and step 2 (payment methods).
 * The ATH Móvil link and the postal address come from Configuración del sitio.
 */
export const MembershipEnrollmentBlock: Block = {
  slug: "membershipEnrollment",
  interfaceName: "MembershipEnrollmentBlock",
  labels: { singular: "Inscripción de membresía", plural: "Inscripciones de membresía" },
  admin: { group: "Membresía, contacto y recursos" },
  fields: [
    {
      name: "benefits",
      type: "group",
      label: "Beneficios",
      fields: [
        text("eyebrow", "Antetítulo"),
        ...headline("heading", "Título"),
        array("items", "Beneficios", "Beneficio", [
          text("text", "Beneficio", { required: true, textarea: true }),
        ]),
      ],
    },
    {
      name: "form",
      type: "group",
      label: "Paso 1: formulario",
      fields: [
        text("eyebrow", "Antetítulo"),
        ...headline("heading", "Título"),
        text("text", "Texto", { textarea: true }),
        link({
          label: "Botón del formulario",
          required: true,
          description: "Normalmente un formulario externo que se abre en una pestaña nueva.",
        }),
        {
          name: "callout",
          type: "group",
          label: "Recuadro destacado",
          fields: [text("title", "Título"), text("text", "Texto", { textarea: true })],
        },
      ],
    },
    {
      name: "payment",
      type: "group",
      label: "Paso 2: pago",
      fields: [
        text("eyebrow", "Antetítulo"),
        ...headline("heading", "Título"),
        {
          name: "athMovil",
          type: "group",
          label: "ATH Móvil",
          admin: {
            description: "El enlace de pago se edita en Configuración del sitio → Pagos.",
          },
          fields: [
            text("title", "Título", { required: true }),
            richText("text", "Texto"),
            text("buttonLabel", "Texto del botón", { required: true }),
          ],
        },
        {
          name: "paypal",
          type: "group",
          label: "PayPal",
          fields: [
            text("title", "Título", { required: true }),
            array(
              "plans",
              "Opciones de pago",
              "Opción",
              [
                {
                  type: "row",
                  fields: [
                    text("name", "Nombre", { required: true }),
                    text("price", "Precio", { required: true }),
                  ],
                },
                {
                  name: "url",
                  type: "text",
                  label: "Enlace de pago",
                  required: true,
                  validate: (value: unknown) =>
                    typeof value === "string" && value.startsWith("https://")
                      ? true
                      : "El enlace debe empezar con https://.",
                },
              ],
              { maxRows: 4 },
            ),
          ],
        },
        {
          name: "check",
          type: "group",
          label: "Cheque o giro",
          admin: {
            description: "La dirección postal se edita en Configuración del sitio → Contacto.",
          },
          fields: [
            text("title", "Título", { required: true }),
            text("text", "Texto", { textarea: true }),
          ],
        },
      ],
    },
    sectionSettings(),
  ],
};
