import type { Block } from "payload";
import { anchorField, backgroundField, eyebrowField, headingField } from "@/fields";

export const PeopleGrid: Block = {
  slug: "peopleGrid",
  interfaceName: "PeopleGridBlock",
  labels: { singular: "Personas (junta o equipo)", plural: "Personas" },
  fields: [
    backgroundField("bg"),
    {
      name: "display",
      type: "select",
      label: "Presentaci\u00F3n",
      defaultValue: "bios",
      options: [
        { label: "Tarjetas con biograf\u00EDa al hacer clic", value: "bios" },
        { label: "Retratos (biograf\u00EDa al pasar el cursor)", value: "portraits" },
      ],
    },
    eyebrowField,
    { ...headingField, required: true },
    { name: "description", type: "textarea", label: "Descripci\u00F3n" },
    {
      name: "people",
      type: "array",
      label: "Personas",
      labels: { singular: "Persona", plural: "Personas" },
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          type: "row",
          fields: [
            { name: "name", type: "text", label: "Nombre", required: true },
            { name: "role", type: "text", label: "Cargo", required: true },
          ],
        },
        { name: "photo", type: "upload", relationTo: "media", label: "Foto" },
        { name: "bio", type: "textarea", label: "Biograf\u00EDa" },
      ],
    },
    anchorField,
  ],
};

export const CommitteeList: Block = {
  slug: "committeeList",
  interfaceName: "CommitteeListBlock",
  labels: { singular: "Comit\u00E9s de trabajo", plural: "Comit\u00E9s de trabajo" },
  fields: [
    eyebrowField,
    { ...headingField, required: true },
    { name: "description", type: "textarea", label: "Descripci\u00F3n" },
    {
      name: "committees",
      type: "relationship",
      relationTo: "committees",
      hasMany: true,
      label: "Comit\u00E9s",
      admin: {
        description:
          "Opcional. D\u00E9jalo vac\u00EDo para mostrar todos los comit\u00E9s en el orden de la colecci\u00F3n Comit\u00E9s.",
      },
    },
    anchorField,
  ],
};
