import type { ContactSectionBlock } from "@/payload-types";
import { Chip } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/layout";
import { RichText } from "@/components/ui/rich-text";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { AddressLines } from "./address-lines";
import { ContactSectionForm } from "./contact-section-form";

export interface ContactProfile {
  readonly label: string;
  readonly handle: string | null;
  readonly url: string;
}

export type ContactSectionProps = Omit<ContactSectionBlock, "blockType" | "blockName" | "id"> & {
  /** Form recipient: the block override, else the first site email. */
  readonly recipient: string | null;
  /** From site settings → contact. */
  readonly emails: readonly string[];
  readonly postalLines: readonly string[];
  /** Site settings profiles, in the order the block lists them. */
  readonly profiles: readonly ContactProfile[];
};

function Channels({
  channels,
  emails,
  postalLines,
  profiles,
}: Pick<ContactSectionProps, "channels" | "emails" | "postalLines" | "profiles">) {
  return (
    <aside className="lg:border-l lg:border-border lg:pl-10" aria-label={channels.ariaLabel}>
      <div className="lg:sticky lg:top-28">
        <Eyebrow as="span" className="mb-5 block">
          {channels.eyebrow}
        </Eyebrow>

        <div className="border-y border-border py-6">
          <div className="flex gap-4">
            <Chip variant="square40">
              <Icon name="mail" className="h-5 w-5" strokeWidth={1.7} />
            </Chip>
            <div>
              <h3 className="font-heading text-sm font-bold text-text">{channels.emailHeading}</h3>
              <div className="mt-2 space-y-1 font-body text-sm">
                {emails.map((email) => (
                  <a
                    key={email}
                    className="block break-all text-text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-border py-6">
          <div className="flex gap-4">
            <Chip variant="square40">
              <Icon name="map-pin" className="h-5 w-5" strokeWidth={1.7} />
            </Chip>
            <div>
              <h3 className="font-heading text-sm font-bold text-text">{channels.postalHeading}</h3>
              <address className="mt-2 font-body text-sm not-italic leading-relaxed text-text-muted">
                <AddressLines lines={postalLines} />
              </address>
            </div>
          </div>
        </div>

        {profiles.length > 0 ? (
          <div className="pt-9">
            <h3 className="font-heading text-lg font-extrabold text-text">
              {channels.socialHeading}
            </h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {profiles.map((profile) => (
                <li key={profile.url}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <span>
                      <span className="block font-heading text-sm font-bold text-text transition-colors group-hover:text-primary">
                        {profile.label}
                      </span>
                      {profile.handle ? (
                        <span className="mt-0.5 block font-body text-xs text-text-muted">
                          {profile.handle}
                        </span>
                      ) : null}
                    </span>
                    <Icon
                      name="external-link"
                      className="h-4 w-4 shrink-0 text-primary-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </aside>
  );
}

/**
 * Contact page body: intro and mailto form on the left, direct channels on the right.
 * The `section` class is the design system's unlayered `.section` rule; it overrides
 * `px-6`, so the section has no horizontal padding (as on the original page).
 */
export function ContactSection({
  eyebrow,
  heading,
  body,
  form,
  channels,
  recipient,
  emails,
  postalLines,
  profiles,
  settings,
}: ContactSectionProps) {
  return (
    <Section id={settings?.anchorId} tone="bg" className="section px-6">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-20">
        <div>
          <Eyebrow as="span" className="mb-4 block">
            {eyebrow}
          </Eyebrow>
          <Heading text={heading} className="max-w-[16ch] text-text" />
          <RichText
            data={body}
            className="mt-7 max-w-[66ch] space-y-5 font-body text-[17px] leading-relaxed text-text-muted"
          />

          <div className="mt-12">
            <ContactSectionForm copy={form} recipient={recipient} />
          </div>
        </div>

        <Channels
          channels={channels}
          emails={emails}
          postalLines={postalLines}
          profiles={profiles}
        />
      </div>
    </Section>
  );
}
