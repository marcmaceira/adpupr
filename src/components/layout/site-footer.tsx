import { Fragment, type ReactNode } from "react";
import { MediaImage } from "@/components/ui/media-image";
import type { FooterData, SocialNetwork } from "@/lib/data/chrome";

export type SiteFooterProps = FooterData;

const SOCIAL_ICONS: Record<SocialNetwork, ReactNode> = {
  facebook: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.6C10.7 0 9 1.7 9 5v3z" />
    </svg>
  ),
  instagram: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v15.5H.22V8zm7.27 0h4.37v2.13h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.74h-4.56v-7.75c0-1.85-.04-4.23-2.58-4.23-2.58 0-2.98 2.01-2.98 4.1v7.88H7.49V8z" />
    </svg>
  ),
  youtube: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
    </svg>
  ),
};

const CONTACT_LABEL_STYLE = { color: "var(--color-sky)", letterSpacing: "0.14em" } as const;
const MUTED_STYLE = { color: "var(--color-text-on-dark-muted)" } as const;
const RULE = "1px solid rgba(185,196,220,0.15)";

export function SiteFooter({
  logo,
  blurb,
  socials,
  columns,
  addressLabel,
  addressLines,
  emailLabel,
  emails,
  copyright,
  location,
}: SiteFooterProps) {
  return (
    <footer
      className="px-6 pb-10 pt-20"
      style={{
        background: "var(--color-primary-900)",
        color: "var(--color-text-on-dark-muted)",
      }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <MediaImage
              media={logo}
              width={120}
              height={120}
              className="mb-3 -ml-2 block h-[120px] w-auto"
            />
            {blurb ? (
              <p className="max-w-[36ch] font-body text-sm leading-[1.6]" style={MUTED_STYLE}>
                {blurb}
              </p>
            ) : null}
            {socials.length > 0 ? (
              <div className="mt-4 flex gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.network + social.url}
                    href={social.url}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 w-9 items-center justify-center rounded text-white transition-colors hover:bg-mustard hover:text-primary"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    {SOCIAL_ICONS[social.network]}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {columns.map((column) => (
            <div key={column.key}>
              <h5
                className="mb-4 font-heading text-[12.5px] font-bold uppercase text-white"
                style={{ letterSpacing: "0.12em" }}
              >
                {column.heading}
              </h5>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label + link.href}>
                    <a
                      href={link.href}
                      target={link.newTab ? "_blank" : undefined}
                      rel={link.newTab ? "noopener noreferrer" : undefined}
                      className="font-body text-sm transition-colors hover:text-mustard"
                      style={MUTED_STYLE}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="grid gap-8 py-8 md:grid-cols-3"
          style={{ borderTop: RULE, borderBottom: RULE }}
        >
          <div>
            <div
              className="mb-2.5 font-heading text-[11px] font-bold uppercase"
              style={CONTACT_LABEL_STYLE}
            >
              {addressLabel}
            </div>
            <div className="font-body text-sm leading-[1.6] text-white">
              {addressLines.map((line, index) => (
                // Address lines are positional and never reorder.
                // oxlint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  {index > 0 ? <br /> : null}
                  {line}
                </Fragment>
              ))}
            </div>
          </div>
          <div>
            <div
              className="mb-2.5 font-heading text-[11px] font-bold uppercase"
              style={CONTACT_LABEL_STYLE}
            >
              {emailLabel}
            </div>
            <div className="font-body text-sm leading-[1.6] text-white">
              {emails.map((email, index) => (
                <Fragment key={email}>
                  {index > 0 ? <br /> : null}
                  <a
                    href={`mailto:${email}`}
                    className="text-white underline"
                    style={{ textDecorationColor: "rgba(255,255,255,0.3)" }}
                  >
                    {email}
                  </a>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col items-start justify-between gap-2 font-body text-[12.5px] sm:flex-row sm:items-center"
          style={MUTED_STYLE}
        >
          <span>{copyright}</span>
          <span>{location}</span>
        </div>
      </div>
    </footer>
  );
}
