import type { CollectionConfig, Field } from "payload";
import { array, text } from "../fields";
import { anyone, authenticated, humanEditors } from "../access";
import { slugField, slugFrom } from "./People";

const personField = (description: string): Field => ({
  name: "person",
  type: "relationship",
  relationTo: "people",
  label: "Person",
  required: true,
  admin: { description },
});

const displayNameField: Field = text("displayName", "Display name (optional)", {
  description: "Leave empty to use the person's name.",
});

/** Working committees shown in the committees section of /nosotros/estructura-organizacional. */
export const Committees: CollectionConfig = {
  slug: "committees",
  labels: { singular: "Committee", plural: "Committees" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order", "updatedAt"],
    group: "Organization",
    description:
      "Working committees, shown in the order set. Each identifier is the link anchor (#identifier).",
  },
  access: { create: authenticated, read: anyone, update: authenticated, delete: humanEditors },
  defaultSort: "order",
  hooks: { beforeValidate: [slugFrom("name")] },
  fields: [
    text("name", "Name", {
      required: true,
      description: 'Without "Comité de". For example: Asuntos Legislativos.',
    }),
    text("description", "Description", { required: true, textarea: true }),
    text("focus", "Highlighted focus (optional)", {
      textarea: true,
      description: "Shown in a mustard box below the description.",
    }),
    text("functionsLabel", "Functions list heading", {
      required: true,
      description: "For example: Funciones principales.",
    }),
    array(
      "functions",
      "Functions",
      "Function",
      [text("text", "Function", { required: true, textarea: true })],
      { minRows: 1 },
    ),
    {
      name: "coordinator",
      type: "group",
      label: "Coordination",
      fields: [
        personField("Their portrait and biography come from the person's record."),
        {
          type: "row",
          fields: [
            displayNameField,
            text("roleLabel", "Label (optional)", {
              description: "Replaces the section's general label (for example, Coordinación).",
            }),
          ],
        },
      ],
    },
    {
      name: "editorialBoard",
      type: "group",
      label: "Editorial board (optional)",
      admin: {
        description:
          "Extra box with members and responsibilities. Leave empty if it does not apply.",
      },
      fields: [
        text("title", "Heading", { description: "For example: Junta Editora." }),
        text("summary", "Summary", { textarea: true }),
        array("members", "Members", "Member", [
          personField("The board member."),
          {
            type: "row",
            fields: [text("role", "Role on the board", { required: true }), displayNameField],
          },
        ]),
        array("responsibilities", "Responsibilities", "Responsibility", [
          text("text", "Responsibility", { required: true, textarea: true }),
        ]),
      ],
    },
    {
      name: "order",
      type: "number",
      label: "Order",
      required: true,
      defaultValue: 1,
      admin: { position: "sidebar", description: "Committees are shown from lowest to highest." },
    },
    slugField(
      "Identifier (anchor)",
      "Filled in from the name. It is the link anchor: /nosotros/estructura-organizacional#identifier.",
      "asuntos-legislativos",
    ),
  ],
};
