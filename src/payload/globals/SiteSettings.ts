import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { array, link, media, text } from "../fields";

/**
 * Facts shown in more than one place live here: organization name, emails, postal address,
 * social profiles, the ATH Móvil payment link and site-wide SEO defaults.
 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
    description:
      "Information that appears in several places on the site. Changing it here updates it everywhere.",
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 25 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "organization",
          label: "Organization",
          fields: [
            text("name", "Full name", { required: true }),
            text("shortName", "Acronym", { required: true }),
          ],
        },
        {
          name: "contact",
          label: "Contact",
          fields: [
            array(
              "emails",
              "Emails",
              "Email",
              [{ name: "email", type: "email", label: "Email", required: true }],
              {
                minRows: 1,
                description: "The first one is the main email (contact form).",
              },
            ),
            {
              name: "postal",
              type: "group",
              label: "Postal address",
              fields: [
                {
                  type: "row",
                  fields: [
                    text("line1", "Line 1", { required: true }),
                    text("city", "City", { required: true }),
                  ],
                },
                {
                  type: "row",
                  fields: [
                    text("region", "State or region", { required: true }),
                    text("postalCode", "Postal code", { required: true }),
                    text("country", "Country (ISO code)", { required: true }),
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "social",
          label: "Social media",
          fields: [
            array("profiles", "Profiles", "Profile", [
              {
                type: "row",
                fields: [
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
                  text("label", "Display name", { required: true }),
                  text("handle", "Username or handle"),
                ],
              },
              { name: "url", type: "text", label: "URL", required: true },
              {
                name: "showInFooter",
                type: "checkbox",
                label: "Show in the footer",
                defaultValue: true,
              },
            ]),
          ],
        },
        {
          name: "payments",
          label: "Payments",
          fields: [
            text("athMovilUrl", "ATH Móvil payment link", {
              required: true,
              description: "Used on the membership and conference pages.",
            }),
          ],
        },
        {
          name: "seo",
          label: "SEO defaults",
          fields: [
            text("siteName", "Site name", { required: true }),
            text("defaultTitle", "Default title", { required: true }),
            text("titleSuffix", "Title suffix", {
              required: true,
              description: 'Added to every page title, for example " | ADPUPR".',
            }),
            text("description", "Default description", { required: true, textarea: true }),
            text("socialDescription", "Short description for X/Twitter", { textarea: true }),
            media("ogImage", "Social media image (1200×630)"),
            text("locale", "Locale (Open Graph)", { required: true }),
            text("skipLinkLabel", '"Skip to content" link text', { required: true }),
          ],
        },
        {
          name: "notFound",
          label: "Page not found",
          description:
            "What visitors see when they open an address that does not exist (404 error).",
          fields: [
            text("eyebrow", "Eyebrow"),
            text("title", "Heading", { required: true }),
            text("text", "Text", { required: true, textarea: true }),
            link({ label: "Button", required: true }),
          ],
        },
      ],
    },
  ],
};
