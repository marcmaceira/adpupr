function HeroDotPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.07]" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hero-dots"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="14" cy="14" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      <HeroDotPattern />

      {/* Decorative gold accent line */}
      <div
        className="absolute left-0 top-1/3 h-px w-full bg-gradient-to-r from-transparent via-accent/25 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text content */}
          <div className="max-w-xl">
            <div
              className="gold-rule animate-expand-width mb-8"
              style={{ opacity: 0 }}
            />

            <h1
              className="animate-fade-in-up font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-[3.5rem]"
              style={{ animationDelay: "0.15s", opacity: 0 }}
            >
              Asociaci&oacute;n de Administraci&oacute;n P&uacute;blica de
              Puerto Rico
            </h1>

            <p
              className="animate-fade-in-up mt-6 text-lg leading-relaxed text-white/70 sm:text-xl"
              style={{ animationDelay: "0.35s", opacity: 0 }}
            >
              Promoviendo y fortaleciendo la sana administraci&oacute;n
              p&uacute;blica en Puerto Rico
            </p>

            <div
              className="animate-fade-in-up mt-10 flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: "0.55s", opacity: 0 }}
            >
              <a
                href="mailto:info@adpupr.com?subject=Membres%C3%ADa"
                className="inline-flex items-center justify-center rounded-md bg-accent px-8 py-3.5 text-base font-semibold text-primary-dark transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
              >
                &Uacute;nete
              </a>

              <a
                href="#nosotros"
                className="inline-flex items-center justify-center rounded-md border-2 border-white/25 px-8 py-3.5 text-base font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
              >
                Conoce m&aacute;s
              </a>
            </div>
          </div>

          {/* Logo with decorative rings */}
          <div
            className="animate-fade-in relative hidden justify-center lg:flex"
            style={{ animationDelay: "0.4s", opacity: 0 }}
            aria-hidden="true"
          >
            <div className="relative">
              <div className="absolute -inset-10 rounded-full border border-white/[0.08]" />
              <div className="absolute -inset-20 rounded-full border border-white/[0.04]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-clear.png"
                alt="ADPUPR Logo"
                width={340}
                height={340}
                className="drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to white */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
