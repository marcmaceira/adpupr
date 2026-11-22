import type { Condition, GlobalConfig } from "payload";
import { anyone, staff } from "../access";
import { withRowLabel } from "./row-label";
import { array, link, media, showWhen, text } from "../fields";

const isLink: Condition = (_, siblingData) => siblingData?.type !== "dropdown";
const isDropdown: Condition = (_, siblingData) => siblingData?.type === "dropdown";

/** Site header: logo, main navigation (links and dropdowns), call to action and aria labels. */
export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
  admin: {
    group: "Settings",
    description: "Logo, navigation menu and main button shown at the top of every page.",
  },
  access: { read: anyone, readVersions: staff, update: staff },
  versions: { max: 25 },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Navigation",
          fields: [
            media("logo", "Logo", {
              required: true,
              description: "Shown 40 px tall. Alt text is edited on the file in Media.",
            }),
            text("homeAriaLabel", "Logo link description", {
              required: true,
              description:
                "Screen readers announce it when the logo, which links to the home page, gets focus.",
            }),
            withRowLabel(
              array(
                "navItems",
                "Navigation menu",
                "Item",
                [
                  {
                    name: "type",
                    type: "radio",
                    label: "Type",
                    defaultValue: "link",
                    options: [
                      { label: "Link", value: "link" },
                      { label: "Dropdown", value: "dropdown" },
                    ],
                    admin: { layout: "horizontal" },
                  },
                  showWhen(link({ required: true }), isLink),
                  showWhen(
                    text("label", "Menu label", {
                      required: true,
                      description: 'The button that opens the dropdown, for example "Nosotros".',
                    }),
                    isDropdown,
                  ),
                  showWhen(
                    withRowLabel(
                      array("children", "Dropdown links", "Link", [link({ required: true })], {
                        minRows: 1,
                        description:
                          "The item is marked as active when the current page is within any of these paths.",
                      }),
                    ),
                    isDropdown,
                  ),
                ],
                {
                  minRows: 1,
                  description: "In the order they appear. Drag items to reorder them.",
                },
              ),
            ),
            link({ name: "cta", label: "Main button", required: true }),
          ],
        },
        {
          name: "a11y",
          label: "Accessibility",
          description: "Text that only screen readers announce.",
          fields: [
            text("navLabel", "Main menu name", { required: true }),
            text("mobileNavLabel", "Mobile menu name", { required: true }),
            {
              type: "row",
              fields: [
                text("openMenuLabel", "Open mobile menu button", { required: true }),
                text("closeMenuLabel", "Close mobile menu button", { required: true }),
              ],
            },
          ],
        },
      ],
    },
  ],
};
