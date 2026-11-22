import type { Block } from "payload";
import { headline, richText, sectionSettings, text } from "../../payload/fields";

/**
 * Resource library: intro, then category filters, search and the list of downloadable
 * documents. Documents and categories are edited in Contenido → Documentos and
 * Categorías de documentos.
 */
export const ResourceLibraryBlock: Block = {
  slug: "resourceLibrary",
  interfaceName: "ResourceLibraryBlock",
  labels: { singular: "Biblioteca de documentos", plural: "Bibliotecas de documentos" },
  admin: { group: "Membresía, contacto y recursos" },
  fields: [
    text("eyebrow", "Antetítulo"),
    ...headline("heading", "Título"),
    richText("body", "Texto"),
    {
      name: "library",
      type: "group",
      label: "Textos de la biblioteca",
      admin: {
        description:
          "Los documentos se suben en Contenido → Documentos; las categorías, en Categorías de documentos.",
      },
      fields: [
        {
          type: "row",
          fields: [
            text("filterLegend", "Descripción de los filtros (lectores de pantalla)", {
              required: true,
            }),
            text("allLabel", "Botón «todas las categorías»", { required: true }),
          ],
        },
        {
          type: "row",
          fields: [
            text("searchLabel", "Descripción de la búsqueda (lectores de pantalla)", {
              required: true,
            }),
            text("searchPlaceholder", "Texto de ejemplo de la búsqueda"),
          ],
        },
        text("downloadLabel", "Texto del botón de descarga", {
          required: true,
          description: "Los lectores de pantalla lo leen seguido del título del documento.",
        }),
        {
          name: "emptyArchive",
          type: "group",
          label: "Mensaje cuando no hay documentos",
          fields: [text("title", "Título"), text("text", "Texto", { textarea: true })],
        },
        {
          name: "noResults",
          type: "group",
          label: "Mensaje cuando la búsqueda no encuentra nada",
          fields: [text("title", "Título"), text("text", "Texto", { textarea: true })],
        },
      ],
    },
    sectionSettings(),
  ],
};
