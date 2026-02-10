const QUICK_LINKS = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Objetivos", href: "#objetivos" },
  { label: "Conferencia", href: "#conferencia" },
  { label: "Boletines", href: "#boletines" },
] as const

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg
        width={20}
        height={20}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        width={20}
        height={20}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.427.403a4.088 4.088 0 011.523.99 4.088 4.088 0 01.99 1.524c.163.456.35 1.256.403 2.427.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.427a4.088 4.088 0 01-.99 1.523 4.088 4.088 0 01-1.524.99c-.456.163-1.256.35-2.427.403-1.265.058-1.645.07-4.849.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.427-.403a4.088 4.088 0 01-1.523-.99 4.088 4.088 0 01-.99-1.524c-.163-.456-.35-1.256-.403-2.427C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.427a4.088 4.088 0 01.99-1.523A4.088 4.088 0 015.15 2.21c.456-.163 1.256-.35 2.427-.403C8.842 1.75 9.222 1.738 12 1.738zM12 0C8.741 0 8.333.014 7.053.072 5.775.131 4.902.333 4.14.63a6.21 6.21 0 00-2.244 1.462A6.21 6.21 0 00.434 4.336C.137 5.098-.065 5.97.007 7.25.069 8.53.083 8.938.083 12.197s-.014 3.668-.076 4.948c-.072 1.28.13 2.152.427 2.914a6.21 6.21 0 001.462 2.244 6.21 6.21 0 002.244 1.462c.762.297 1.634.499 2.914.557C8.333 24.386 8.741 24.4 12 24.4s3.668-.014 4.948-.076c1.28-.058 2.152-.26 2.914-.557a6.21 6.21 0 002.244-1.462 6.21 6.21 0 001.462-2.244c.297-.762.499-1.634.557-2.914.064-1.28.076-1.688.076-4.948s-.014-3.668-.076-4.948c-.058-1.28-.26-2.152-.557-2.914a6.21 6.21 0 00-1.462-2.244A6.21 6.21 0 0019.862.63C19.1.333 18.228.131 16.948.072 15.668.014 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        width={20}
        height={20}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const

export default function Footer() {
  return (
    <footer className="border-t-4 border-accent bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-gray.png"
              alt="ADPUPR"
              width={160}
              height={64}
              className="h-14 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Promoviendo y fortaleciendo la sana administraci&oacute;n
              p&uacute;blica en Puerto Rico desde la academia, la
              investigaci&oacute;n y el servicio a la comunidad.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-lg">Enlaces R&aacute;pidos</h3>
            <div className="gold-rule mt-3 mb-5" />
            <nav
              className="flex flex-col gap-2.5"
              aria-label="Pie de pagina"
            >
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="text-sm text-white/65 transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-heading text-lg">Contacto</h3>
            <div className="gold-rule mt-3 mb-5" />
            <address className="flex flex-col gap-3 text-sm not-italic text-white/65">
              <p>PO BOX 1269, Trujillo Alto, PR 00977</p>
              <a
                href="mailto:info@adpupr.com"
                className="transition-colors hover:text-accent"
              >
                info@adpupr.com
              </a>
              <a
                href="mailto:asociacion.adpupr@gmail.com"
                className="transition-colors hover:text-accent"
              >
                asociacion.adpupr@gmail.com
              </a>
            </address>
            <div className="mt-5 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/60 transition-all hover:bg-accent hover:text-primary-dark"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          <p>
            &copy; {new Date().getFullYear()} ADPUPR. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
