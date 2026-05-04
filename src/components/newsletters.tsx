import Link from "next/link"
import GeoPlaceholder from "./geo-placeholder"

interface Boletin {
  readonly kind: "Boletín" | "Comunicado"
  readonly title: string
  readonly date: string
  readonly cat: string
  readonly seed: number
}

const BOLETINES: readonly Boletin[] = [
  {
    kind: "Boletín",
    title: "Reforma del servicio civil: implicaciones para los municipios",
    date: "Mar 2026",
    cat: "Política",
    seed: 3,
  },
  {
    kind: "Comunicado",
    title: "Posicionamiento sobre la modernización de OGP",
    date: "Feb 2026",
    cat: "Posicionamiento",
    seed: 4,
  },
  {
    kind: "Boletín",
    title: "Educación cívica en la era digital",
    date: "Ene 2026",
    cat: "Educación",
    seed: 5,
  },
] as const

export default function Newsletters() {
  return (
    <section id="boletines" className="bg-bg px-6 py-28 md:py-[112px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p className="eyebrow mb-3.5">Boletines y Publicaciones</p>
            <h2 className="h-section text-text">Lo m&aacute;s reciente.</h2>
          </div>
          <Link
            href="/comunicaciones"
            className="inline-flex items-center gap-2 rounded-sm border border-primary px-5 py-3 font-heading text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Ver todos <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {BOLETINES.map((b, i) => (
            <a
              key={b.title}
              href="#"
              className={`flex flex-col overflow-hidden rounded-lg border border-border bg-surface no-underline transition-shadow ${
                i === 0 ? "border-t-[4px] border-t-mustard" : ""
              }`}
              style={{
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4 / 3", background: "var(--color-sky-50)" }}
                aria-hidden="true"
              >
                <GeoPlaceholder seed={b.seed} />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 px-6 pb-6 pt-5">
                <p className="eyebrow" style={{ margin: 0 }}>
                  {b.kind}
                </p>
                <h3
                  className="font-heading text-[18px] font-extrabold text-primary"
                  style={{ letterSpacing: "-0.005em", lineHeight: 1.25 }}
                >
                  {b.title}
                </h3>
                <div
                  className="mt-auto flex gap-3.5 pt-3.5 font-heading text-[12px] font-semibold"
                  style={{
                    color: "var(--color-text-faint)",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span>{b.date}</span>
                  <span>&middot; {b.cat}</span>
                  <span
                    className="ml-auto text-primary"
                    aria-hidden="true"
                  >
                    Leer &rarr;
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
