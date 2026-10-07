import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";

export const Committees: CollectionConfig = {
  slug: "committees",
  labels: { singular: "Comit\u00E9", plural: "Comit\u00E9s" },
  orderable: true,
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
    group: "Organizaci\u00F3n",
    description:
      "Comit\u00E9s de trabajo. Arrastra las filas para cambiar el orden en que aparecen en la p\u00E1gina.",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: { maxPerDoc: 20 },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          label: "Nombre",
          required: true,
          admin: {
            width: "60%",
            description: "Sin la palabra «Comit\u00E9» (p. ej. «Asuntos Legislativos»).",
          },
        },
        {
          name: "slug",
          type: "text",
          label: "ID de ancla",
          required: true,
          unique: true,
          admin: {
            width: "40%",
            description: "Para enlazar a /nosotros/estructura-organizacional#este-id.",
          },
          validate: (value: string | null | undefined) =>
            (Boolean(value) && /^[a-z0-9-]+$/.test(value ?? "")) ||
            "Usa solo min\u00FAsculas, n\u00FAmeros y guiones.",
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      label: "Descripci\u00F3n",
      required: true,
    },
    {
      name: "focus",
      type: "textarea",
      label: "Nota destacada",
      admin: { description: "Opcional. Aparece en un recuadro amarillo bajo la descripci\u00F3n." },
    },
    {
      name: "functionsLabel",
      type: "text",
      label: "T\u00EDtulo de la lista de funciones",
      defaultValue: "Funciones",
      required: true,
    },
    {
      name: "functions",
      type: "array",
      label: "Funciones",
      labels: { singular: "Funci\u00F3n", plural: "Funciones" },
      fields: [{ name: "text", type: "textarea", label: "Texto", required: true }],
    },
    {
      name: "board",
      type: "group",
      label: "Junta o equipo del comit\u00E9 (opcional)",
      admin: {
        description:
          "Rellena esta secci\u00F3n solo si el comit\u00E9 tiene una junta (p. ej. Junta Editora).",
      },
      fields: [
        { name: "title", type: "text", label: "T\u00EDtulo", defaultValue: "Junta Editora" },
        { name: "summary", type: "textarea", label: "Resumen" },
        {
          name: "members",
          type: "array",
          label: "Integrantes",
          labels: { singular: "Integrante", plural: "Integrantes" },
          fields: [
            {
              type: "row",
              fields: [
                { name: "name", type: "text", label: "Nombre", required: true },
                { name: "role", type: "text", label: "Rol", required: true },
              ],
            },
          ],
        },
        {
          name: "responsibilities",
          type: "array",
          label: "Responsabilidades",
          labels: { singular: "Responsabilidad", plural: "Responsabilidades" },
          fields: [{ name: "text", type: "textarea", label: "Texto", required: true }],
        },
      ],
    },
    {
      name: "coordinator",
      type: "group",
      label: "Coordinaci\u00F3n",
      fields: [
        { name: "name", type: "text", label: "Nombre", required: true },
        { name: "photo", type: "upload", relationTo: "media", label: "Foto" },
        { name: "bio", type: "textarea", label: "Biograf\u00EDa", required: true },
      ],
    },
  ],
};
