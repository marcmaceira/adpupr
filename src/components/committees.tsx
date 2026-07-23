import Link from "next/link"
import GeoPlaceholder from "./geo-placeholder"

interface Committee {
  readonly name: string
  readonly desc: string
  readonly href: string
  readonly seed: number
  readonly variant: "circles" | "stripes" | "grid"
}

const COMITES: readonly Committee[] = [
  {
    name: "Educaci\u00F3n y Tecnolog\u00EDa",
    desc: "Fomenta una cultura de aprendizaje continuo en la asociaci\u00F3n y aporta al desarrollo de una ciudadan\u00EDa informada. Integra la educaci\u00F3n en administraci\u00F3n p\u00FAblica con el uso de tecnolog\u00EDas.",
    href: "/nosotros/estructura-organizacional#educacion-tecnologia",
    seed: 0,
    variant: "circles",
  },
  {
    name: "Publicaciones Institucionales",
    desc: "Coordina, supervisa y fortalece los productos comunicativos formales de la Asociaci\u00F3n, asegurando que reflejen su misi\u00F3n, visi\u00F3n y valores.",
    href: "/nosotros/estructura-organizacional#publicaciones-institucionales",
    seed: 1,
    variant: "stripes",
  },
  {
    name: "Asuntos Legislativos",
    desc: "Analiza, da seguimiento y comunica los desarrollos legislativos y regulatorios que impactan la administraci\u00F3n p\u00FAblica en Puerto Rico, desde una \u00F3ptica rigurosa y no partidista.",
    href: "/nosotros/estructura-organizacional#asuntos-legislativos",
    seed: 2,
    variant: "grid",
  },
] as const

export default function Committees() {
  return (
    <section id="comites" className="bg-bg px-6 py-28 md:py-[112px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-[760px]">
          <p className="eyebrow mb-3.5">Comit&eacute;s de Trabajo</p>
          <h2 className="h-section text-text">Donde se hace el trabajo.</h2>
          <p className="lede mt-5">
            Tres comit&eacute;s estructuran la actividad sustantiva de la
            Asociaci&oacute;n, cada uno con responsabilidades definidas y
            abierto a la participaci&oacute;n de la membres&iacute;a.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {COMITES.map((c) => (
            <article
              key={c.name}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface p-8 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                transitionTimingFunction: "var(--ease-standard)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="relative -mx-8 -mt-8 mb-6 h-[140px] overflow-hidden"
                aria-hidden="true"
              >
                <GeoPlaceholder seed={c.seed} variant={c.variant} />
              </div>
              <h3
                className="font-heading text-[22px] font-extrabold text-primary"
                style={{ letterSpacing: "-0.01em", lineHeight: 1.2 }}
              >
                {c.name}
              </h3>
              <p className="mt-4 font-body text-[14.5px] leading-[1.6] text-text-muted">
                {c.desc}
              </p>
              <Link
                href={c.href}
                className="mt-6 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-primary"
                style={{ letterSpacing: "0.02em" }}
              >
                Conocer el comit&eacute;
                <span
                  className="transition-transform duration-150 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
