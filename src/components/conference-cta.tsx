export default function ConferenceCta() {
  return (
    <section
      id="conferencia"
      className="section-padding relative overflow-hidden bg-primary text-center text-white"
    >
      {/* Decorative geometric shapes */}
      <div
        className="absolute -right-16 -top-16 h-72 w-72 rotate-45 rounded-3xl bg-primary-light/15"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-12 -left-12 h-56 w-56 rotate-12 rounded-3xl bg-accent/[0.08]"
        aria-hidden="true"
      />

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="cta-dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="12" cy="12" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-3xl">
        <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Pr&oacute;ximo evento
        </span>

        <h2 className="font-heading text-3xl sm:text-5xl">
          Conferencia 2025
        </h2>

        <div className="gold-rule mx-auto mt-5" />

        <p className="mt-6 text-lg font-medium text-white/85">
          Educaci&oacute;n para una conversaci&oacute;n p&uacute;blica
          consistente
        </p>

        <p className="mt-3 leading-relaxed text-white/60">
          Repensar el rol del estado, la sociedad civil y la narrativa
        </p>

        <a
          href="mailto:info@adpupr.com?subject=Conferencia%202025"
          className="mt-10 inline-flex items-center justify-center rounded-md bg-accent px-10 py-3.5 text-base font-semibold text-primary-dark transition-all hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
        >
          S&eacute; parte de nuestra Conferencia
        </a>
      </div>
    </section>
  )
}
