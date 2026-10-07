import { ArrowUpRight, Check, ExternalLink, Mail, MapPin } from "lucide-react";
import ConferenceAgenda from "@/components/conference-agenda";
import ContactForm from "@/components/contact-form";
import { CmsLink } from "@/components/cms-link";
import { Icon } from "@/components/icon";
import ResourceList from "@/components/resource-library";
import { RichText } from "@/components/rich-text";
import { getDocumentCategories, getDocuments, getSiteSettings } from "@/lib/cms";
import { renderInline } from "@/lib/format";
import { populated, uploadUrl } from "@/lib/media";
import type {
  AgendaBlock,
  BenefitsPanelBlock,
  ContactSectionBlock,
  EventDetailsBlock,
  PricingBlock,
  ResourceLibraryBlock,
  SignupStepsBlock,
  SiteSetting,
} from "@/payload-types";
import { backgroundClass, SectionHeading } from "./shared";

const PAYMENT_BUTTON =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 font-heading text-sm font-bold text-text-on-dark transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function PostalAddress({ address }: { readonly address: SiteSetting["postalAddress"] }) {
  return (
    <address className="whitespace-pre-line font-body text-sm not-italic leading-relaxed">
      {address?.street}
      <br />
      {address?.city}, {address?.region} {address?.postalCode}
    </address>
  );
}

export function EventDetails({ block }: { readonly block: EventDetailsBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 py-16 sm:py-20`}
    >
      <div className="mx-auto grid max-w-[1200px] overflow-hidden rounded-lg border border-border shadow-[var(--shadow-card)] md:grid-cols-3">
        {block.items?.map((item) => (
          <div
            key={item.id ?? item.label}
            className="flex gap-4 border-b border-border p-6 last:border-b-0 md:border-b-0 md:border-r md:p-7 md:last:border-r-0"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-primary">
              <Icon icon={item.icon} className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="mb-1 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">
                {item.label}
              </p>
              <p className="text-sm font-semibold leading-relaxed text-primary">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Agenda({ block }: { readonly block: AgendaBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background)} px-6 pb-16 sm:pb-20`}
    >
      <div className="mx-auto max-w-[1200px]">
        <ConferenceAgenda block={block} />
      </div>
    </section>
  );
}

