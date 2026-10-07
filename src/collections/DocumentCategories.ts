import type { CollectionConfig } from "payload";
import { anyone, authenticated } from "@/access";
import { revalidateAfterChange, revalidateAfterDelete } from "@/hooks/revalidate";

export const DocumentCategories: CollectionConfig = {
  slug: "document-categories",
  labels: { singular: "Categor\u00EDa de documentos", plural: "Categor\u00EDas de documentos" },
  orderable: true,
  admin: {
    useAsTitle: "title",
    group: "Archivos",
    description:
      "Filtros de la biblioteca de recursos. Arrastra las filas para cambiar el orden en que aparecen.",
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: "sourceSlug",
      type: "text",
      unique: true,
      admin: { hidden: true },
      access: { create: () => false, update: () => false },
    },
    {
      name: "title",
      type: "text",
      label: "Nombre",
      required: true,
      unique: true,
    },
  ],
};
