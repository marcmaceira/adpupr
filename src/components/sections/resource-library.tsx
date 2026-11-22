import type { ResourceLibraryBlock } from "@/payload-types";
import { Container, Section } from "@/components/ui/layout";
import { RichText } from "@/components/ui/rich-text";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  type BrowserCategory,
  type BrowserDocument,
  ResourceLibraryBrowser,
} from "./resource-library-browser";

export type ResourceLibraryProps = Omit<ResourceLibraryBlock, "blockType" | "blockName" | "id"> & {
  /** Categories in display order. */
  readonly categories: readonly BrowserCategory[];
  /** Documents in display order. */
  readonly documents: readonly BrowserDocument[];
};

/**
 * Intro split (narrow container) above the full-bleed library. The section has no
 * horizontal padding so the filter bar can span the full width.
 */
export function ResourceLibrary({
  eyebrow,
  heading,
  body,
  library,
  categories,
  documents,
  settings,
}: ResourceLibraryProps) {
  return (
    <Section id={settings?.anchorId} tone="bg" className="pt-20 md:pt-28">
      <Container
        width="narrow"
        className="grid gap-10 pb-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:pb-20"
      >
        <div>
          <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
          <Heading text={heading} className="text-text" />
        </div>
        <div className="space-y-5 border-l-4 border-mustard pl-6 sm:pl-8">
          <RichText
            data={body}
            classes={{ paragraph: "font-body text-[17px] leading-[1.75] text-text-muted" }}
          />
        </div>
      </Container>
      <ResourceLibraryBrowser copy={library} categories={categories} documents={documents} />
    </Section>
  );
}
