import type { Block } from "payload";
import { array, headline, sectionSettings, text } from "../../payload/fields";

const PAYMENT_URL = /^https?:\/\//;

/**
 * Pricing table: registration rates with PayPal buttons, the ATH Móvil banner (its link
 * comes from Ajustes del sitio → Pagos) and a closing note.
 */
export const PricingTableBlock: Block = {
  slug: "pricingTable",
  interfaceName: "PricingTableBlock",
  labels: { singular: "Tabla de tarifas y pago", plural: "Tablas de tarifas y pago" },
  admin: { group: "Conferencia" },
  fields: [
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    text("intro", "Introducción", { textarea: true }),
    array(
      "prices",
      "Tarifas",
      "Tarifa",
      [
        {
          type: "row",
          fields: [
            {
              name: "name",
              type: "text",
              label: "Nombre",
              required: true,
              admin: { width: "60%" },
            },
            {
              name: "price",
              type: "text",
              label: "Precio (por ejemplo: $100)",
              required: true,
              admin: { width: "40%" },
            },
          ],
        },
        text("note", "Nota (con marca de verificación)"),
        {
          type: "row",
          fields: [
            {
              name: "buttonLabel",
              type: "text",
              label: "Texto del botón",
              required: true,
              admin: { width: "40%" },
            },
            {
              name: "paymentUrl",
              type: "text",
              label: "Enlace de pago (PayPal)",
              required: true,
              admin: {
                width: "60%",
                description: "Se abre en una pestaña nueva.",
              },
              validate: (value: unknown) =>
                typeof value === "string" && PAYMENT_URL.test(value)
                  ? true
                  : "Escribe un enlace que empiece con https://.",
            },
          ],
        },
        {
          name: "featured",
          type: "checkbox",
          label: "Destacada",
          admin: { description: "Borde azul, botón sólido y la insignia de arriba." },
        },
        {
          name: "badge",
          type: "text",
          label: "Insignia (por ejemplo: Miembros)",
          admin: {
            condition: (_: unknown, sibling: Record<string, unknown>) => Boolean(sibling?.featured),
          },
        },
      ],
      { minRows: 1, maxRows: 3 },
    ),
    {
      name: "athMovil",
      type: "group",
      label: "Pago con ATH Móvil",
      admin: {
        description:
          "El enlace de pago se edita en Ajustes del sitio → Pagos. Sin enlace, el botón no se muestra.",
      },
      fields: [
        text("title", "Título"),
        text("text", "Texto", { textarea: true }),
        text("buttonLabel", "Texto del botón"),
      ],
    },
    text("footnote", "Nota final", { textarea: true }),
    sectionSettings(),
  ],
};
