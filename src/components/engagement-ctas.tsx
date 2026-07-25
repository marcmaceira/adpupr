import Link from "next/link"
import { FilePenLine, HeartHandshake } from "lucide-react"

const ACTIONS = [
  {
    eyebrow: "Comparte tus ideas",
    title: "Convocatoria V Bolet\u00EDn Informativo",
    description:
      "Somete tu art\u00EDculo de opini\u00F3n y aporta nuevas perspectivas a la conversaci\u00F3n sobre administraci\u00F3n p\u00FAblica.",
    label: "Someter un art\u00EDculo",
    href: "/recursos#convocatoria-boletin",
    icon: FilePenLine,
  },
  {
    eyebrow: "Apoya a la ADPUPR",
    title: "Tu donativo fortalece nuestra labor",
    description:
      "Con tu apoyo impulsamos iniciativas, publicaciones y espacios de desarrollo profesional que fortalecen la administraci\u00F3n p\u00FAblica en Puerto Rico.",
    label: "Quiero donar",
    href: "/contactanos",
    icon: HeartHandshake,
  },
] as const

export default function EngagementCtas() {
  return (
    <section className="bg-bg px-6 py-24 md:py-[112px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 max-w-[720px]">
          <p className="eyebrow mb-3.5">Participa</p>
          <h2 className="h-section text-text">Hay m&aacute;s de una forma de aportar.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {ACTIONS.map((action, index) => {
            const Icon = action.icon

            return (
              <article
                key={action.label}
                className={`flex min-h-[360px] flex-col rounded-lg border p-8 sm:p-10 ${
                  index === 0
                    ? "border-border bg-surface"
                    : "border-primary bg-primary text-white"
                }`}
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-sm ${
                    index === 0 ? "bg-sky-50 text-primary" : "bg-white/10 text-mustard"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                </div>
                <p className={`eyebrow mt-8 ${index === 0 ? "" : "eyebrow-on-dark"}`}>
                  {action.eyebrow}
                </p>
                <h3 className={`mt-3 text-[27px] font-extrabold ${index === 0 ? "text-primary" : "text-white"}`}>
                  {action.title}
                </h3>
                <p className={`mt-4 font-body text-[16px] leading-[1.65] ${index === 0 ? "text-text-muted" : "text-text-on-dark-muted"}`}>
                  {action.description}
                </p>
                <Link
                  href={action.href}
                  className={`mt-auto inline-flex items-center gap-2 self-start pt-8 font-heading text-sm font-bold underline decoration-2 underline-offset-4 ${
                    index === 0
                      ? "text-primary decoration-sky-200 hover:text-primary-700"
                      : "text-white decoration-mustard hover:text-mustard"
                  }`}
                >
                  {action.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
