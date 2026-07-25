import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowRight, BookOpen, FileChartColumn, Library, Send } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ResourceLibrary from "@/components/resource-library"

export const metadata: Metadata = {
  title: "Recursos",
  description:
    "Consulta boletines, art\u00EDculos de opini\u00F3n, comunicados, convocatorias y el archivo hist\u00F3rico de la ADPUPR.",
  openGraph: {
    title: "Recursos | ADPUPR",
    description:
      "Publicaciones y archivo hist\u00F3rico sobre administraci\u00F3n p\u00FAblica en Puerto Rico.",
    url: "/recursos",
  },
}

const RESOURCE_SECTIONS = [
  { label: "Publicaciones", href: "#publicaciones" },
  { label: "Convocatoria", href: "#convocatoria-boletin" },
  { label: "Biblioteca", href: "#biblioteca" },
] as const

export default function RecursosPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-primary px-6 py-20 text-white md:py-28">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] border-l border-white/10 lg:block" aria-hidden="true">
            <div className="absolute inset-0 grid grid-cols-3">
              <span className="border-r border-white/10" />
              <span className="border-r border-white/10" />
              <span />
            </div>
            <span className="absolute bottom-12 right-12 font-heading text-[180px] font-black leading-none text-white/[0.035]">R</span>
          </div>

          <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="eyebrow eyebrow-on-dark mb-5">Centro de recursos</p>
              <h1 className="h-display max-w-[13ch] text-white">
                Conocimiento para el servicio p&uacute;blico.
              </h1>
              <p className="mt-7 max-w-[62ch] font-body text-lg leading-[1.65] text-text-on-dark-muted">
                Explora publicaciones, convocatorias y materiales que documentan
                la conversaci&oacute;n sobre la administraci&oacute;n p&uacute;blica en Puerto Rico.
              </p>
            </div>

            <nav aria-label="Secciones de recursos" className="border-t border-white/20 lg:border-t-0">
              {RESOURCE_SECTIONS.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="flex min-h-14 items-center justify-between border-b border-white/20 font-heading text-sm font-bold text-white transition-colors hover:text-mustard focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard"
                >
                  {section.label}
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section id="publicaciones" className="bg-bg pt-20 md:pt-28">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 pb-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:pb-20">
            <div>
              <p className="eyebrow mb-4">Boletines informativos</p>
              <h2 className="h-section text-text">Una memoria activa de la profesi&oacute;n.</h2>
            </div>
            <div className="border-l-4 border-mustard pl-6 sm:pl-8">
              <p className="font-body text-[17px] leading-[1.75] text-text-muted">
                Los boletines informativos de ADPUPR son publicaciones institucionales
                que documentan, difunden y analizan iniciativas, entrevistas,
                art&iacute;culos de opini&oacute;n y actividades relevantes para la
                administraci&oacute;n p&uacute;blica en Puerto Rico.
              </p>
              <p className="mt-5 font-body text-[17px] leading-[1.75] text-text-muted">
                A trav&eacute;s de estos boletines, la Asociaci&oacute;n promueve la
                educaci&oacute;n p&uacute;blica profesional, el intercambio de ideas y la
                reflexi&oacute;n cr&iacute;tica sobre los principales retos de la gobernanza,
                la gesti&oacute;n p&uacute;blica y el servicio p&uacute;blico.
              </p>
            </div>
          </div>
          <ResourceLibrary />
        </section>

        <section id="convocatoria-boletin" className="scroll-mt-[72px] bg-mustard px-6 py-16 md:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
              <Send className="h-6 w-6" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div>
              <p className="eyebrow mb-3" style={{ color: "var(--color-primary-900)" }}>
                Convocatoria abierta
              </p>
              <h2 className="max-w-[22ch] text-[32px] font-black text-primary md:text-[40px]">
                Comparte tu propuesta para el V Bolet&iacute;n Informativo.
              </h2>
              <p className="mt-4 max-w-[62ch] font-body text-[16px] text-primary-700">
                Somete tu art&iacute;culo de opini&oacute;n y aporta nuevas perspectivas a la
                conversaci&oacute;n sobre administraci&oacute;n p&uacute;blica.
              </p>
            </div>
            <a
              href="mailto:info@adpupr.com?subject=Propuesta%20para%20el%20V%20Bolet%C3%ADn%20Informativo"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              Someter propuesta
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section id="biblioteca" className="scroll-mt-[72px] bg-surface px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid gap-10 border-b border-border pb-12 md:grid-cols-[1fr_1fr] md:items-end">
              <div>
                <p className="eyebrow mb-4">Archivo hist&oacute;rico</p>
                <h2 className="h-section text-text">Biblioteca de conferencias.</h2>
              </div>
              <p className="lede md:justify-self-end">
                Un espacio para preservar y consultar las ideas compartidas en las
                conferencias de la ADPUPR a trav&eacute;s de los a&ntilde;os.
              </p>
            </div>

            <div className="grid md:grid-cols-2">
              <article className="border-b border-border py-10 md:border-b-0 md:border-r md:pr-12 md:py-14">
                <FileChartColumn className="h-8 w-8 text-sky-600" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-8 text-2xl text-primary">Presentaciones</h3>
                <p className="mt-4 font-body text-[16px] text-text-muted">
                  Diapositivas y materiales presentados por conferenciantes y panelistas.
                </p>
                <p className="eyebrow mt-8">Archivo en preparaci&oacute;n</p>
              </article>
              <article className="py-10 md:pl-12 md:py-14">
                <BookOpen className="h-8 w-8 text-sky-600" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-8 text-2xl text-primary">Art&iacute;culos de conferencias</h3>
                <p className="mt-4 font-body text-[16px] text-text-muted">
                  Ponencias, investigaciones y textos vinculados a conferencias anteriores.
                </p>
                <p className="eyebrow mt-8">Archivo en preparaci&oacute;n</p>
              </article>
            </div>

            <div className="mt-2 flex items-center gap-3 rounded-sm bg-sky-50 px-5 py-4 font-body text-sm text-text-muted">
              <Library className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              La biblioteca crecer&aacute; a medida que se digitalicen los documentos hist&oacute;ricos.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
