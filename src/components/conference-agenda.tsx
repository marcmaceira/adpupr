"use client"

import { useRef, useState } from "react"
import { ArrowDown, ArrowUp, ChevronDown, Plus } from "lucide-react"

interface AgendaEntry {
  readonly start: string
  readonly end: string
  readonly title: string
  readonly description?: string
  readonly quiet?: boolean
}

const MORNING = [
  { start: "7:30 a.m.", end: "8:30 a.m.", title: "Registro, desayuno y networking", quiet: true },
  { start: "8:30 a.m.", end: "8:55 a.m.", title: "Bienvenida protocolar, saludo y reflexi\u00F3n presidencial", description: "Apertura a cargo de la Direcci\u00F3n de Relaciones P\u00FAblicas y la Presidencia de ADPUPR." },
  { start: "8:55 a.m.", end: "9:40 a.m.", title: "Conferencia magistral", description: "Presentaci\u00F3n de 40 minutos, seguida de 5 minutos de preguntas y comentarios del p\u00FAblico." },
  { start: "9:40 a.m.", end: "10:35 a.m.", title: "Panel acad\u00E9mico / Investigaciones", description: "Investigaciones de ponentes seleccionados por convocatoria, en un panel moderado." },
  { start: "10:35 a.m.", end: "10:40 a.m.", title: "Mensaje de patrocinadores", quiet: true },
  { start: "10:40 a.m.", end: "11:40 a.m.", title: "Gran panel multisectorial", description: "Di\u00E1logo entre el Estado, la academia, el sector privado y el tercer sector." },
  { start: "11:40 a.m.", end: "11:45 a.m.", title: "Mensaje de patrocinadores", quiet: true },
  { start: "11:45 a.m.", end: "12:40 p.m.", title: "Almuerzo de networking", description: "Receso para almorzar, conectar con participantes y visitar los espacios de exhibici\u00F3n en el vest\u00EDbulo.", quiet: true },
] as const satisfies readonly AgendaEntry[]

const AFTERNOON = [
  { start: "12:40 p.m.", end: "1:40 p.m.", title: "Panel presidencial / Practitioners", description: "Di\u00E1logo con tres invitados, moderado por la Presidencia." },
  { start: "1:40 p.m.", end: "1:45 p.m.", title: "Mensaje de patrocinadores", quiet: true },
  { start: "1:45 p.m.", end: "2:15 p.m.", title: "Reconocimiento a colaboradores", description: "Reconocimiento a colaboradores y menci\u00F3n de acuerdos colaborativos, con la participaci\u00F3n del Presidente de ASPA." },
  { start: "2:15 p.m.", end: "3:10 p.m.", title: "Panel II: Casos reales", description: "Estudios de casos, iniciativas sociales, experiencias reales y aprendizajes aplicados." },
  { start: "3:10 p.m.", end: "3:15 p.m.", title: "Mensaje de patrocinadores", quiet: true },
  { start: "3:15 p.m.", end: "3:35 p.m.", title: "Receso de la tarde", description: "Merienda y networking.", quiet: true },
  { start: "3:35 p.m.", end: "4:00 p.m.", title: "Laboratorio de reacci\u00F3n del p\u00FAblico, s\u00EDntesis y cierre acad\u00E9mico", description: "Un espacio de retroalimentaci\u00F3n guiada y propuestas de acci\u00F3n para cerrar la jornada acad\u00E9mica." },
  { start: "4:00 p.m.", end: "4:15 p.m.", title: "Networking y registro para la asamblea", description: "Validaci\u00F3n de membres\u00EDa activa y registro de participantes.", quiet: true },
  { start: "4:15 p.m.", end: "5:00 p.m.", title: "Asamblea Ordinaria ADPUPR", description: "Encuentro de la Junta de Directores y la membres\u00EDa. Agenda, propuesta de enmiendas e informe de gesti\u00F3n." },
] as const satisfies readonly AgendaEntry[]

const BUTTON = "inline-flex min-h-12 cursor-pointer items-center justify-center gap-3 rounded-sm border border-primary/30 py-3 pl-5 pr-3 font-heading text-base font-semibold text-primary hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-sm"

