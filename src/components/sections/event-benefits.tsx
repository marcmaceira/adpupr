import type { EventBenefitsBlock } from "@/payload-types";
import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { RichText, type RichTextClasses } from "@/components/ui/rich-text";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type EventBenefitsProps = Omit<EventBenefitsBlock, "blockType" | "blockName" | "id">;

type Benefit = NonNullable<EventBenefitsBlock["benefits"]>[number];

const FOOTNOTE_CLASSES: RichTextClasses = {
  paragraph:
    "mt-8 border-t border-text-on-dark/20 pt-6 text-base text-text-on-dark-muted sm:text-sm",
  strong: "font-semibold text-mustard",
};

function BenefitItem({ benefit }: { readonly benefit: Benefit }) {
  return (
    <div className="border-t border-text-on-dark/20 py-5">
      <dt className="flex items-start gap-3 font-heading text-base font-semibold text-text-on-dark">
        <Icon name={benefit.icon} className="size-6 shrink-0 stroke-sky" strokeWidth={1.75} />
        <span className="min-w-0">{benefit.title}</span>
      </dt>
      {benefit.detail ? (
        <dd className="mt-2 pl-9 text-base text-text-on-dark-muted sm:text-sm">{benefit.detail}</dd>
      ) : null}
    </div>
  );
}

/** Dark section: what registration includes, a highlighted figure and a footnote. */
export function EventBenefits({
  eyebrow,
  heading,
  callout,
  benefits,
  footnote,
  settings,
}: EventBenefitsProps) {
  const hasCallout = Boolean(callout?.label || callout?.value || callout?.note);

  return (
    <Section id={settings?.anchorId} tone="primary" className="py-16 text-text-on-dark sm:py-20">
      <Container width="wideInset">
        <div className="grid gap-8 lg:grid-cols-[4fr_6fr] lg:gap-20">
          <div>
            <Eyebrow tone="dark" className="mb-3">
              {eyebrow}
            </Eyebrow>
            <Heading text={heading} className="max-w-[20ch] text-text-on-dark" />
            {hasCallout ? (
              <div className="mt-10 border-l-4 border-mustard pl-6">
                {callout?.label ? (
                  <p className="font-heading text-base text-text-on-dark-muted">{callout.label}</p>
                ) : null}
                {callout?.value ? (
                  <p className="my-3 font-heading text-5xl font-semibold tabular-nums tracking-tight text-mustard">
                    {callout.srPrefix ? <span className="sr-only">{callout.srPrefix} </span> : null}
                    {callout.value}
                  </p>
                ) : null}
                {callout?.note ? (
                  <p className="max-w-[35ch] text-base text-text-on-dark-muted sm:text-sm">
                    {callout.note}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
          {benefits && benefits.length > 0 ? (
            <dl className="grid gap-x-8 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <BenefitItem key={benefit.id ?? benefit.title} benefit={benefit} />
              ))}
            </dl>
          ) : null}
        </div>
        <RichText data={footnote} classes={FOOTNOTE_CLASSES} />
      </Container>
    </Section>
  );
}
