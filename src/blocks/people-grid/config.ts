import type { Block, Condition } from "payload";
import {
  array,
  sectionHeader,
  sectionSettings,
  showWhen,
  text,
  variant,
  variantIs,
} from "../../payload/fields";

export const PEOPLE_GRID_VARIANTS = [
  {
    value: "bioOverlay",
    label: "Cards with biography (Board of Directors: light gray background, open on click)",
  },
  {
    value: "portrait",
    label: "Portraits (Founding Board: gray background, name over the photo)",
  },
] as const;

type PeopleGridVariant = (typeof PEOPLE_GRID_VARIANTS)[number]["value"];
const when = (...variants: PeopleGridVariant[]) => variantIs(...variants);

/**
 * For fields nested in the `labels` group: `variantIs` reads the sibling data, which inside
 * a group is the group itself, so read the enclosing block's variant instead.
 */
const blockIsBioOverlay: Condition = (_, __, { blockData }) => blockData?.variant === "bioOverlay";

const NAME_TOKEN_HELP = "{nombre} is replaced with each person's name.";

/**
 * People grid: a section header plus an ordered list of people with a role per placement.
 * People come from the People collection, so a portrait or biography is edited once.
 */
export const PeopleGridBlock: Block = {
  slug: "peopleGrid",
  interfaceName: "PeopleGridBlock",
  labels: { singular: "People group", plural: "People groups" },
  admin: { group: "People and committees" },
  fields: [
    variant(PEOPLE_GRID_VARIANTS, {
      description:
        "Cards with biography: two-column header; on large screens 4 cards per row with the last row centered. Portraits: stacked header; 2, 3 or 4 portraits per row.",
    }),
    ...sectionHeader({ intro: true }),
    array(
      "members",
      "People",
      "Person",
      [
        {
          name: "person",
          type: "relationship",
          relationTo: "people",
          label: "Person",
          required: true,
        },
        {
          type: "row",
          fields: [
            text("role", "Role in this section", { required: true }),
            text("displayName", "Display name (optional)", {
              description:
                "Leave empty to use the name from People. If filled in, it replaces the name in this section only (changing it in People does not update it here).",
            }),
          ],
        },
      ],
      {
        minRows: 1,
        required: true,
        description: "In display order. The role applies to this section only.",
      },
    ),
    {
      name: "labels",
      type: "group",
      label: "Interface text",
      admin: {
        description: "Button and screen reader text. " + NAME_TOKEN_HELP,
      },
      fields: [
        text("portraitAlt", "Portrait alt text", {
          required: true,
          description: "For example: Retrato de {nombre}",
        }),
        showWhen(
          text("open", "Card footer text", {
            required: true,
            description: "For example: Ver biografía",
          }),
          blockIsBioOverlay,
        ),
        showWhen(
          text("openAria", "Open button (screen reader)", {
            required: true,
            description: "For example: Ver biografía de {nombre}",
          }),
          blockIsBioOverlay,
        ),
        showWhen(
          text("bioAria", "Biography panel (screen reader)", {
            required: true,
            description: "For example: Biografía de {nombre}",
          }),
          blockIsBioOverlay,
        ),
        showWhen(
          text("closeAria", "Close button (screen reader)", {
            required: true,
            description: "For example: Cerrar biografía de {nombre}",
          }),
          blockIsBioOverlay,
        ),
      ],
    },
    showWhen(
      {
        name: "showBios",
        type: "checkbox",
        label: "Show biographies on hover or when the name is clicked",
        defaultValue: false,
        admin: {
          description: "Off: portrait, role and name only (like the current Founding Board).",
        },
      },
      when("portrait"),
    ),
    sectionSettings(),
  ],
};