export function BenefitsPanel({ block }: { readonly block: BenefitsPanelBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      className="bg-primary px-6 py-16 text-text-on-dark sm:py-20"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 lg:grid-cols-[4fr_6fr] lg:gap-20">
          <div>
            {block.eyebrow ? <p className="eyebrow eyebrow-on-dark mb-3">{block.eyebrow}</p> : null}
            <h2 className="h-section max-w-[20ch] text-text-on-dark">{block.heading}</h2>
            {block.highlight?.value ? (
              <div className="mt-10 border-l-4 border-mustard pl-6">
                <p className="font-heading text-base text-text-on-dark-muted">
                  {block.highlight.label}
                </p>
                <p className="my-3 font-heading text-5xl font-semibold tabular-nums tracking-tight text-mustard">
                  {block.highlight.value}
                </p>
                <p className="max-w-[35ch] text-base text-text-on-dark-muted sm:text-sm">
                  {block.highlight.text}
                </p>
              </div>
            ) : null}
          </div>
          <dl className="grid gap-x-8 sm:grid-cols-2">
            {block.items?.map((item) => (
              <div key={item.id ?? item.title} className="border-t border-text-on-dark/20 py-5">
                <dt className="flex items-start gap-3 font-heading text-base font-semibold text-text-on-dark">
                  <Icon
                    icon={item.icon}
                    className="size-6 shrink-0 stroke-sky"
                    strokeWidth={1.75}
                  />
                  <span className="min-w-0">{item.title}</span>
                </dt>
                <dd className="mt-2 pl-9 text-base text-text-on-dark-muted sm:text-sm">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        {block.note ? (
          <p className="mt-8 border-t border-text-on-dark/20 pt-6 text-base text-text-on-dark-muted sm:text-sm">
            {renderInline(block.note, "font-semibold text-mustard")}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function Pricing({ block }: { readonly block: PricingBlock }) {
  return (
    <section
      id={block.anchor || undefined}
      tabIndex={-1}
      className={`${backgroundClass(block.background, "surface")} px-6 py-16 sm:py-24`}
    >
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          intro={block.intro}
          className="mb-12 max-w-2xl"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {block.plans?.map((plan) => (
            <article
              key={plan.id ?? plan.name}
              className={`relative flex flex-col rounded-lg border bg-surface p-7 shadow-[var(--shadow-card)] sm:p-8 ${plan.featured ? "border-primary ring-1 ring-primary" : "border-border"}`}
            >
              {plan.featured && plan.badge ? (
                <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark">
                  {plan.badge}
                </span>
              ) : null}
              <h3 className="font-heading text-base font-bold text-primary">{plan.name}</h3>
              <p className="my-5 font-heading text-5xl font-black tracking-[-0.03em] text-primary">
                {plan.price}
              </p>
              {plan.note ? (
                <p className="mb-8 flex gap-2 text-sm text-text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  {plan.note}
                </p>
              ) : null}
              <CmsLink
                url={plan.url}
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 font-heading text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${plan.featured ? "bg-primary text-text-on-dark hover:bg-primary-700" : "border border-primary text-primary hover:bg-sky-50"}`}
              >
                {plan.buttonLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </CmsLink>
            </article>
          ))}
        </div>
        {block.callout?.title ? (
          <div className="mt-8 overflow-hidden rounded-lg bg-primary text-text-on-dark shadow-[var(--shadow-card)]">
            <div className="grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
              <div className="flex gap-5 p-7 sm:p-8">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-50 text-primary">
                  <Icon icon={block.callout.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="mb-2 font-heading text-xl font-bold text-text-on-dark">
                    {block.callout.title}
                  </h3>
                  <p className="max-w-[65ch] text-sm leading-relaxed text-text-on-dark-muted sm:text-base">
                    {block.callout.text}
                  </p>
                </div>
              </div>
              {block.callout.link?.url && block.callout.link.label ? (
                <div className="border-t border-text-on-dark/15 p-7 md:border-l md:border-t-0 md:p-8">
                  <CmsLink
                    url={block.callout.link.url}
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-sm bg-mustard px-6 py-3 font-heading text-sm font-bold text-primary hover:bg-mustard-600"
                  >
                    {block.callout.link.label}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </CmsLink>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {block.footnote ? <p className="mt-7 text-sm text-text-faint">{block.footnote}</p> : null}
      </div>
    </section>
  );
}

export async function SignupSteps({ block }: { readonly block: SignupStepsBlock }) {
  const settings = await getSiteSettings();
  const form = block.formStep;
  const payment = block.paymentStep;
  return (
    <section
      id={block.anchor || undefined}
      className={`${backgroundClass(block.background, "surface-2")} px-6 py-16 md:py-20`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div>
          <SectionHeading eyebrow={form?.eyebrow} heading={form?.heading} />
          {form?.text ? (
            <p className="mt-5 max-w-[48ch] font-body text-base leading-[1.7] text-text-muted">
              {form.text}
            </p>
          ) : null}
          {form?.link?.url && form.link.label ? (
            <CmsLink url={form.link.url} className={`${PAYMENT_BUTTON} mt-7`}>
              {form.link.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </CmsLink>
          ) : null}
          {form?.noteTitle || form?.noteText ? (
            <div className="mt-8 border-l-4 border-mustard bg-mustard-200 p-5">
              <p className="font-heading text-sm font-bold text-primary">{form.noteTitle}</p>
              <p className="mt-1.5 font-body text-sm leading-[1.6] text-text-muted">
                {form.noteText}
              </p>
            </div>
          ) : null}
        </div>
        <div>
          <SectionHeading eyebrow={payment?.eyebrow} heading={payment?.heading} />
          <div className="mt-7 space-y-4">
            {payment?.methods?.map((method) => (
              <article key={method.id ?? method.title} className="card p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-primary">
                      {method.title}
                    </h3>
                    {method.description ? (
                      <p className="mt-2 font-body text-sm leading-[1.65] text-text-muted">
                        {renderInline(method.description)}
                      </p>
                    ) : null}
                  </div>
                  {method.link?.url && method.link.label ? (
                    <CmsLink url={method.link.url} className={PAYMENT_BUTTON}>
                      {method.link.label}
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </CmsLink>
                  ) : null}
                </div>
                {method.options?.length ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {method.options.map((option) => (
                      <CmsLink
                        key={option.id ?? option.url}
                        url={option.url}
                        className="flex min-h-16 items-center justify-between gap-4 rounded-sm border border-primary px-4 py-3 font-heading text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-text-on-dark"
                      >
                        <span>{option.label}</span>
                        <span className="whitespace-nowrap">{option.price}</span>
                      </CmsLink>
                    ))}
                  </div>
                ) : null}
                {method.showPostalAddress ? (
                  <div className="mt-4 border-l-2 border-sky pl-4">
                    <PostalAddress address={settings.postalAddress} />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function ContactSection({ block }: { readonly block: ContactSectionBlock }) {
  const settings = await getSiteSettings();
  const recipient = settings.emails?.[0]?.email;
  return (
    <section id={block.anchor || undefined} className="bg-bg px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-20">
        <div>
          <SectionHeading eyebrow={block.eyebrow} heading={block.heading} />
          <RichText
            data={block.body}
            className="mt-7 max-w-[66ch] font-body text-[17px] leading-relaxed text-text-muted"
          />
          {recipient && block.form ? (
            <div className="mt-12">
              <ContactForm recipient={recipient} {...block.form} />
            </div>
          ) : null}
        </div>
        <aside className="lg:border-l lg:border-border lg:pl-10" aria-label="Canales de contacto">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow mb-5 block">Canales directos</span>
            <div className="flex gap-4 border-y border-border py-6">
              <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="font-heading text-sm font-bold">Correo electr&oacute;nico</h3>
                <div className="mt-2 space-y-1 font-body text-sm">
                  {settings.emails?.map(({ id, email }) => (
                    <a
                      key={id ?? email}
                      className="block break-all text-text-muted underline underline-offset-4"
                      href={`mailto:${email}`}
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 border-b border-border py-6">
              <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="mb-2 font-heading text-sm font-bold">Direcci&oacute;n postal</h3>
                <PostalAddress address={settings.postalAddress} />
              </div>
            </div>
            <div className="pt-9">
              <h3 className="font-heading text-lg font-extrabold">S&iacute;guenos</h3>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {settings.social?.map((social) => (
                  <li key={social.id ?? social.platform}>
                    <CmsLink
                      url={social.url}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <span>
                        <span className="block font-heading text-sm font-bold capitalize">
                          {social.platform}
                        </span>
                        <span className="mt-0.5 block font-body text-xs text-text-muted">
                          {social.handle}
                        </span>
                      </span>
                      <ExternalLink
                        className="h-4 w-4 shrink-0 text-primary-300"
                        aria-hidden="true"
                      />
                    </CmsLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export async function ResourceLibrary({ block }: { readonly block: ResourceLibraryBlock }) {
  const [documents, categories] = await Promise.all([getDocuments(), getDocumentCategories()]);
  const resources = documents.flatMap((doc) => {
    const category = populated(doc.category);
    if (!doc.url || !category) return [];
    const href = doc.url.includes(".blob.vercel-storage.com/")
      ? `${doc.url}?download=1`
      : (uploadUrl(doc.url) ?? doc.url);
    return [{ id: doc.id, title: doc.title, category: category.title, href }];
  });
  return (
    <section id={block.anchor || undefined} className="bg-bg pt-20 md:pt-28">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:pb-20">
        <SectionHeading eyebrow={block.eyebrow} heading={block.heading} />
        <RichText
          data={block.body}
          className="border-l-4 border-mustard pl-6 font-body text-[17px] leading-[1.75] text-text-muted sm:pl-8"
        />
      </div>
      <ResourceList resources={resources} categories={categories.map(({ title }) => title)} />
    </section>
  );
}
