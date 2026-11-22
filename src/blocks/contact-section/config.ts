import type { Block } from "payload";
import { array, headline, richText, sectionSettings, text } from "../../payload/fields";

const NAME_TOKEN = "{nombre}";

/**
 * Contact section: intro, a form that opens the visitor's email app (mailto:), and an
 * aside with the direct channels. Emails, address and social profiles come from
 * Site Settings.
 */
export const ContactSectionBlock: Block = {
  slug: "contactSection",
  interfaceName: "ContactSectionBlock",
  labels: { singular: "Contact section", plural: "Contact sections" },
  admin: { group: "Membership, contact and resources" },
  fields: [
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    richText("body", "Text"),
    {
      name: "form",
      type: "group",
      label: "Form",
      admin: {
        description:
          "The form opens the visitor's email app with the message ready to send. It does not store any data.",
      },
      fields: [
        text("eyebrow", "Eyebrow"),
        text("heading", "Heading", { required: true }),
        {
          type: "row",
          fields: [
            text("nameLabel", "Label: name", { required: true }),
            text("namePlaceholder", "Placeholder: name"),
          ],
        },
        {
          type: "row",
          fields: [
            text("contactLabel", "Label: contact", { required: true }),
            text("contactPlaceholder", "Placeholder: contact"),
          ],
        },
        {
          type: "row",
          fields: [
            text("messageLabel", "Label: message", { required: true }),
            text("messagePlaceholder", "Placeholder: message"),
          ],
        },
        text("privacyNote", "Privacy note"),
        text("submitLabel", "Button label", { required: true }),
        {
          name: "email",
          type: "group",
          label: "Generated email",
          fields: [
            {
              name: "recipient",
              type: "email",
              label: "Recipient",
              admin: {
                description:
                  "Optional. If left empty, the first email in Site Settings → Contact is used.",
              },
            },
            {
              name: "subjectTemplate",
              type: "text",
              label: "Subject",
              required: true,
              admin: {
                description: `Type ${NAME_TOKEN} where the person's name should go.`,
              },
            },
            {
              type: "row",
              fields: [
                text("nameLine", "Name line", {
                  required: true,
                  description: "For example «Nombre:». Followed by the name the visitor typed.",
                }),
                text("contactLine", "Contact line", {
                  required: true,
                  description: "Left out if the visitor does not enter their contact details.",
                }),
                text("messageLine", "Message heading", {
                  required: true,
                  description: "Goes on its own line, before the message.",
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
      label: "Direct channels",
      admin: {
        description: "Emails, the address and social links are edited in Site Settings.",
      },
      fields: [
        text("eyebrow", "Eyebrow"),
        text("ariaLabel", "Section name for screen readers", { required: true }),
        {
          type: "row",
          fields: [
            text("emailHeading", "Heading: emails"),
            text("postalHeading", "Heading: address"),
            text("socialHeading", "Heading: social"),
          ],
        },
        array(
          "networks",
          "Social networks shown",
          "Network",
          [
            {
              name: "network",
              type: "select",
              label: "Network",
              required: true,
              options: [
                { label: "Facebook", value: "facebook" },
                { label: "Instagram", value: "instagram" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "YouTube", value: "youtube" },
              ],
            },
          ],
          { description: "In display order. Only networks set up in Site Settings are shown." },
        ),
      ],
    },
    sectionSettings(),
  ],
};
