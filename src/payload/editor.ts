import {
  BoldFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

/**
 * The one rich text editor used across the site.
 *
 * Deliberately small: paragraphs, bold, italic, links and lists. No headings, colors,
 * alignment or embeds, because the section around the text owns its typography.
 * `src/components/ui/rich-text.tsx` renders exactly these nodes.
 */
export const siteEditor = lexicalEditor({
  features: () => [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    LinkFeature({ enabledCollections: ["pages"] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
});
