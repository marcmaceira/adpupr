import type { Metadata } from "next"
import BoardMembers from "@/components/board-members"
import CommitteeDetails from "@/components/committee-details"
import Footer from "@/components/footer"
import Header from "@/components/header"

interface BoardMember {
  readonly name: string
  readonly role: string
  readonly bio: string
}

const BOARD_MEMBERS: readonly BoardMember[] = [
  {
    role: "Presidente",
    name: "Jonnathan Garc\u00EDa Rosado, MPA",
    bio: "Servidor p\u00FAblico en el Departamento de Educaci\u00F3n. Egresado de la Escuela Graduada de Administraci\u00F3n P\u00FAblica \"Roberto S\u00E1nchez Vilella\" (UPR). Cursa estudios doctorales con investigaci\u00F3n sobre pobreza energ\u00E9tica e inversi\u00F3n extranjera.",
  },
  {
    role: "Vicepresidente",
    name: "Luis A. Matos Gonz\u00E1lez, Ph.D.",
    bio: "Catedr\u00E1tico Auxiliar en Ciencias Sociales (UPR Cayey). Doctorado en Gobierno y Pol\u00EDticas P\u00FAblicas (Universidad de Costa Rica). Especializaci\u00F3n en pol\u00EDticas p\u00FAblicas, gobernanza, innovaci\u00F3n y transparencia gubernamental.",
  },
  {
    role: "Secretaria Ejecutiva",
    name: "Mariluz Serrano-Ortiz, Ed.D.",
    bio: "Educadora, investigadora y conferenciante internacional. Catedr\u00E1tica Auxiliar en la Facultad de Administraci\u00F3n de Empresas de la UPR. Creadora del modelo TIHA (Tecnolog\u00EDas para la Inspiraci\u00F3n y la Humanizaci\u00F3n del Aprendizaje).",
  },
  {
    role: "Director de Tesorer\u00EDa",
    name: "Juan David Alicea Otero",
    bio: "Bachillerato en Ciencias Sociales con concentraci\u00F3n en Relaciones Laborales y Ciencia Pol\u00EDtica. Cursa Maestr\u00EDa en Administraci\u00F3n P\u00FAblica (UPR R\u00EDo Piedras) con especialidad en Gobierno y Pol\u00EDtica P\u00FAblica.",
  },
  {
    role: "Directora de Relaciones P\u00FAblicas",
    name: "Victoria Ram\u00EDrez Lamprea, MPA",
    bio: "Estudiante de Juris Doctor en la Escuela de Derecho (UPR) y Presidenta de la Clase 2029. Egresada de la Escuela Graduada de Administraci\u00F3n P\u00FAblica \"Roberto S\u00E1nchez Vilella\" (UPR). Formaci\u00F3n en Administraci\u00F3n P\u00FAblica y Estudios Internacionales con visi\u00F3n innovadora y global.",
  },
  {
    role: "Vocal de la Junta de Directores",
    name: "Janiel de Jes\u00FAs Santiago",
    bio: "Cursa estudios en la Escuela Graduada de Administraci\u00F3n P\u00FAblica (UPR). Bachillerato en Ciencias Pol\u00EDticas con concentraci\u00F3n menor en Derechos Humanos. Enfoque en temas de gobernanza.",
  },
  {
    role: "Vocal de la Junta de Directores",
    name: "Ana Teresa Rodr\u00EDguez Lebr\u00F3n, PhD",
    bio: "Especialista en educaci\u00F3n superior, gobernanza y \u00E9tica de las tecnolog\u00EDas emergentes, con formaci\u00F3n doctoral en literatura, Juris Doctor y Maestr\u00EDa en Administraci\u00F3n P\u00FAblica. Se desempe\u00F1a como investigadora y conferencista en inteligencia artificial, gobernanza de internet y \u00E9tica aplicada.",
  },
] as const

export const metadata: Metadata = {
  title: "Estructura organizacional",
  description:
    "Conoce la Junta Directiva y la estructura de comit\u00E9s de la Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico.",
  openGraph: {
    title: "Estructura organizacional | ADPUPR",
    description:
      "Conoce la Junta Directiva y la estructura de comit\u00E9s de la Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico.",
    url: "/nosotros/estructura-organizacional",
  },
}

export default function EstructuraOrganizacionalPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-primary px-6 py-20 text-white md:py-28">
          <div
            aria-hidden="true"
            className="absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-sky/25"
          />
          <div
            aria-hidden="true"
            className="absolute right-10 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-sky/10"
          />
          <div className="relative mx-auto max-w-[1200px]">
            <p className="eyebrow eyebrow-on-dark mb-4">Nosotros</p>
            <h1 className="max-w-[900px] font-heading text-[clamp(44px,7vw,82px)] font-black leading-[0.96] tracking-[-0.035em] text-white">
              Estructura organizacional
            </h1>
            <p className="mt-7 max-w-[620px] font-body text-lg leading-[1.7] text-text-on-dark-muted">
              Conozca a quienes integran la Junta Directiva y c&oacute;mo se
              organiza el trabajo institucional de la ADPUPR.
            </p>
            <nav
              className="mt-9 flex flex-wrap gap-3"
              aria-label={"Contenido de la p\u00E1gina"}
            >
              <a
                href="#junta-directiva"
                className="rounded-sm bg-mustard px-5 py-3 font-heading text-sm font-bold text-primary transition-colors hover:bg-mustard-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ver Junta Directiva
              </a>
              <a
                href="#comites"
                className="rounded-sm border border-white/60 px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ver comit&eacute;s
              </a>
            </nav>
          </div>
        </section>

        <section id="junta-directiva" className="bg-bg px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 grid gap-6 border-b border-border-strong pb-10 md:grid-cols-[1fr_0.8fr] md:items-end">
              <div>
                <p className="eyebrow mb-3.5">Liderazgo institucional</p>
                <h2 className="h-section text-text">Junta Directiva</h2>
              </div>
              <p className="font-body text-base leading-[1.7] text-text-muted md:justify-self-end md:text-right">
                Profesionales comprometidos con fortalecer la administraci&oacute;n
                p&uacute;blica de Puerto Rico.
              </p>
            </div>

            <BoardMembers members={BOARD_MEMBERS} />
          </div>
        </section>

        <CommitteeDetails />
      </main>
      <Footer />
    </>
  )
}
