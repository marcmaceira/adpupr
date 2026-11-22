import type { CollectionConfig } from "payload";
import { anyone, authenticated, humanEditors } from "../access";

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Categories of the /recursos library. The filter buttons follow `order`. */
export const DocumentCategories: CollectionConfig = {
  slug: "document-categories",
  labels: { singular: "Categoría de documentos", plural: "Categorías de documentos" },
  versions: false,
  defaultSort: "order",
  admin: {
    group: "Contenido",
    useAsTitle: "label",
    defaultColumns: ["label", "order", "slug"],
    description:
      "Categorías de la biblioteca de Recursos. Cada una aparece como un botón de filtro, en el orden indicado.",
  },
  access: { create: authenticated, read: anyone, update: authenticated, delete: humanEditors },
  fields: [
    {
      name: "label",
      type: "text",
      label: "Nombre",
      required: true,
      admin: { description: "Texto del botón de filtro y de la etiqueta sobre cada documento." },
    },
    {
      name: "slug",
      type: "text",
      label: "Identificador",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "Minúsculas, números y guiones. No se muestra a visitantes.",
      },
      validate: (value: unknown) =>
        typeof value === "string" && SLUG_PATTERN.test(value)
          ? true
          : "Usa solo minúsculas, números y guiones (por ejemplo: boletines).",
    },
    {
      name: "order",
      type: "number",
      label: "Orden",
      required: true,
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Las categorías con número menor aparecen primero.",
      },
    },
  ],
};
