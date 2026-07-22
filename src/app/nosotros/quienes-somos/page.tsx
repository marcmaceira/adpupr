import type { Metadata } from "next"
import Footer from "@/components/footer"
import Header from "@/components/header"

const OBJECTIVES = [
  "Agrupar en una organizaci\u00F3n a los interesados en promover los valores de una sana Administraci\u00F3n P\u00FAblica en Puerto Rico.",
  "Promover la educaci\u00F3n, difusi\u00F3n de conocimiento y el estudio de la Administraci\u00F3n P\u00FAblica ofreciendo, coordinando o auspiciando cursos, foros, conferencias, conversatorios, seminarios, intercambio de ideas y otras actividades relacionadas.",
  "Establecer redes y conexiones de comunicaci\u00F3n entre los integrantes.",
  "Tener una participaci\u00F3n colectiva activa en los asuntos p\u00FAblicos y gobernanza de Puerto Rico.",
  "Cualquier otro objetivo establecido por la Asamblea de Integrantes.",
] as const

export const metadata: Metadata = {
  title: "Qui\u00E9nes somos",
  description:
    "Conoce la historia, misi\u00F3n, visi\u00F3n y objetivos de la Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico.",
  openGraph: {
    title: "Qui\u00E9nes somos | ADPUPR",
    description:
      "Conoce la historia, misi\u00F3n, visi\u00F3n y objetivos de la Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico.",
    url: "/nosotros/quienes-somos",
  },
}

export default function QuienesSomosPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-primary px-6 pb-20 pt-20 text-white md:pb-28 md:pt-28">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-sky/30 md:right-[8%] md:top-12"
          />
          <div className="relative mx-auto max-w-[1200px]">
            <div>
              <p className="eyebrow eyebrow-on-dark mb-4">Qui&eacute;nes somos</p>
              <h1 className="max-w-[850px] font-heading text-[clamp(42px,6vw,76px)] font-black leading-[0.98] tracking-[-0.03em] text-white">
                La administraci&oacute;n p&uacute;blica es profundamente humana.
              </h1>
            </div>
          </div>
        </section>

        <section className="bg-bg px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="eyebrow mb-3.5">Nuestra identidad</p>
              <h2 className="font-heading text-3xl font-black leading-tight text-text md:text-4xl">
                Conocimiento al servicio del inter&eacute;s p&uacute;blico.
              </h2>
              <div className="mt-8 h-1 w-16 bg-mustard" aria-hidden="true" />
            </div>

            <div className="space-y-7 font-body text-[17px] leading-[1.8] text-text-muted md:text-lg">
              <p>
                Fundada el 8 de agosto de 2023, la Asociaci&oacute;n de
                Administraci&oacute;n P&uacute;blica de Puerto Rico es una
                organizaci&oacute;n profesional sin fines de lucro dedicada a
                fortalecer la gesti&oacute;n p&uacute;blica en nuestro
                archipi&eacute;lago. Promovemos la investigaci&oacute;n rigurosa y
                el an&aacute;lisis acad&eacute;mico como base para el dise&ntilde;o
                de pol&iacute;ticas p&uacute;blicas &eacute;ticas, eficientes y
                eficaces, poniendo este conocimiento al servicio de la toma de
                decisiones y del inter&eacute;s p&uacute;blico.
              </p>
              <p>
                En la ADPUPR entendemos que la administraci&oacute;n de lo
                p&uacute;blico no es &uacute;nicamente una labor t&eacute;cnica,
                sino profundamente humana. Implica tomar decisiones que
                impactan la vida cotidiana de las personas. Por ello, trabajamos
                en el desarrollo de soluciones informadas para los
                desaf&iacute;os contempor&aacute;neos, abordando problem&aacute;ticas
                complejas desde una perspectiva interdisciplinaria. Actuamos
                como un puente entre el conocimiento acad&eacute;mico, la
                pr&aacute;ctica profesional y la ciudadan&iacute;a.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-2 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid overflow-hidden rounded-lg border border-border lg:grid-cols-2">
              <article className="bg-surface p-8 md:p-12 lg:p-14">
                <p className="eyebrow mb-4">Misi&oacute;n</p>
                <h2 className="font-heading text-3xl font-black leading-tight text-primary md:text-4xl">
                  Fortalecer la sana administraci&oacute;n p&uacute;blica.
                </h2>
                <p className="mt-6 font-body text-base leading-[1.75] text-text-muted md:text-[17px]">
                  La misi&oacute;n de la Asociaci&oacute;n de Administraci&oacute;n
                  P&uacute;blica de Puerto Rico (ADPUPR) es promover y fortalecer
                  la sana administraci&oacute;n p&uacute;blica en Puerto Rico. Nos
                  comprometemos a impulsar la educaci&oacute;n, la investigaci&oacute;n,
                  la innovaci&oacute;n y la participaci&oacute;n en la toma de
                  decisiones p&uacute;blicas.
                </p>
              </article>

              <article className="relative overflow-hidden bg-primary p-8 text-white md:p-12 lg:p-14">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full border-2 border-sky/25"
                />
                <div className="relative">
                  <p className="eyebrow eyebrow-on-dark mb-4">Visi&oacute;n</p>
                  <h2 className="font-heading text-3xl font-black leading-tight text-white md:text-4xl">
                    Ser referente de una gesti&oacute;n eficaz y &eacute;tica.
                  </h2>
                  <p className="mt-6 font-body text-base leading-[1.75] text-text-on-dark-muted md:text-[17px]">
                    Nuestra visi&oacute;n es ser un referente l&iacute;der en la
                    promoci&oacute;n de una administraci&oacute;n p&uacute;blica eficaz
                    y &eacute;tica en Puerto Rico. Aspiramos a ser un catalizador
                    de cambios positivos en la toma de decisiones y pol&iacute;ticas
                    p&uacute;blicas, contribuyendo al desarrollo sostenible, la
                    equidad y la transparencia en nuestro entorno. Vemos un futuro
                    en el que nuestra asociaci&oacute;n sea reconocida por su
                    compromiso con la excelencia en la administraci&oacute;n
                    p&uacute;blica y su impacto en la sociedad puertorrique&ntilde;a.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-bg px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[700px]">
              <p className="eyebrow mb-3.5">Objetivos</p>
              <h2 className="h-section text-text">
                Cinco compromisos que orientan nuestro trabajo.
              </h2>
            </div>

            <ol className="border-t border-border-strong">
              {OBJECTIVES.map((objective, index) => (
                <li
                  key={objective}
                  className="grid gap-4 border-b border-border-strong py-7 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-8 md:py-9"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-3xl font-black tracking-[-0.03em] text-mustard-600"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[850px] font-body text-base leading-[1.7] text-text md:text-[17px]">
                    {objective}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
