import type { Block } from "payload";
import {
  array,
  headline,
  link,
  sectionSettings,
  showWhen,
  text,
  variant,
  variantIs,
} from "../../payload/fields";

export const HERO_VARIANTS = [
  { value: "home", label: "Home page (large heading, two buttons)" },
  { value: "subhead", label: "Simple header (eyebrow, heading, text)" },
  { value: "event", label: "Event (theme and highlighted date)" },
  { value: "resources", label: "Resource center (with section index)" },
  { value: "structure", label: "Institutional with buttons" },
  { value: "history", label: "Institutional with long text" },
  { value: "brief", label: "Institutional brief (heading only)" },
] as const;

type HeroVariant = (typeof HERO_VARIANTS)[number]["value"];
const when = (...variants: HeroVariant[]) => variantIs(...variants);

const [headingField, highlightField] = headline("heading", "Heading", { highlight: true });

/**
 * Hero: the dark band that opens every page. One block, seven named variants that
 * reproduce the existing page headers. Fields irrelevant to a variant are hidden.
 */
export const HeroBlock: Block = {
  slug: "hero",
  interfaceName: "HeroBlock",
  labels: { singular: "Page header", plural: "Page headers" },
  admin: { group: "Headers and bands" },
  fields: [
    variant(HERO_VARIANTS, {
      description:
        "Each variant reproduces an existing page header on the site, with its heading size, spacing and ornaments.",
    }),
    text("eyebrow", "Eyebrow", {
      description: "Short uppercase text shown above the heading.",
    }),
    ...(headingField ? [headingField] : []),
    ...(highlightField ? [showWhen(highlightField, when("home"))] : []),
    showWhen(
      text("lede", "Intro text", { textarea: true }),
      when("home", "subhead", "resources", "structure", "history"),
    ),
    {
      name: "themeBox",
      type: "group",
      label: "Theme",
      admin: {
        condition: when("event"),
        description: "Box with a mustard border below the heading.",
      },
      fields: [
        text("label", "Label", { description: "For example: Tema central" }),
        text("text", "Theme", { textarea: true }),
      ],
    },
    {
      name: "eventDate",
      type: "group",
      label: "Highlighted date",
      admin: {
        condition: when("event"),
        description: "Panel to the right of the heading with the day in large type.",
      },
      fields: [
        {
          type: "row",
          fields: [
            text("day", "Day (for example: 02)"),
            text("monthYear", "Month and year", {
              textarea: true,
              description: "Each line is shown on its own line.",
            }),
          ],
        },
        text("caption", "Detail (weekday and place)"),
      ],
    },
    showWhen(
      array(
        "actions",
        "Buttons",
        "Button",
        [
          link({ required: true }),
          {
            name: "style",
            type: "select",
            label: "Style",
            required: true,
            defaultValue: "primary",
            options: [
              { label: "Primary (mustard)", value: "primary" },
              { label: "Secondary (white outline)", value: "secondary" },
            ],
          },
        ],
        {
          maxRows: 2,
          description:
            "Up to two buttons. Large on the home page variant; medium on the institutional variant.",
        },
      ),
      when("home", "structure"),
    ),
    showWhen(
      array("sectionLinks", "Section index", "Link", [link({ required: true })], {
        maxRows: 6,
        description: "Links to the page's sections, shown as a list on the right.",
      }),
      when("resources"),
    ),
    showWhen(
      text("navLabel", "Link group name (screen readers)", {
        description:
          "Not visible on screen. Announced by screen readers, for example: Secciones de recursos.",
      }),
      when("resources", "structure"),
    ),
    sectionSettings(),
  ],
};
