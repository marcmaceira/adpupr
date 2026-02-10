interface Committee {
  readonly icon: React.ReactNode
  readonly title: string
  readonly description: string
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" />
    </svg>
  )
}

function DocumentTextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  )
}

function CurrencyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  )
}

function ScaleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
    </svg>
  )
}

const COMMITTEES: readonly Committee[] = [
  {
    icon: <MonitorIcon />,
    title: "Educaci\u00F3n y Tecnolog\u00EDa",
    description:
      "Fomenta una cultura de aprendizaje continuo integrando la educaci\u00F3n con la tecnolog\u00EDa",
  },
  {
    icon: <DocumentTextIcon />,
    title: "Publicaciones Institucionales",
    description:
      "Coordina las comunicaciones formales reflejando la misi\u00F3n y visi\u00F3n de la organizaci\u00F3n",
  },
  {
    icon: <CurrencyIcon />,
    title: "Recaudaci\u00F3n de Fondos",
    description:
      "Apoya la generaci\u00F3n estrat\u00E9gica de ingresos bajo el liderazgo del tesorero",
  },
  {
    icon: <ScaleIcon />,
    title: "Asuntos Legislativos",
    description:
      "Analiza los desarrollos legislativos que impactan la administraci\u00F3n p\u00FAblica",
  },
] as const

interface CommitteeCardProps {
  readonly committee: Committee
}

function CommitteeCard({ committee }: CommitteeCardProps) {
  return (
    <article className="card-accent-top group rounded-lg bg-bg p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
      <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/[0.07] text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        {committee.icon}
      </span>
      <h3 className="mb-2 text-lg font-bold text-primary">
        {committee.title}
      </h3>
      <p className="leading-relaxed text-text-muted">
        {committee.description}
      </p>
    </article>
  )
}

export default function Committees() {
  return (
    <section id="comites" className="section-padding bg-bg">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl text-primary sm:text-4xl">
            Comit&eacute;s de Trabajo
          </h2>
          <div className="gold-rule mx-auto mt-4" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {COMMITTEES.map((committee) => (
            <CommitteeCard key={committee.title} committee={committee} />
          ))}
        </div>
      </div>
    </section>
  )
}
