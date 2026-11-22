import type { MembershipEnrollmentBlock } from "@/payload-types";
import { resolveLink } from "@/lib/links";
import { ButtonLink, BUTTON_VARIANTS } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { RichText } from "@/components/ui/rich-text";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { AddressLines } from "./address-lines";

export type MembershipEnrollmentProps = Omit<
  MembershipEnrollmentBlock,
  "blockType" | "blockName" | "id"
> & {
  /** From site settings → payments. */
  readonly athMovilUrl: string | null;
  /** From site settings → contact, one entry per line. */
  readonly postalLines: readonly string[];
};

const STEP_HEADING =
  "font-heading text-[30px] font-black leading-[1.1] tracking-[-0.02em] text-text sm:text-[36px]";

function ButtonArrow() {
  return <Icon name="arrow-right" size={14} strokeWidth={3} />;
}

function Benefits({ benefits }: Pick<MembershipEnrollmentProps, "benefits">) {
  const items = benefits.items ?? [];
  return (
    <div className="border-b border-border pb-16 lg:py-20">
      <Eyebrow className="mb-3.5">{benefits.eyebrow}</Eyebrow>
      <Heading text={benefits.heading} className="text-text" />

      {items.length > 0 ? (
        <ul className="mt-9">
          {items.map((item) => (
            <li
              key={item.id ?? item.text}
              className="grid grid-cols-[28px_1fr] items-start gap-4 border-b border-border py-4 font-body text-[15px] leading-[1.65] text-text last:border-b-0 sm:grid-cols-[32px_1fr] sm:gap-5 sm:text-[17px]"
            >
              <span
                className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-mustard text-primary sm:h-8 sm:w-8"
                aria-hidden="true"
              >
                <Icon name="check" size={17} strokeWidth={3} />
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FormStep({ form }: Pick<MembershipEnrollmentProps, "form">) {
  const button = resolveLink(form.link);
  const callout = form.callout;
  return (
    <div>
      <Eyebrow className="mb-3.5">{form.eyebrow}</Eyebrow>
      <Heading scale="none" text={form.heading} className={STEP_HEADING} />
      {form.text ? (
        <p className="mt-5 max-w-[48ch] font-body text-[16px] leading-[1.7] text-text-muted">
          {form.text}
        </p>
      ) : null}
      {button ? (
        <ButtonLink href={button.href} newTab={button.newTab} variant="primaryMd" className="mt-7">
          {button.label}
          <ButtonArrow />
        </ButtonLink>
      ) : null}

      {callout?.title || callout?.text ? (
        <div className="mt-8 border-l-4 border-mustard bg-mustard-200 p-5">
          {callout.title ? (
            <p className="font-heading text-sm font-bold text-primary">{callout.title}</p>
          ) : null}
          {callout.text ? (
            <p className="mt-1.5 font-body text-sm leading-[1.6] text-text-muted">{callout.text}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function PaymentStep({
  payment,
  athMovilUrl,
  postalLines,
}: Pick<MembershipEnrollmentProps, "payment" | "athMovilUrl" | "postalLines">) {
  const { athMovil, paypal, check } = payment;
  const plans = paypal.plans ?? [];
  return (
    <div>
      <Eyebrow className="mb-3.5">{payment.eyebrow}</Eyebrow>
      <Heading scale="none" text={payment.heading} className={STEP_HEADING} />

      <div className="mt-7 space-y-4">
        <Card as="article" className="p-6 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="font-heading text-xl font-extrabold text-primary">{athMovil.title}</h3>
              <RichText
                data={athMovil.text}
                classes={{ paragraph: "mt-1 font-body text-sm text-text-muted" }}
              />
            </div>
            {athMovilUrl ? (
              <ButtonLink href={athMovilUrl} newTab variant="primaryMd">
                {athMovil.buttonLabel}
                <ButtonArrow />
              </ButtonLink>
            ) : null}
          </div>
        </Card>

        <Card as="article" className="p-6 sm:p-7">
          <h3 className="font-heading text-xl font-extrabold text-primary">{paypal.title}</h3>
          {plans.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {plans.map((plan) => (
                <a
                  key={plan.id ?? plan.url}
                  href={plan.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={BUTTON_VARIANTS.outlineTile}
                >
                  <span>{plan.name}</span>
                  <span className="whitespace-nowrap">{plan.price}</span>
                </a>
              ))}
            </div>
          ) : null}
        </Card>

        <Card as="article" className="p-6 sm:p-7">
          <h3 className="font-heading text-xl font-extrabold text-primary">{check.title}</h3>
          {check.text ? (
            <p className="mt-2 font-body text-sm leading-[1.65] text-text-muted">{check.text}</p>
          ) : null}
          {postalLines.length > 0 ? (
            <address className="mt-4 border-l-2 border-sky pl-4 font-body text-sm not-italic leading-[1.6] text-text">
              <AddressLines lines={postalLines} />
            </address>
          ) : null}
        </Card>
      </div>
    </div>
  );
}

/** Membership benefits, then the two enrollment steps (form, payment). */
export function MembershipEnrollment({
  benefits,
  form,
  payment,
  athMovilUrl,
  postalLines,
  settings,
}: MembershipEnrollmentProps) {
  return (
    <Section id={settings?.anchorId} tone="surface2" spacing="standard">
      <Container>
        <Benefits benefits={benefits} />
        <div className="grid gap-12 pt-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:pt-20">
          <FormStep form={form} />
          <PaymentStep payment={payment} athMovilUrl={athMovilUrl} postalLines={postalLines} />
        </div>
      </Container>
    </Section>
  );
}
