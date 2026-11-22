import type { Block } from "payload";
import { array, headline, link, richText, sectionSettings, text } from "../../payload/fields";

/**
 * Membership enrollment: benefits list, then step 1 (form) and step 2 (payment methods).
 * The ATH Móvil link and the postal address come from Site Settings.
 */
export const MembershipEnrollmentBlock: Block = {
  slug: "membershipEnrollment",
  interfaceName: "MembershipEnrollmentBlock",
  labels: { singular: "Membership enrollment", plural: "Membership enrollments" },
  admin: { group: "Membership, contact and resources" },
  fields: [
    {
      name: "benefits",
      type: "group",
      label: "Benefits",
      fields: [
        text("eyebrow", "Eyebrow"),
        ...headline("heading", "Heading"),
        array("items", "Benefits", "Benefit", [
          text("text", "Benefit", { required: true, textarea: true }),
        ]),
      ],
    },
    {
      name: "form",
      type: "group",
      label: "Step 1: form",
      fields: [
        text("eyebrow", "Eyebrow"),
        ...headline("heading", "Heading"),
        text("text", "Text", { textarea: true }),
        link({
          label: "Form button",
          required: true,
          description: "Usually an external form that opens in a new tab.",
        }),
        {
          name: "callout",
          type: "group",
          label: "Callout box",
          fields: [text("title", "Heading"), text("text", "Text", { textarea: true })],
        },
      ],
    },
    {
      name: "payment",
      type: "group",
      label: "Step 2: payment",
      fields: [
        text("eyebrow", "Eyebrow"),
        ...headline("heading", "Heading"),
        {
          name: "athMovil",
          type: "group",
          label: "ATH Móvil",
          admin: {
            description: "The payment link is edited in Site Settings → Payments.",
          },
          fields: [
            text("title", "Heading", { required: true }),
            richText("text", "Text"),
            text("buttonLabel", "Button label", { required: true }),
          ],
        },
        {
          name: "paypal",
          type: "group",
          label: "PayPal",
          fields: [
            text("title", "Heading", { required: true }),
            array(
              "plans",
              "Payment options",
              "Option",
              [
                {
                  type: "row",
                  fields: [
                    text("name", "Name", { required: true }),
                    text("price", "Price", { required: true }),
                  ],
                },
                {
                  name: "url",
                  type: "text",
                  label: "Payment link",
                  required: true,
                  validate: (value: unknown) =>
                    typeof value === "string" && value.startsWith("https://")
                      ? true
                      : "The link must start with https://.",
                },
              ],
              { maxRows: 4 },
            ),
          ],
        },
        {
          name: "check",
          type: "group",
          label: "Check or money order",
          admin: {
            description: "The postal address is edited in Site Settings → Contact.",
          },
          fields: [
            text("title", "Heading", { required: true }),
            text("text", "Text", { textarea: true }),
          ],
        },
      ],
    },
    sectionSettings(),
  ],
};
