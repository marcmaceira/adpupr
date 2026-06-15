import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import type { ReactNode } from "react"

interface ConferenceMeta {
  readonly date?: string
  readonly location?: string
  readonly format?: string
}

interface ConferenceCtaProps {
  readonly eyebrow?: string
  readonly heading?: ReactNode
  readonly description?: string
  readonly meta?: ConferenceMeta
  readonly ctaLabel?: string
  readonly ctaHref?: string
  readonly secondaryLabel?: string
  readonly secondaryHref?: string
}

// Placeholder event details — replace with confirmed values once announced.
const DEFAULT_META: ConferenceMeta = {
  date: "Octubre 2026",
  location: "San Juan, Puerto Rico",
  format: "Presencial",
}

export default function ConferenceCta({
  eyebrow = "Conferencia 2026",
  heading = (
    <>
      Inscr&iacute;bete a la Conferencia de Administraci&oacute;n
      P&uacute;blica <span className="text-mustard">2026</span>.
    </>
  ),
  description = "Un encuentro de ponencias, paneles y networking en torno a la administración pública en Puerto Rico.",
  meta = DEFAULT_META,
  ctaLabel = "Inscríbete ahora",
  ctaHref = "/conferencia",
  secondaryLabel = "Ver detalles",
  secondaryHref = "/conferencia",
}: ConferenceCtaProps) {
  return (
    <section
      id="conferencia"
      className="relative overflow-hidden bg-primary text-white"
    >
      {/* Concentric ring ornaments — echoes the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[180px] -top-[160px] h-[520px] w-[520px] rounded-full border-2"
        style={{ borderColor: "rgba(117, 189, 240, 0.35)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[60px] -bottom-[150px] h-[340px] w-[340px] rounded-full border-2"
        style={{ borderColor: "rgba(255, 210, 88, 0.5)" }}
      />

      <div className="container relative mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-10 py-20 md:grid-cols-[1.6fr_auto] md:gap-12 md:py-[88px]">
          <div>
            <p className="eyebrow eyebrow-on-dark mb-3.5">{eyebrow}</p>

            <h2
              className="font-heading font-black text-white"
              style={{
                fontSize: "clamp(28px, 3.4vw, 44px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                maxWidth: "20ch",
              }}
            >
              {heading}
            </h2>

            {description && (
              <p
                className="mt-4 max-w-[52ch] font-body text-[17px] leading-[1.55]"
                style={{ color: "var(--color-text-on-dark-muted)" }}
              >
                {description}
              </p>
            )}

            {meta && (meta.date || meta.location || meta.format) && (
              <div
                className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2.5 font-heading text-[14px] font-semibold"
                style={{ color: "var(--color-text-on-dark-muted)" }}
              >
                {meta.date && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar
                      className="h-[18px] w-[18px] text-mustard"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {meta.date}
                  </span>
                )}
                {meta.location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin
                      className="h-[18px] w-[18px] text-mustard"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    {meta.location}
                  </span>
                )}
                {meta.format && (
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden="true">&middot;</span>
                    {meta.format}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 md:items-end md:self-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-mustard px-6 py-3.5 font-heading text-[15px] font-semibold text-primary transition-colors hover:bg-mustard-600"
            >
              {ctaLabel} <span aria-hidden="true">&rarr;</span>
            </Link>
            {secondaryLabel && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-sm border border-white/70 px-6 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-primary"
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