function ScheduleEntry({ entry }: { readonly entry: AgendaEntry }) {
  const content = (
    <>
      <p className="flex flex-wrap gap-x-1 text-base tabular-nums text-text-muted sm:flex-col sm:gap-0 sm:text-sm">
        <span>{entry.start}</span>
        <span>&ndash; {entry.end}</span>
      </p>
      <p className={`min-w-0 font-heading text-base ${entry.quiet ? "font-medium text-text-muted" : "font-semibold text-primary sm:text-lg"}`}>
        {entry.title}
      </p>
    </>
  )

  return (
    <li className="border-b border-primary/10 last:border-b-0">
      {entry.description && !entry.quiet ? (
        <details className="group">
          <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 py-6 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:grid-cols-[7rem_1fr_auto] [&::-webkit-details-marker]:hidden [&>p:first-child]:col-span-2 sm:[&>p:first-child]:col-span-1">
            {content}
            <Plus className="size-6 shrink-0 stroke-primary motion-safe:transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <div className="pb-6 sm:pl-32 sm:pr-10">
            <p className="max-w-[56ch] border-l-2 border-sky pl-4 text-base text-text-muted sm:text-sm/6">{entry.description}</p>
          </div>
        </details>
      ) : (
        <div className="grid gap-2 py-5 sm:grid-cols-[7rem_1fr] sm:gap-4">
          {content}
        </div>
      )}
    </li>
  )
}

function Schedule({ entries }: { readonly entries: readonly AgendaEntry[] }) {
  return <ol role="list">{entries.map((entry) => <ScheduleEntry key={entry.start} entry={entry} />)}</ol>
}

export default function ConferenceAgenda() {
  const [expanded, setExpanded] = useState(false)
  const trigger = useRef<HTMLButtonElement>(null)

  function collapseFromBottom() {
    setExpanded(false)
    trigger.current?.focus({ preventScroll: true })
    trigger.current?.scrollIntoView({ block: "center", behavior: "instant" })
  }

  return (
    <section id="agenda" aria-labelledby="inline-agenda-heading" className="mt-10 border-t border-primary/15 pt-8 sm:mt-12">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="inline-agenda-heading" className="font-heading text-2xl font-semibold tracking-tight text-primary sm:text-3xl">Agenda del d&iacute;a</h2>
        <button ref={trigger} type="button" aria-expanded={expanded} aria-controls="inline-agenda-content" className={`${BUTTON} shrink-0`} onClick={() => setExpanded((open) => !open)}>
          {expanded ? "Ocultar agenda" : "Ver agenda completa"}
          <ChevronDown aria-hidden="true" className={`size-6 shrink-0 motion-safe:transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div id="inline-agenda-content" hidden={!expanded} className="pt-8">
        <div className="grid gap-8 border-t border-primary/20 py-8 lg:grid-cols-[1fr_3fr] lg:gap-20">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-primary">Ma&ntilde;ana</h3>
            <p className="text-base text-text-muted sm:text-sm">Apertura, investigaci&oacute;n y di&aacute;logo multisectorial.</p>
          </div>
          <Schedule entries={MORNING} />
        </div>
        <div className="grid gap-8 border-t border-primary/20 py-8 lg:grid-cols-[1fr_3fr] lg:gap-20">
          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-primary">Tarde</h3>
            <p className="text-base text-text-muted sm:text-sm">Experiencias, propuestas y encuentro de la membres&iacute;a.</p>
          </div>
          <Schedule entries={AFTERNOON} />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-primary/20 pt-6">
          <p className="text-base text-text-muted sm:text-sm">Programa sujeto a ajustes.</p>
          <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6">
            <button type="button" onClick={collapseFromBottom} className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-sm font-heading text-base font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-sm">Ocultar agenda <ArrowUp className="size-6 shrink-0" aria-hidden="true" /></button>
            <a href="#inscripcion" className={BUTTON}>Ver tarifas e inscripci&oacute;n <ArrowDown className="size-6 shrink-0" aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </section>
  )
}
