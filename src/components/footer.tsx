import Image from "next/image";
import { CmsLink } from "./cms-link";
import type { Footer as FooterData, SiteSetting } from "@/payload-types";
import logoWhiteTagline from "../../public/logo-white-tagline.png";

function SocialIcon({ platform }: { readonly platform: string }) {
  if (platform === "instagram")
    return (
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
    );
  if (platform === "youtube")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22 6c-.3-1-1-1.7-2-2C18 3.5 6 3.5 4 4c-1 .3-1.7 1-2 2-.5 2-.5 10 0 12 .3 1 1 1.7 2 2 2 .5 14 .5 16 0 1-.3 1.7-1 2-2 .5-2 .5-10 0-12ZM10 16V8l6 4-6 4Z" />
      </svg>
    );
  if (platform === "facebook")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.6C10.7 0 9 1.7 9 5v3z" />
      </svg>
    );
  if (platform === "linkedin")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v15.5H.22V8zm7.27 0h4.37v2.13h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.74h-4.56v-7.75c0-1.85-.04-4.23-2.58-4.23-2.58 0-2.98 2.01-2.98 4.1v7.88H7.49V8z" />
      </svg>
    );
  return <span aria-hidden="true">X</span>;
}

export default function Footer({
  data,
  settings,
}: {
  readonly data: FooterData;
  readonly settings: SiteSetting;
}) {
  const address = settings.postalAddress;
  return (
    <footer className="bg-primary-900 px-6 pb-10 pt-20 text-text-on-dark-muted">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src={logoWhiteTagline}
              alt="ADPUPR"
              width={120}
              height={120}
              className="mb-3 -ml-2 block h-[120px] w-auto"
            />
            <p className="max-w-[36ch] font-body text-sm leading-[1.6]">{data.description}</p>
            <div className="mt-4 flex gap-2.5">
              {settings.social?.map((social) => {
                return (
                  <CmsLink
                    key={social.id ?? social.platform}
                    url={social.url}
                    aria-label={social.platform}
                    className="inline-flex h-9 w-9 items-center justify-center rounded bg-text-on-dark/5 text-text-on-dark transition-colors hover:bg-mustard hover:text-primary"
                  >
                    <SocialIcon platform={social.platform} />
                  </CmsLink>
                );
              })}
            </div>
          </div>
          {data.columns?.map((column) => (
            <div key={column.id ?? column.heading}>
              <h2 className="mb-4 font-heading text-[12.5px] font-bold uppercase tracking-[0.12em] text-text-on-dark">
                {column.heading}
              </h2>
              <ul className="flex flex-col gap-2.5">
                {column.links?.map((link) => (
                  <li key={link.id ?? link.url}>
                    <CmsLink
                      url={link.url}
                      className="font-body text-sm transition-colors hover:text-mustard"
                    >
                      {link.label}
                    </CmsLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="grid gap-8 border-y border-text-on-dark/15 py-8 md:grid-cols-3">
          <div>
            <h2 className="mb-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sky">
              Direcci&oacute;n
            </h2>
            <address className="font-body text-sm not-italic leading-[1.6] text-text-on-dark">
              ADPUPR
              <br />
              {address?.street}
              <br />
              {address?.city}, {address?.region} {address?.postalCode}
            </address>
          </div>
          <div>
            <h2 className="mb-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sky">
              Correo electr&oacute;nico
            </h2>
            <div className="font-body text-sm leading-[1.6] text-text-on-dark">
              {settings.emails?.map(({ id, email }) => (
                <a
                  key={id ?? email}
                  href={`mailto:${email}`}
                  className="block break-all underline decoration-text-on-dark/30"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-2 font-body text-[12.5px] sm:flex-row sm:items-center">
          <span>
            &copy; {new Date().getFullYear()} {data.copyright}
          </span>
          <span>{data.location}</span>
        </div>
      </div>
    </footer>
  );
}
