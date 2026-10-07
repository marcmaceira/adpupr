import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react";
import { CmsLink } from "./cms-link";

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  link: ({ node, nodesToJSX }) => (
    <CmsLink url={node.fields.url ?? ""}>{nodesToJSX({ nodes: node.children })}</CmsLink>
  ),
  autolink: ({ node, nodesToJSX }) => (
    <CmsLink url={node.fields.url ?? ""}>{nodesToJSX({ nodes: node.children })}</CmsLink>
  ),
});

interface RichTextProps {
  readonly data: SerializedEditorState | null | undefined;
  readonly className?: string;
}

/** Renders Lexical rich text with the site's prose styles (see `.rich-text` in globals.css). */
export function RichText({ data, className = "" }: RichTextProps) {
  if (!data) return null;

  return (
    <PayloadRichText converters={converters} data={data} className={`rich-text ${className}`} />
  );
}
