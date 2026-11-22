import type { CtaBandBlock } from "@/payload-types";
import { resolveLink } from "@/lib/links";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/card";
import { ArrowGlyph, Icon } from "@/components/ui/icon";
import { Container, Ring, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type CtaBandProps = Omit<CtaBandBlock, "blockType" | "blockName" | "id">;

/* ───────────── primary ───────────── */

/** Dark band with rings, event facts and two large buttons stacked on the right. */
function PrimaryBand({
  eyebrow,
  heading,
  headingHighlight,
  body,
  meta,
  primaryAction,
  secondaryAction,
  settings,
}: CtaBandProps) {
  const primary = resolveLink(primaryAction);
  const secondary = resolveLink(secondaryAction);
  const facts = (meta ?? []).filter((item) => item.text);

  return (
    <Section id={settings?.anchorId} tone="primary" className="relative overflow-hidden text-white">
      <Ring
        className="-right-[180px] -top-[160px] h-[520px] w-[520px] border-2"
        style={{ borderColor: "rgba(117, 189, 240, 0.35)" }}
      />
      <Ring
        className="-right-[60px] -bottom-[150px] h-[340px] w-[340px] border-2"
        style={{ borderColor: "rgba(255, 210, 88, 0.5)" }}
      />

      <Container width="narrowContainer" className="relative">
        <div className="grid items-center gap-10 py-20 md:grid-cols-[1.6fr_auto] md:gap-12 md:py-[88px]">
          <div>
            <Eyebrow tone="dark" className="mb-3.5">
              {eyebrow}
            </Eyebrow>
            <Heading
              scale="none"
              text={heading}
              highlight={headingHighlight}
              className="font-heading font-black text-white"
              style={{
                fontSize: "clamp(28px, 3.4vw, 44px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                maxWidth: "20ch",
              }}
            />
            {body ? (
              <p
                className="mt-4 max-w-[52ch] font-body text-[17px] leading-[1.55]"
                style={{ color: "var(--color-text-on-dark-muted)" }}
              >
                {body}
              </p>
            ) : null}
            {facts.length > 0 ? (
              <div
                className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 font-heading text-[14px] font-semibold"
                style={{ color: "var(--color-text-on-dark-muted)" }}
              >
                {facts.map((fact) => (
                  <span key={fact.id ?? fact.text} className="inline-flex items-center gap-2">
                    {fact.icon ? (
                      <Icon
                        name={fact.icon}
                        className="h-[18px] w-[18px] text-mustard"
                        strokeWidth={1.75}
                      />
                    ) : (
                      <span aria-hidden="true">·</span>
                    )}
                    {fact.text}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          {primary || secondary ? (
            <div className="flex flex-col gap-3 md:items-end md:self-center">
              {primary ? (
                <ButtonLink href={primary.href} newTab={primary.newTab} variant="accentLg">
                  {primary.label} <ArrowGlyph />
                </ButtonLink>
              ) : null}
              {secondary ? (
                <ButtonLink
                  href={secondary.href}
                  newTab={secondary.newTab}
                  variant="inverseOutlineLg"
                >
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────── mustard ───────────── */

/** Mustard band with a large primary button. */
function MustardBand({ eyebrow, heading, body, primaryAction, settings }: CtaBandProps) {
  const primary = resolveLink(primaryAction);

  return (
    <Section id={settings?.anchorId} tone="mustard" className="relative overflow-hidden">
      <Container width="narrowContainer" className="relative">
        <div className="grid items-center gap-12 py-20 md:grid-cols-[1.5fr_auto] md:gap-12 md:py-[72px]">
          <div>
            <Eyebrow tone="mustard" className="mb-3">
              {eyebrow}
            </Eyebrow>
            <Heading
              scale="none"
              text={heading}
              className="font-heading font-black text-primary"
              style={{
                fontSize: "clamp(28px, 3.4vw, 40px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                maxWidth: "24ch",
              }}
            />
            {body ? (
              <p
                className="mt-3.5 max-w-[50ch] font-body text-base"
                style={{ color: "var(--color-primary-700)" }}
              >
                {body}
              </p>
            ) : null}
          </div>
          {primary ? (
            <ButtonLink href={primary.href} newTab={primary.newTab} variant="primaryLg">
              {primary.label} <ArrowGlyph />
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

/* ───────────── mustardIcon ───────────── */

/** Mustard band with a circular icon chip on the left (call for papers). */
function MustardIconBand({ icon, eyebrow, heading, body, primaryAction, settings }: CtaBandProps) {
  const primary = resolveLink(primaryAction);

  return (
    <Section id={settings?.anchorId} tone="mustard" spacing="band" className="scroll-mt-[72px]">
      <Container className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-center">
        {icon ? (
          <Chip variant="circle56Primary">
            <Icon name={icon} className="h-6 w-6" strokeWidth={1.7} />
          </Chip>
        ) : null}
        <div>
          <Eyebrow tone="mustardDeep" className="mb-3">
            {eyebrow}
          </Eyebrow>
          <Heading
            scale="none"
            text={heading}
            className="max-w-[22ch] text-[32px] font-black text-primary md:text-[40px]"
          />
          {body ? (
            <p className="mt-4 max-w-[62ch] font-body text-[16px] text-primary-700">{body}</p>
          ) : null}
        </div>
        {primary ? (
          <ButtonLink href={primary.href} newTab={primary.newTab} variant="primaryMdTall">
            {primary.label}
            <Icon name="arrow-right" className="h-4 w-4" />
          </ButtonLink>
        ) : null}
      </Container>
    </Section>
  );
}

/* ───────────── navy ───────────── */

/** Dark navy band with a tall mustard button (conference registration step). */
function NavyBand({ eyebrow, heading, body, primaryAction, settings }: CtaBandProps) {
  const primary = resolveLink(primaryAction);

  return (
    <Section id={settings?.anchorId} tone="primary900" spacing="compact" className="text-white">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Eyebrow tone="dark" className="mb-3">
            {eyebrow}
          </Eyebrow>
          <Heading
            scale="none"
            text={heading}
            className="max-w-[18ch] font-heading text-3xl font-black leading-tight text-white sm:text-4xl"
          />
          {body ? <p className="mt-4 max-w-[58ch] text-text-on-dark-muted">{body}</p> : null}
        </div>
        {primary ? (
          <ButtonLink href={primary.href} newTab={primary.newTab} variant="accentMdTall">
            {primary.label}
            <Icon name={primary.newTab ? "arrow-up-right" : "arrow-right"} className="h-4 w-4" />
          </ButtonLink>
        ) : null}
      </Container>
    </Section>
  );
}

export function CtaBand(props: CtaBandProps) {
  switch (props.variant) {
    case "primary":
      return <PrimaryBand {...props} />;
    case "mustard":
      return <MustardBand {...props} />;
    case "mustardIcon":
      return <MustardIconBand {...props} />;
    case "navy":
      return <NavyBand {...props} />;
    default:
      return null;
  }
}
