import type { Block } from "payload";
import { headline, richText, sectionSettings, text } from "../../payload/fields";

/**
 * Resource library: intro, then category filters, search and the list of downloadable
 * documents. Documents and categories are edited in Content → Documents and
 * Document Categories.
 */
export const ResourceLibraryBlock: Block = {
  slug: "resourceLibrary",
  interfaceName: "ResourceLibraryBlock",
  labels: { singular: "Document library", plural: "Document libraries" },
  admin: { group: "Membership, contact and resources" },
  fields: [
    text("eyebrow", "Eyebrow"),
    ...headline("heading", "Heading"),
    richText("body", "Text"),
    {
      name: "library",
      type: "group",
      label: "Library text",
      admin: {
        description:
          "Documents are uploaded in Content → Documents; categories, in Document Categories.",
      },
      fields: [
        {
          type: "row",
          fields: [
            text("filterLegend", "Filter description (screen readers)", {
              required: true,
            }),
            text("allLabel", "“All categories” button", { required: true }),
          ],
        },
        {
          type: "row",
          fields: [
            text("searchLabel", "Search description (screen readers)", {
              required: true,
            }),
            text("searchPlaceholder", "Search placeholder"),
          ],
        },
        text("downloadLabel", "Download button label", {
          required: true,
          description: "Screen readers read it followed by the document title.",
        }),
        {
          name: "emptyArchive",
          type: "group",
          label: "Message when there are no documents",
          fields: [text("title", "Heading"), text("text", "Text", { textarea: true })],
        },
        {
          name: "noResults",
          type: "group",
          label: "Message when a search finds nothing",
          fields: [text("title", "Heading"), text("text", "Text", { textarea: true })],
        },
      ],
    },
    sectionSettings(),
  ],
};
