import type { Block } from "payload";
import { array, headline, sectionSettings, text } from "../../payload/fields";

const PAYMENT_URL = /^https?:\/\//;

/**
 * Pricing table: registration rates with PayPal buttons, the ATH Móvil banner (its link
 * comes from Site Settings → Payments) and a closing note.
 */
export const PricingTableBlock: Block = {
  slug: "pricingTable",
  interfaceName: "PricingTableBlock",
  labels: { singular: "Rates and payment table", plural: "Rates and payment tables" },
  admin: { group: "Conference" },
  fields: [
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    text("intro", "Intro", { textarea: true }),
    array(
      "prices",
      "Rates",
      "Rate",
      [
        {
          type: "row",
          fields: [
            {
              name: "name",
              type: "text",
              label: "Name",
              required: true,
              admin: { width: "60%" },
            },
            {
              name: "price",
              type: "text",
              label: "Price (for example: $100)",
              required: true,
              admin: { width: "40%" },
            },
          ],
        },
        text("note", "Note (with check mark)"),
        {
          type: "row",
          fields: [
            {
              name: "buttonLabel",
              type: "text",
              label: "Button label",
              required: true,
              admin: { width: "40%" },
            },
            {
              name: "paymentUrl",
              type: "text",
              label: "Payment link (PayPal)",
              required: true,
              admin: {
                width: "60%",
                description: "Opens in a new tab.",
              },
              validate: (value: unknown) =>
                typeof value === "string" && PAYMENT_URL.test(value)
                  ? true
                  : "Enter a link that starts with https://.",
            },
          ],
        },
        {
          name: "featured",
          type: "checkbox",
          label: "Featured",
          admin: { description: "Blue border, solid button and the badge on top." },
        },
        {
          name: "badge",
          type: "text",
          label: "Badge (for example: Miembros)",
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
      label: "ATH Móvil payment",
      admin: {
        description:
          "The payment link is edited in Site Settings → Payments. Without a link, the button is hidden.",
      },
      fields: [
        text("title", "Heading"),
        text("text", "Text", { textarea: true }),
        text("buttonLabel", "Button label"),
      ],
    },
    text("footnote", "Closing note", { textarea: true }),
    sectionSettings(),
  ],
};
