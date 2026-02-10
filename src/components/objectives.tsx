const OBJECTIVES = [
  "Agrupar a las personas interesadas en promover la sana administraci\u00F3n p\u00FAblica",
  "Promover la educaci\u00F3n a trav\u00E9s de cursos, foros, conferencias y seminarios",
  "Establecer redes de comunicaci\u00F3n entre los miembros",
  "Mantener participaci\u00F3n colectiva activa en los asuntos p\u00FAblicos de Puerto Rico",
  "Los dem\u00E1s objetivos que fije la Asamblea de Miembros",
] as const

interface ObjectiveItemProps {
  readonly index: number
  readonly text: string
}

function ObjectiveItem({ index, text }: ObjectiveItemProps) {
  return (
    <li className="group relative flex items-start gap-6">
      <span
        className="absolute -left-2 -top-6 select-none font-heading text-7xl font-bold text-primary/[0.04]"
        aria-hidden="true"
      >
        {index}
      </span>
      <span
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/20"
        aria-hidden="true"
      >
        {index}
      </span>
      <p className="relative pt-2 leading-relaxed text-text-muted transition-colors group-hover:text-text">
        {text}
      </p>
    </li>
  )
}

export default function Objectives() {
  return (
    <section id="objetivos" className="section-padding bg-surface">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl text-primary sm:text-4xl">
            Objetivos
          </h2>
          <div className="gold-rule mx-auto mt-4" />
        </div>

        <ul className="mx-auto grid max-w-3xl gap-10 md:grid-cols-2 md:gap-x-14 md:gap-y-12">
          {OBJECTIVES.map((text, i) => (
            <ObjectiveItem key={text} index={i + 1} text={text} />
          ))}
        </ul>
      </div>
    </section>
  )
}
