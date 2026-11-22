import type { GlobalConfig } from "payload";
import { anyone, authenticated } from "../access";
import { withRowLabel } from "./row-label";
import { array, link, media, text } from "../fields";

/**
 * Site footer. Social profiles, the postal address and the emails come from
 * Site Settings, so they are edited in one place.
 */
export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  admin: {
    group: "Settings",
    description:
      'Footer content. Social profiles, the address and the emails are edited in "Site Settings".',
  },
  access: { read: anyone, update: authenticated },
  versions: { max: 25 },
  fields: [
    media("logo", "Logo", {
      required: true,
      description:
        "Light version for a dark background, shown 120 px tall. Alt text is edited on the file in Media.",
    }),
    text("blurb", "Short description", { required: true, textarea: true }),
    withRowLabel(
      array(
        "columns",
        "Link columns",
        "Column",
        [
          text("heading", "Column heading", { required: true }),
          withRowLabel(array("links", "Links", "Link", [link({ required: true })], { minRows: 1 })),
        ],
        { maxRows: 3, description: "Up to three columns, in the order they appear." },
      ),
    ),
    {
      type: "row",
      fields: [
        text("addressLabel", "Address heading", {
          required: true,
          description: 'The address comes from "Site Settings".',
        }),
        text("emailLabel", "Emails heading", {
          required: true,
          description: 'The emails come from "Site Settings".',
        }),
      ],
    },
    {
      type: "row",
      fields: [
        text("copyright", "Copyright", {
          required: true,
          description: "Type {year} where the current year should appear.",
        }),
        text("location", "Location", { required: true }),
      ],
    },
  ],
};
