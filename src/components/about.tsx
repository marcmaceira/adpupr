interface CardProps {
  readonly label: string
  readonly children: string
  readonly icon: React.ReactNode
}

function Card({ label, children, icon }: CardProps) {
  return (
    <article className="card-accent-left rounded-lg bg-bg p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="mb-5 flex items-center gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent"
          aria-hidden="true"
        >
          {icon}
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          {label}
        </span>
      </div>
      <p className="leading-relaxed text-text-muted">{children}</p>
    </article>
  )
}

function CompassIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15.75 8.25-3 6.75-3-6.75 6.75-3-0.75 3z"
      />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <section id="nosotros" className="section-padding bg-bg">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl text-primary sm:text-4xl">
            Qui&eacute;nes Somos
          </h2>
          <div className="gold-rule mx-auto mt-4" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card label="Misi&oacute;n" icon={<CompassIcon />}>
            Promover y fortalecer la sana administraci&oacute;n p&uacute;blica
            en Puerto Rico, comprometidos con la educaci&oacute;n, la
            investigaci&oacute;n y la participaci&oacute;n en la toma de
            decisiones p&uacute;blicas.
          </Card>

          <Card label="Visi&oacute;n" icon={<EyeIcon />}>
            Ser un referente l&iacute;der en la promoci&oacute;n de una
            administraci&oacute;n p&uacute;blica eficaz y &eacute;tica en
            Puerto Rico, sirviendo como catalizador para el cambio positivo en
            pol&iacute;ticas y toma de decisiones.
          </Card>
        </div>
      </div>
    </section>
  )
}
