import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { ArrowGlyph } from "@/components/ui/icon";
import { Container, Ring, Section } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { getSiteSettings } from "@/lib/cms";
import { resolveLink } from "@/lib/links";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return { title: settings.notFound?.title || undefined };
}

/** 404 inside the site frame. Copy comes from the site-settings global (notFound group). */
export default async function NotFound() {
  const { notFound } = await getSiteSettings();
  const link = resolveLink(notFound?.link);

  return (
    <main id="main-content">
      <Section tone="primary" className="relative overflow-hidden px-6 pb-28 pt-24 text-white">
        <Ring
          className="-bottom-[80px] -right-[80px] h-[240px] w-[240px] border-2"
          style={{ borderColor: "rgba(255, 210, 88, 0.4)" }}
        />
        <Container className="relative">
          <Eyebrow tone="dark" as="span" className="block" style={{ marginBottom: 14 }}>
            {notFound?.eyebrow}
          </Eyebrow>
          <Heading
            as="h1"
            scale="none"
            text={notFound?.title}
            className="font-heading font-black text-white"
            style={{
              fontSize: "clamp(40px, 5.5vw, 64px)",
              letterSpacing: "-0.025em",
              lineHeight: 1,
              maxWidth: "18ch",
              marginBottom: 20,
            }}
          />
          {notFound?.text ? (
            <p
              className="font-body"
              style={{
                fontSize: 18,
                color: "var(--color-text-on-dark-muted)",
                maxWidth: "60ch",
                lineHeight: 1.55,
              }}
            >
              {notFound.text}
            </p>
          ) : null}
          {link ? (
            <div className="mt-9">
              <ButtonLink href={link.href} newTab={link.newTab} variant="accentLg">
                {link.label} <ArrowGlyph />
              </ButtonLink>
            </div>
          ) : null}
        </Container>
      </Section>
    </main>
  );
}
