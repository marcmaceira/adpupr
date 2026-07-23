import type { ReactNode } from "react"

interface FooterColumn {
  readonly heading: string
  readonly links: ReadonlyArray<{ readonly label: string; readonly href: string }>
}

const COLUMNS: readonly FooterColumn[] = [
  {
    heading: "Asociación",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Misión y Visión", href: "/nosotros/quienes-somos" },
      {
        label: "Junta de Directores",
        href: "/nosotros/estructura-organizacional",
      },
      {
        label: "Comités de Trabajo",
        href: "/nosotros/estructura-organizacional#comites",
      },
    ],
  },
  {
    heading: "Recursos",
    links: [
      { label: "Boletines", href: "/comunicaciones" },
      { label: "Comunicaciones", href: "/comunicaciones" },
      { label: "Membresía", href: "/membresia" },
    ],
  },
  {
    heading: "Comunidad",
    links: [
      { label: "Hacerme miembro", href: "/membresia" },
      { label: "info@adpupr.com", href: "mailto:info@adpupr.com" },
      {
        label: "asociacion.adpupr@gmail.com",
        href: "mailto:asociacion.adpupr@gmail.com",
      },
    ],
  },
] as const

interface SocialLink {
  readonly label: string
  readonly href: string
  readonly icon: ReactNode
}

const FacebookIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.6C10.7 0 9 1.7 9 5v3z" />
  </svg>
)

const InstagramIcon = (
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
)

const LinkedInIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v15.5H.22V8zm7.27 0h4.37v2.13h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.74h-4.56v-7.75c0-1.85-.04-4.23-2.58-4.23-2.58 0-2.98 2.01-2.98 4.1v7.88H7.49V8z" />
  </svg>
)

const SOCIAL: readonly SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61563728602523",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/adpupr/",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/asociaci%C3%B3n-de-administraci%C3%B3n-p%C3%BAblica-de-puerto-rico-adpupr-7b7290316/",
    icon: LinkedInIcon,
  },
] as const

export default function Footer() {
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white-tagline.png"
              alt="ADPUPR — Asociación de Administración Pública de Puerto Rico"
              width={120}
              height={120}
              className="mb-3 -ml-2 block h-[120px] w-auto"
            />
            <p
              className="max-w-[36ch] font-body text-sm leading-[1.6]"
              style={{ color: "var(--color-text-on-dark-muted)" }}
            >
              Asociaci&oacute;n de Administraci&oacute;n P&uacute;blica de
              Puerto Rico &mdash; comprometida con la sana administraci&oacute;n
              p&uacute;blica, la educaci&oacute;n c&iacute;vica y la
              investigaci&oacute;n aplicada al servicio p&uacute;blico.
            </p>
            <div className="mt-4 flex gap-2.5">
              {SOCIAL.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded text-white transition-colors hover:bg-mustard hover:text-primary"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h5
                className="mb-4 font-heading text-[12.5px] font-bold uppercase text-white"
                style={{ letterSpacing: "0.12em" }}
              >
                {col.heading}
              </h5>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label + link.href}>
                    <a
                      href={link.href}
                      className="font-body text-sm transition-colors hover:text-mustard"
                      style={{ color: "var(--color-text-on-dark-muted)" }}
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
          style={{
            borderTop: "1px solid rgba(185,196,220,0.15)",
            borderBottom: "1px solid rgba(185,196,220,0.15)",
          }}
        >
          <div>
            <div
              className="mb-2.5 font-heading text-[11px] font-bold uppercase"
              style={{
                color: "var(--color-sky)",
                letterSpacing: "0.14em",
              }}
            >
              Direcci&oacute;n
            </div>
            <div className="font-body text-sm leading-[1.6] text-white">
              ADPUPR
              <br />
              PO BOX 1269
              <br />
              Trujillo Alto, PR 00977
            </div>
          </div>
          <div>
            <div
              className="mb-2.5 font-heading text-[11px] font-bold uppercase"
              style={{
                color: "var(--color-sky)",
                letterSpacing: "0.14em",
              }}
            >
              Correo electr&oacute;nico
            </div>
            <div className="font-body text-sm leading-[1.6] text-white">
              <a
                href="mailto:info@adpupr.com"
                className="text-white underline"
                style={{ textDecorationColor: "rgba(255,255,255,0.3)" }}
              >
                info@adpupr.com
              </a>
              <br />
              <a
                href="mailto:asociacion.adpupr@gmail.com"
                className="text-white underline"
                style={{ textDecorationColor: "rgba(255,255,255,0.3)" }}
              >
                asociacion.adpupr@gmail.com
              </a>
            </div>
          </div>
          <div>
            <div
              className="mb-2.5 font-heading text-[11px] font-bold uppercase"
              style={{
                color: "var(--color-sky)",
                letterSpacing: "0.14em",
              }}
            >
              Suscr&iacute;bete
            </div>
            <div
              className="mb-2.5 font-body text-sm leading-[1.6]"
              style={{ color: "var(--color-text-on-dark-muted)" }}
            >
              Bolet&iacute;n mensual con convocatorias y publicaciones.
            </div>
            <form
              action="mailto:info@adpupr.com"
              method="post"
              encType="text/plain"
              className="flex"
            >
              <label htmlFor="footer-newsletter" className="sr-only">
                Correo electr&oacute;nico
              </label>
              <input
                id="footer-newsletter"
                name="email"
                type="email"
                required
                placeholder="su@correo.com"
                className="flex-1 rounded-l-sm px-3 py-2.5 font-body text-[13px] text-white outline-none"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(185,196,220,0.25)",
                  borderRight: "none",
                }}
              />
              <button
                type="submit"
                className="rounded-r-sm bg-mustard px-4 py-2.5 font-heading text-[13px] font-semibold text-primary transition-colors hover:bg-mustard-600"
              >
                Unirme
              </button>
            </form>
          </div>
        </div>

        <div
          className="mt-8 flex flex-col items-start justify-between gap-2 font-body text-[12.5px] sm:flex-row sm:items-center"
          style={{ color: "var(--color-text-on-dark-muted)" }}
        >
          <span>
            &copy; {new Date().getFullYear()} ADPUPR &middot; Todos los derechos
            reservados
          </span>
          <span>San Juan, Puerto Rico</span>
        </div>
      </div>
    </footer>
  )
}
