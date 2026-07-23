import { Check } from "lucide-react"

const BENEFITS = [
  "Acceder y participar en foros, talleres, conferencias y conversatorios a costos exclusivos, con pre-reservaciones.",
  "Unirte a los equipos de los comités de trabajo de tu interés.",
  "Formar parte de una red profesional con académicos, investigadores, estudiantes y profesionales del servicio público.",
  "Contribuir al análisis, la investigación y el debate público informado en Puerto Rico.",
  "Tener voz y voto en las Asambleas de ADPUPR.",
  "Fortalecer tu desarrollo profesional y ampliar tus oportunidades de aprendizaje y colaboración.",
] as const

interface PaymentMethod {
  readonly name: string
  readonly sub: string
  readonly icon: React.ReactNode
}

const PAYMENTS: readonly PaymentMethod[] = [
  {
    name: "ATH Móvil",
    sub: "Negocio · ADPUPR",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    name: "PayPal",
    sub: "a ADPUPR",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <rect x="3" y="11" width="18" height="11" rx="2" />
      </svg>
    ),
  },
  {
    name: "Cheque o giro",
    sub: "PO BOX 1269, Trujillo Alto",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M3 10h18" />
        <path d="M7 15h4" />
      </svg>
    ),
  },
] as const

export default function Membresia() {
  return (
    <section
      id="membresia"
      className="px-6 py-28 md:py-[112px]"
      style={{ background: "var(--color-surface-2)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          {/* Benefits column */}
          <div>
            <p className="eyebrow">Beneficios de la membres&iacute;a</p>
            <h3
              className="mt-3.5 font-heading font-extrabold text-text"
              style={{
                fontSize: "clamp(22px, 2.4vw, 28px)",
                letterSpacing: "-0.015em",
                lineHeight: 1.15,
                marginBottom: 28,
              }}
            >
              Lo que incluye tu membres&iacute;a.
            </h3>
            <ul className="flex flex-col">
              {BENEFITS.map((b) => (
                <li
                  key={b}
                  className="grid items-start gap-3.5 border-b border-border py-3.5 font-body text-[15px] leading-[1.55] text-text last:border-b-0"
                  style={{ gridTemplateColumns: "28px 1fr" }}
                >
                  <span
                    className="mt-0.5 inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-mustard text-primary"
                    aria-hidden="true"
                  >
                    <Check
                      width={14}
                      height={14}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tiers + payments column */}
          <div>
            <p className="eyebrow">Tarifas anuales</p>
            <h3
              className="mt-2.5 font-heading text-[24px] font-extrabold text-primary"
              style={{ letterSpacing: "-0.01em" }}
            >
              Opciones para cada etapa.
            </h3>
            <p className="mt-4 max-w-[46ch] font-body text-[15px] leading-[1.65] text-text-muted">
              Conoce las tarifas y los beneficios de cada tipo de
              membres&iacute;a disponible para 2026.
            </p>
            <a
              href="#opciones-membresia"
              className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-bold text-primary underline decoration-sky decoration-2 underline-offset-4 transition-colors hover:text-primary-700"
            >
              Ver opciones de membres&iacute;a <span aria-hidden="true">&darr;</span>
            </a>

            <div className="mt-12">
              <p className="eyebrow mb-3.5">M&eacute;todos de pago</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {PAYMENTS.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3.5 rounded-md border border-border p-4"
                    style={{ background: "var(--color-surface-2)" }}
                  >
                    <div
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary text-white"
                      aria-hidden="true"
                    >
                      {p.icon}
                    </div>
                    <div>
                      <div
                        className="font-heading text-sm font-bold text-primary"
                      >
                        {p.name}
                      </div>
                      <div className="font-body text-[12px] text-text-faint">
                        {p.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://forms.gle/FrbrFGfyV9UujCWn9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Completar formulario <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="mailto:info@adpupr.com?subject=Solicitud%20de%20reglamento"
                className="inline-flex items-center rounded-sm border border-primary px-6 py-3.5 font-heading text-[15px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                Descargar reglamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
