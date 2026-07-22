import Link from "next/link"
import { DirectorAvatar } from "./geo-placeholder"

interface Director {
  readonly name: string
  readonly role: string
  readonly bio?: string
}

const CURRENT_BOARD: readonly Director[] = [
  {
    name: "Jonnathan García Rosado, MPA",
    role: "Presidente",
    bio: "Servidor público en el Departamento de Educación. Egresado de la Escuela Graduada de Administración Pública \"Roberto Sánchez Vilella\" (UPR). Cursa estudios doctorales con investigación sobre pobreza energética e inversión extranjera.",
  },
  {
    name: "Luis A. Matos González, Ph.D.",
    role: "Vicepresidente",
    bio: "Catedrático Auxiliar en Ciencias Sociales (UPR Cayey). Doctorado en Gobierno y Políticas Públicas (Universidad de Costa Rica). Especialización en políticas públicas, gobernanza, innovación y transparencia gubernamental.",
  },
  {
    name: "Mariluz Serrano-Ortiz, Ed.D.",
    role: "Secretaria Ejecutiva",
    bio: "Educadora, investigadora y conferenciante internacional. Catedrática Auxiliar en la Facultad de Administración de Empresas de la UPR. Creadora del modelo TIHA (Tecnologías para la Inspiración y la Humanización del Aprendizaje).",
  },
  {
    name: "Victoria Ramírez Lamprea, MPA",
    role: "Directora de Relaciones Públicas",
    bio: "Estudiante de Juris Doctor en la Escuela de Derecho (UPR) y Presidenta de la Clase 2029. Formación en Administración Pública y Estudios Internacionales con visión innovadora y global.",
  },
  {
    name: "Kemuel J. Rodríguez Montalvo, MBA",
    role: "Director de Tesorería",
    bio: "Experiencia sólida en finanzas públicas y administración gubernamental. Ha trabajado en la Comisión de Hacienda, AAFAF, OGP y el Departamento de Educación. Especialista en finanzas públicas y gobernanza.",
  },
  {
    name: "Juan David Alicea Otero",
    role: "Vocal",
    bio: "Bachillerato en Ciencias Sociales con concentración en Relaciones Laborales y Ciencia Política. Cursa Maestría en Administración Pública (UPR Río Piedras) con especialidad en Gobierno y Política Pública.",
  },
  {
    name: "Janiel de Jesús Santiago",
    role: "Vocal",
    bio: "Cursa estudios en la Escuela Graduada de Administración Pública (UPR). Bachillerato en Ciencias Políticas con concentración menor en Derechos Humanos. Enfoque en temas de gobernanza.",
  },
] as const

const FOUNDING_BOARD: readonly Director[] = [
  { name: "Urayoán Jordán Salivia, DPA", role: "Presidente" },
  { name: "Liz J. Ortiz Laureano, PhD", role: "Vicepresidenta" },
  { name: "Deborah R. Román Cortés, MPA", role: "Secretaria" },
  { name: "Rosalie Ayala Colón", role: "Relaciones Públicas" },
] as const

interface DirectorCardProps {
  readonly director: Director
  readonly seed: number
}

function DirectorCard({ director, seed }: DirectorCardProps) {
  return (
    <div className="dir-card" tabIndex={0}>
      <div className="dir-photo">
        <DirectorAvatar seed={seed} />
      </div>
      <div className="dir-overlay">
        <p
          className="font-heading"
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-mustard)",
            margin: 0,
          }}
        >
          {director.role}
        </p>
        <h3
          className="font-heading"
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            margin: "4px 0 0",
            color: "#fff",
          }}
        >
          {director.name}
        </h3>
        {director.bio && <p className="dir-bio">{director.bio}</p>}
      </div>
    </div>
  )
}

interface DirectorsProps {
  readonly variant?: "preview" | "full"
}

export default function Directors({ variant = "preview" }: DirectorsProps) {
  if (variant === "full") {
    return (
      <>
        <section
          id="directores"
          className="px-6 py-24 md:py-[112px]"
          style={{ background: "var(--color-bg)" }}
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[760px]">
              <p className="eyebrow mb-3.5">Junta actual</p>
              <h2 className="h-section text-text">2025&ndash;2027</h2>
              <p className="lede mt-3.5">
                Pase el cursor sobre cada miembro para conocer su trayectoria.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {CURRENT_BOARD.map((d, i) => (
                <DirectorCard key={d.name} director={d} seed={i} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="historia-fundacion"
          className="px-6 py-20 md:py-24"
          style={{ background: "var(--color-surface-2)" }}
        >
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[760px]">
              <p className="eyebrow mb-3.5">
                Junta fundadora &middot; 2023&ndash;2025
              </p>
              <h2 className="h-section text-text">
                Equipo que estableci&oacute; la Asociaci&oacute;n.
              </h2>
              <p className="lede mt-3.5">
                Equipo fundador que impuls&oacute; la creaci&oacute;n y el
                establecimiento de ADPUPR como un espacio profesional y
                acad&eacute;mico de impacto en Puerto Rico.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {FOUNDING_BOARD.map((d, i) => (
                <DirectorCard key={d.name} director={d} seed={i + 4} />
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <section
      id="directores"
      className="px-6 py-24 md:py-28 lg:py-[112px]"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <div>
            <p
              className="eyebrow"
              style={{ color: "var(--color-sky)", marginBottom: 14 }}
            >
              Junta de Directores &middot; 2025&ndash;2027
            </p>
            <h2 className="h-section text-white">Liderazgo y legado.</h2>
          </div>
          <Link
            href="/nosotros/estructura-organizacional"
            className="inline-flex items-center gap-2 rounded-sm border border-white/70 px-5 py-3 font-heading text-sm font-semibold text-white transition-colors hover:bg-white hover:text-primary"
          >
            Ver junta completa <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {CURRENT_BOARD.slice(0, 4).map((d, i) => (
            <DirectorCard key={d.name} director={d} seed={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
