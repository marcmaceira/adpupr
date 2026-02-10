interface Edition {
  readonly month: string
  readonly year: number
}

const EDITIONS: readonly Edition[] = [
  { month: "Junio", year: 2025 },
  { month: "Septiembre", year: 2025 },
  { month: "Diciembre", year: 2025 },
] as const

function DocumentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="mx-auto mb-5 h-10 w-10 text-primary/40"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  )
}

interface NewsletterCardProps {
  readonly edition: Edition
}

function NewsletterCard({ edition }: NewsletterCardProps) {
  return (
    <article className="group rounded-lg border border-primary/[0.08] bg-bg p-8 text-center shadow-sm transition-all hover:shadow-md hover:border-accent/30">
      <DocumentIcon />
      <h3 className="text-lg font-bold text-primary">
        {edition.month} {edition.year}
      </h3>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-medium text-text-muted">
        <span
          className="h-1.5 w-1.5 rounded-full bg-accent/60"
          aria-hidden="true"
        />
        Pr&oacute;ximamente
      </span>
    </article>
  )
}

export default function Newsletters() {
  return (
    <section id="boletines" className="section-padding bg-surface">
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl text-primary sm:text-4xl">
            Boletines Informativos
          </h2>
          <div className="gold-rule mx-auto mt-4" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {EDITIONS.map((edition) => (
            <NewsletterCard
              key={`${edition.month}-${edition.year}`}
              edition={edition}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
