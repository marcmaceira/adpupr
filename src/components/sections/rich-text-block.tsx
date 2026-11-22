import type { RichTextBlock as RichTextBlockData } from "@/payload-types";
import { Container, Section } from "@/components/ui/layout";
import { RichText, type RichTextClasses } from "@/components/ui/rich-text";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type RichTextSectionProps = Omit<RichTextBlockData, "blockType" | "blockName" | "id">;

/** House prose: body copy at the interior-section measure, with lists and links styled. */
const PROSE: RichTextClasses = {
  paragraph: "font-body text-[17px] leading-[1.75] text-text-muted",
  strong: "font-semibold text-text",
  link: "font-semibold text-primary underline decoration-sky-200 decoration-2 underline-offset-4 transition-colors hover:text-primary-700",
  list: "list-outside space-y-2 pl-6 font-body text-[17px] leading-[1.75] text-text-muted [&:is(ol)]:list-decimal [&:is(ul)]:list-disc",
  listItem: "pl-1",
};

export function RichTextSection({ eyebrow, heading, body, settings }: RichTextSectionProps) {
  return (
    <Section id={settings?.anchorId} tone={settings?.tone ?? "bg"} spacing="standard">
      <Container>
        <div className="max-w-[760px]">
          <Eyebrow className="mb-3.5">{eyebrow}</Eyebrow>
          <Heading text={heading} className="text-text" />
          <RichText
            data={body}
            className={heading || eyebrow ? "mt-8 space-y-5" : "space-y-5"}
            classes={PROSE}
          />
        </div>
      </Container>
    </Section>
  );
}
