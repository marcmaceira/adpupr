"use client"

import { useDeferredValue, useState } from "react"
import { FileText, Search } from "lucide-react"

const CATEGORIES = [
  "Todos",
  "Boletines",
  "Art\u00EDculos de opini\u00F3n especial",
  "Comunicados",
  "Convocatorias",
] as const

type Category = (typeof CATEGORIES)[number]

interface Resource {
  readonly title: string
  readonly category: Exclude<Category, "Todos">
  readonly date: string
  readonly href: string
}

// Add publications here when the source documents are placed in public/recursos.
const RESOURCES: readonly Resource[] = []

export default function ResourceLibrary() {
  const [category, setCategory] = useState<Category>("Todos")
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase("es"))
  const filteredResources = RESOURCES.filter(
    (resource) =>
      (category === "Todos" || resource.category === category) &&
      (deferredQuery === "" ||
        resource.title.toLocaleLowerCase("es").includes(deferredQuery)),
  )

  return (
    <div>
      <div className="border-y border-border bg-surface">
        <div className="mx-auto max-w-[1200px] px-6 py-5">
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Filtrar recursos por categor\u00EDa"
          >
            {CATEGORIES.map((item) => {
              const active = category === item

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={active}
                  className={`min-h-11 shrink-0 rounded-full border px-4 py-2 font-heading text-[13px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-border-strong bg-surface text-text hover:border-primary-300 hover:bg-sky-50"
                  }`}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <label className="flex min-h-12 max-w-[520px] items-center gap-3 rounded-sm border border-border-strong bg-surface px-4 focus-within:border-primary focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-sky-200">
          <Search className="h-[18px] w-[18px] shrink-0 text-text-faint" aria-hidden="true" />
          <span className="sr-only">Buscar en los recursos</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={"Buscar por t\u00EDtulo"}
            className="w-full bg-transparent py-3 font-body text-sm text-text outline-none placeholder:text-text-faint"
          />
        </label>

        {filteredResources.length > 0 ? (
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {filteredResources.map((resource) => (
              <li key={resource.href}>
                <a
                  href={resource.href}
                  className="grid gap-4 bg-surface px-5 py-6 transition-colors hover:bg-sky-50 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="eyebrow mb-2">{resource.category}</p>
                    <h3 className="text-lg text-primary">{resource.title}</h3>
                  </div>
                  <p className="font-heading text-sm font-semibold text-text-faint">
                    {resource.date} <span aria-hidden="true">&darr;</span>
                  </p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-border-strong bg-surface-2 px-6 text-center">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-primary">
              <FileText className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="text-xl text-primary">El archivo est&aacute; en preparaci&oacute;n.</h3>
            <p className="mt-2 max-w-[52ch] font-body text-[15px] text-text-muted">
              Los documentos de esta categor&iacute;a se publicar&aacute;n aqu&iacute; tan pronto
              formen parte del archivo digital de la ADPUPR.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
