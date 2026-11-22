import type { PricingTableBlock } from "@/payload-types";
import { cx } from "@/lib/cx";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Container, SECTION_SPACING, SECTION_TONES } from "@/components/ui/layout";
import { Eyebrow, Heading } from "@/components/ui/typography";

export type PricingTableProps = Omit<PricingTableBlock, "blockType" | "blockName" | "id"> & {
  /** ATH Móvil payment link from the site settings. */
  readonly athMovilUrl?: string | null;
};

type Price = NonNullable<PricingTableBlock["prices"]>[number];

function PriceCard({ price }: { readonly price: Price }) {
  return (
    <article
      className={cx(
        "relative flex flex-col rounded-lg border bg-surface p-7 shadow-[var(--shadow-card)] sm:p-8",
        price.featured ? "border-primary ring-1 ring-primary" : "border-border",
      )}
    >
      {price.featured && price.badge ? (
        <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-white">
          {price.badge}
        </span>
      ) : null}
      <h3 className="font-heading text-base font-bold text-primary">{price.name}</h3>
      <p className="my-5 font-heading text-5xl font-black tracking-[-0.03em] text-primary">
        {price.price}
      </p>
      {price.note ? (
        <p className="mb-8 flex gap-2 text-sm text-text-muted">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-success" strokeWidth={2.25} />
          {price.note}
        </p>
      ) : null}
      <ButtonLink
        href={price.paymentUrl}
        newTab
        variant={price.featured ? "priceSolid" : "priceOutline"}
      >
        {price.buttonLabel}
        <Icon name="arrow-up-right" className="h-4 w-4" />
      </ButtonLink>
    </article>
  );
}

/** Registration rates with PayPal buttons, the ATH Móvil banner and a closing note. */
export function PricingTable({
  eyebrow,
  heading,
  intro,
  prices,
  athMovil,
  footnote,
  settings,
  athMovilUrl,
}: PricingTableProps) {
  const anchorId = settings?.anchorId || undefined;
  const hasAth = Boolean(
    athMovil?.title || athMovil?.text || (athMovil?.buttonLabel && athMovilUrl),
  );

  return (
    // A raw section: the anchor target is focusable (tabIndex -1) like the original.
    <section
      id={anchorId}
      tabIndex={anchorId ? -1 : undefined}
      className={cx(SECTION_SPACING.compactTall, SECTION_TONES.surface)}
    >
      <Container>
        <div className="mb-12 max-w-2xl">
          <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          <Heading text={heading} className="mb-4 text-primary" />
          {intro ? <p className="text-text-muted">{intro}</p> : null}
        </div>

        {prices && prices.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {prices.map((price) => (
              <PriceCard key={price.id ?? price.name} price={price} />
            ))}
          </div>
        ) : null}

        {hasAth ? (
          <div className="mt-8 overflow-hidden rounded-lg bg-primary text-white shadow-[var(--shadow-card)]">
            <div className="grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="flex gap-5 p-7 sm:p-8">
                <Chip variant="circle48">
                  <Icon name="smartphone" className="h-6 w-6" strokeWidth={1.75} />
                </Chip>
                <div>
                  {athMovil?.title ? (
                    <h3 className="mb-2 font-heading text-xl font-bold text-white">
                      {athMovil.title}
                    </h3>
                  ) : null}
                  {athMovil?.text ? (
                    <p className="max-w-[65ch] text-sm leading-relaxed text-text-on-dark-muted sm:text-base">
                      {athMovil.text}
                    </p>
                  ) : null}
                </div>
              </div>
              {athMovil?.buttonLabel && athMovilUrl ? (
                <div className="border-t border-white/15 p-7 md:border-l md:border-t-0 md:p-8">
                  <ButtonLink href={athMovilUrl} newTab variant="accentMdBlock">
                    {athMovil.buttonLabel}
                    <Icon name="arrow-up-right" className="h-4 w-4" />
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        {footnote ? <p className="mt-7 text-sm text-text-faint">{footnote}</p> : null}
      </Container>
    </section>
  );
}
