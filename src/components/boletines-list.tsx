"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"

interface Boletin {
  readonly kind: "Boletín" | "Comunicado"
  readonly title: string
  readonly date: string
  readonly cat: string
}

const BOLETINES: readonly Boletin[] = [
  {
    kind: "Boletín",
    title: "Reforma del servicio civil: implicaciones para los municipios",
    date: "Mar 2026",
    cat: "Política",
  },
  {
    kind: "Comunicado",
    title: "Posicionamiento sobre la modernización de OGP",
    date: "Feb 2026",
    cat: "Posicionamiento",
  },
  {
    kind: "Boletín",
    title: "Educación cívica en la era digital",
    date: "Ene 2026",
    cat: "Educación",
  },
  {
    kind: "Boletín",
    title: "Transparencia presupuestaria: lecciones de tres años",
    date: "Dic 2025",
    cat: "Política",
  },
  {
    kind: "Comunicado",
    title: "Llamado a propuestas — Conferencia 2026",
    date: "Nov 2025",
    cat: "Eventos",
  },
  {
    kind: "Boletín",
    title: "Ética en la contratación pública",
    date: "Oct 2025",
    cat: "Política",
  },
  {
    kind: "Boletín",
    title: "Capítulos regionales: nuevo plan de trabajo",
    date: "Sep 2025",
    cat: "Asociación",
  },
] as const

const CATEGORIES = [
  "Todos",
  "Política",
  "Educación",
  "Posicionamiento",
  "Eventos",
  "Asociación",
] as const

export default function BoletinesList() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("Todos")
  const [q, setQ] = useState("")

  const filtered = useMemo(
    () =>
      BOLETINES.filter(
        (b) =>
          (filter === "Todos" || b.cat === filter) &&
          (q === "" || b.title.toLowerCase().includes(q.toLowerCase())),
      ),
    [filter, q],
  )

  return (
    <section className="px-6 py-24 md:py-[112px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-col gap-4 rounded-lg border border-border bg-surface p-5 md:flex-row md:items-center md:gap-6 md:p-6">
          <label className="flex flex-1 items-center gap-2.5">
            <span className="sr-only">Buscar publicaciones</span>
            <Search
              className="shrink-0 text-text-faint"
              width={18}
              height={18}
              strokeWidth={2}
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Buscar publicaciones…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="flex-1 border-none bg-transparent py-1 font-body text-sm text-text outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = filter === c
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-3.5 py-1.5 font-heading text-[12.5px] font-semibold transition-colors ${
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-white text-text hover:border-primary-300"
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            className="rounded-lg border border-border bg-surface p-16 text-center font-body text-text-faint"
          >
            No se encontraron resultados.
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            {filtered.map((b, i) => (
              <a
                key={b.title}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`grid items-center gap-6 bg-surface p-5 no-underline transition-colors hover:bg-sky-50 md:grid-cols-[56px_1fr_auto_auto] md:p-6 ${
                  i !== filtered.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div
                  className="relative flex h-14 w-11 items-center justify-center rounded-sm bg-mustard font-heading text-[11px] font-bold text-primary"
                  style={{ letterSpacing: "0.04em" }}
                  aria-hidden="true"
                >
                  PDF
                  <span
                    className="absolute right-0 top-0 block"
                    style={{
                      borderStyle: "solid",
                      borderWidth: "0 10px 10px 0",
                      borderColor:
                        "transparent var(--color-bg) transparent transparent",
                    }}
                  />
                </div>
                <div>
                  <div
                    className="font-heading text-[11.5px] uppercase text-text-faint"
                    style={{ letterSpacing: "0.1em", marginBottom: 4 }}
                  >
                    {b.kind} &middot; {b.cat}
                  </div>
                  <h4
                    className="font-heading text-[16px] font-bold text-primary"
                    style={{ letterSpacing: "-0.005em", margin: 0 }}
                  >
                    {b.title}
                  </h4>
                </div>
                <div className="font-heading text-[13px] font-semibold text-text-faint">
                  {b.date}
                </div>
                <span
                  className="font-heading text-[13px] font-semibold text-primary"
                  aria-hidden="true"
                >
                  Descargar &rarr;
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
