import { UserRound } from "lucide-react"

interface Coordinator {
  readonly name?: string
  readonly bio: string
}

interface Committee {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly focus?: string
  readonly functionsLabel: string
  readonly functions: readonly string[]
  readonly administration?: readonly string[]
  readonly coordinator: Coordinator
}

const COMMITTEES: readonly Committee[] = [
  {
    id: "publicaciones-institucionales",
    name: "Publicaciones Institucionales",
    description:
      "El Comit\u00E9 de Publicaciones Institucionales tiene como finalidad coordinar, supervisar y fortalecer los productos comunicativos formales y acad\u00E9micos de la Asociaci\u00F3n, de manera que reflejen su misi\u00F3n, visi\u00F3n y valores. Adem\u00E1s, estas comunicaciones servir\u00E1n para divulgar temas afines a la membres\u00EDa, incluyendo actividades, logros y aportaciones de las personas que la componen.",
    focus:
      "En estos momentos, el eje principal del trabajo del Comit\u00E9 es el bolet\u00EDn institucional de la Asociaci\u00F3n, complementado por c\u00E1psulas educativas publicadas en las redes sociales oficiales.",
    functionsLabel: "El alcance del Comit\u00E9 incluye",
    functions: [
      "Planificar, coordinar y evaluar el bolet\u00EDn institucional de la Asociaci\u00F3n.",
      "Dise\u00F1ar y coordinar c\u00E1psulas educativas para su difusi\u00F3n en redes sociales, en coordinaci\u00F3n con la Junta ADPU-PR y otros comit\u00E9s.",
      "Proponer lineamientos editoriales y de estilo para las publicaciones institucionales, como el bolet\u00EDn, las c\u00E1psulas y los comunicados.",
    ],
    administration: [
      "El Comit\u00E9 estar\u00E1 compuesto por un m\u00EDnimo de tres y un m\u00E1ximo de siete miembros. Contar\u00E1 con un subcomit\u00E9 operativo, el Consejo Administrativo, integrado por un editor o editora y dos miembros adicionales del Comit\u00E9.",
      "El Consejo Administrativo planificar\u00E1 cada n\u00FAmero del bolet\u00EDn dentro de los temas y lineamientos aprobados. Esto incluye seleccionar el tema, las noticias recientes, la entrevista y los art\u00EDculos de opini\u00F3n. Tambi\u00E9n ser\u00E1 responsable del montaje y la edici\u00F3n del bolet\u00EDn informativo.",
      "Se considerar\u00E1n las recomendaciones, ideas y estrategias de los miembros del Comit\u00E9. El Consejo Administrativo tomar\u00E1 las decisiones de acuerdo con la misi\u00F3n y los valores de ADPU-PR.",
    ],
    coordinator: {
      bio: "Catedr\u00E1tica Auxiliar en la Escuela Graduada de Administraci\u00F3n P\u00FAblica de la Universidad de Puerto Rico, Recinto de R\u00EDo Piedras. Posee un doctorado en Psicolog\u00EDa Industrial Organizacional de la UPR-RP, con formaci\u00F3n en el an\u00E1lisis de factores psicosociales que influyen en la experiencia laboral y en el dise\u00F1o de entornos de trabajo m\u00E1s justos. Su trayectoria integra la docencia, la investigaci\u00F3n y la consultor\u00EDa, con proyectos de clasificaci\u00F3n, retribuci\u00F3n y recursos humanos en el sector p\u00FAblico. Ha publicado art\u00EDculos en revistas arbitradas sobre equidad de g\u00E9nero, reclutamiento y selecci\u00F3n de personas empleadas, y se desempe\u00F1a como editora de la Revista de Administraci\u00F3n P\u00FAblica. Su agenda acad\u00E9mica se centra en la intersecci\u00F3n entre pol\u00EDticas p\u00FAblicas y gesti\u00F3n del talento humano, con \u00E9nfasis en equidad, diversidad, empleo y estrategias de reclutamiento y selecci\u00F3n. Adem\u00E1s, brinda consultor\u00EDa al sector p\u00FAblico en temas vinculados a los recursos humanos.",
    },
  },
  {
    id: "asuntos-legislativos",
    name: "Asuntos Legislativos",
    description:
      "El Comit\u00E9 de Asuntos Legislativos tiene la responsabilidad de analizar, dar seguimiento y comunicar a la membres\u00EDa los desarrollos legislativos y regulatorios que impactan la administraci\u00F3n p\u00FAblica en Puerto Rico. Su funci\u00F3n es servir como puente entre los procesos formales de formulaci\u00F3n de pol\u00EDtica p\u00FAblica y la comunidad profesional de ADPUPR, promoviendo una comprensi\u00F3n accesible, rigurosa y no partidista de los cambios legales que afectan el servicio p\u00FAblico, las instituciones gubernamentales y la gesti\u00F3n administrativa.",
    functionsLabel: "Funciones principales",
    functions: [
      "Monitoreo legislativo sistem\u00E1tico: revisar proyectos de ley, resoluciones conjuntas, informes, reglamentos y decisiones administrativas con impacto en la administraci\u00F3n p\u00FAblica.",
      "An\u00E1lisis t\u00E9cnico y res\u00FAmenes ejecutivos: elaborar c\u00E1psulas informativas, an\u00E1lisis comparados y documentos breves que expliquen en lenguaje claro los cambios legislativos relevantes para el ecosistema p\u00FAblico.",
      "Redacci\u00F3n de ponencias: preparar ponencias sobre medidas relacionadas con la administraci\u00F3n p\u00FAblica y el funcionamiento del servicio p\u00FAblico en las ramas ejecutiva, legislativa y judicial, incluyendo proyectos de ley, resoluciones, reglamentos, \u00F3rdenes ejecutivas y administrativas, y cartas circulares.",
    ],
    coordinator: {
      name: "Javier Cuevas Landr\u00F3n",
      bio: "Servidor p\u00FAblico con varios a\u00F1os de experiencia en las ramas legislativa y ejecutiva del Gobierno de Puerto Rico. Con preparaci\u00F3n en ciencias pol\u00EDticas y administraci\u00F3n p\u00FAblica, ha integrado m\u00FAltiples organizaciones p\u00FAblicas y pol\u00EDticas a nivel estatal y federal. Comenz\u00F3 su carrera en el Senado de Puerto Rico, donde trabaj\u00F3 en la Oficina del Portavoz de la Mayor\u00EDa, el Comit\u00E9 de Reglas y Calendarios y una de las Portavoc\u00EDas Alternas de la Minor\u00EDa. Posee experiencia detallada en el proceso legislativo, los procedimientos parlamentarios y las relaciones intergubernamentales. Actualmente es ayudante especial del Secretario de Salud de Puerto Rico y coordinador del Comit\u00E9 de Asuntos Legislativos de ADPUPR.",
    },
  },
  {
    id: "educacion-tecnologia",
    name: "Educaci\u00F3n y Tecnolog\u00EDa",
    description:
      "El Comit\u00E9 de Educaci\u00F3n y Tecnolog\u00EDa de ADPUPR tiene como prop\u00F3sito fomentar una cultura de aprendizaje continuo dentro de la Asociaci\u00F3n y aportar al desarrollo de una ciudadan\u00EDa informada. Su trabajo integra la educaci\u00F3n en temas de administraci\u00F3n p\u00FAblica con el uso de las tecnolog\u00EDas, promoviendo el acceso al conocimiento y el pensamiento cr\u00EDtico que contribuyan al bienestar colectivo.",
    functionsLabel: "Funciones",
    functions: [
      "Desarrollar contenidos educativos accesibles en diversos formatos y medios.",
      "Integrar herramientas tecnol\u00F3gicas innovadoras a los procesos educativos del Comit\u00E9, promoviendo su uso responsable, \u00E9tico y efectivo.",
      "Apoyar la misi\u00F3n de ADPUPR mediante actividades educativas.",
    ],
    coordinator: {
      name: "Dr. Urayo\u00E1n Jord\u00E1n Salivia",
      bio: "Presidente fundador de ADPUPR y profesor de la Escuela Graduada de Administraci\u00F3n P\u00FAblica de la Universidad de Puerto Rico, Recinto de R\u00EDo Piedras. Posee un Doctorado en Administraci\u00F3n P\u00FAblica de la Universidad de Baltimore y una Maestr\u00EDa en Administraci\u00F3n P\u00FAblica de la UPR R\u00EDo Piedras. Cuenta con una amplia trayectoria como acad\u00E9mico, administrador p\u00FAblico y asesor parlamentario profesional. Su experiencia integra la docencia, el procedimiento parlamentario, la gobernanza organizacional y el fortalecimiento de entidades p\u00FAblicas, profesionales y comunitarias. Como coordinador del Comit\u00E9, impulsa iniciativas formativas orientadas al desarrollo de competencias pr\u00E1cticas para la gesti\u00F3n p\u00FAblica, la deliberaci\u00F3n democr\u00E1tica y la toma de decisiones institucionales. Su aportaci\u00F3n fortalece la misi\u00F3n educativa de ADPUPR y su compromiso con una administraci\u00F3n p\u00FAblica \u00E9tica, efectiva e innovadora.",
    },
  },
] as const

function CoordinatorProfile({ coordinator }: { readonly coordinator: Coordinator }) {
  return (
    <aside className="rounded-lg bg-primary p-6 text-white md:p-8">
      <div className="flex items-center gap-5 border-b border-sky/25 pb-6">
        <div
          className="flex h-24 w-20 shrink-0 items-center justify-center rounded-md border border-sky/35 bg-primary-700 text-sky"
          aria-label="Espacio reservado para la foto de la persona coordinadora"
        >
          <UserRound className="h-9 w-9" strokeWidth={1.4} aria-hidden="true" />
        </div>
        <div>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.14em] text-sky">
            Coordinaci&oacute;n
          </p>
          <h4 className="mt-2 font-heading text-xl font-extrabold leading-tight text-white">
            {coordinator.name ?? "Coordinadora del Comit\u00E9"}
          </h4>
          <p className="mt-2 font-body text-xs text-text-on-dark-muted">
            Foto pr&oacute;ximamente
          </p>
        </div>
      </div>
      <p className="mt-6 font-body text-sm leading-[1.75] text-text-on-dark-muted">
        {coordinator.bio}
      </p>
    </aside>
  )
}

function CommitteeArticle({ committee, index }: { readonly committee: Committee; readonly index: number }) {
  return (
    <article id={committee.id} className="scroll-mt-24 border-t border-border-strong py-16 first:border-t-0 first:pt-0 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.75fr)] lg:gap-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mustard font-heading text-xs font-black text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="eyebrow">Comit&eacute; de trabajo</p>
          </div>
          <h3 className="mt-5 max-w-[760px] font-heading text-[clamp(28px,4vw,42px)] font-black leading-[1.08] text-primary">
            Comit&eacute; de {committee.name}
          </h3>
          <p className="mt-6 font-body text-base leading-[1.8] text-text-muted md:text-lg">
            {committee.description}
          </p>

          {committee.focus ? (
            <p className="mt-7 border-l-4 border-mustard bg-mustard-200/45 px-5 py-4 font-body text-base font-semibold leading-[1.7] text-primary">
              {committee.focus}
            </p>
          ) : null}

          <h4 className="mt-10 font-heading text-xl font-extrabold text-text">
            {committee.functionsLabel}
          </h4>
          <ul className="mt-5 space-y-4">
            {committee.functions.map((item) => (
              <li key={item} className="grid grid-cols-[10px_1fr] gap-4 font-body text-[15px] leading-[1.75] text-text-muted">
                <span className="mt-[0.65em] h-2.5 w-2.5 rounded-full bg-sky" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {committee.administration ? (
            <div className="mt-10 rounded-lg border border-border bg-surface-2 p-6 md:p-8">
              <h4 className="font-heading text-xl font-extrabold text-text">
                Consejo Administrativo
              </h4>
              <div className="mt-4 space-y-4">
                {committee.administration.map((paragraph) => (
                  <p key={paragraph} className="font-body text-[15px] leading-[1.75] text-text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="lg:pt-16">
          <CoordinatorProfile coordinator={committee.coordinator} />
        </div>
      </div>
    </article>
  )
}

export default function CommitteeDetails() {
  return (
    <section id="comites" className="bg-bg px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-8 border-b border-border-strong pb-12 md:grid-cols-[1fr_0.8fr] md:items-end">
          <div>
            <p className="eyebrow mb-3.5">Comit&eacute;s de trabajo</p>
            <h2 className="h-section text-text">Donde se hace el trabajo.</h2>
          </div>
          <p className="lede md:justify-self-end">
            Tres comit&eacute;s estructuran la actividad sustantiva de la
            Asociaci&oacute;n, cada uno con responsabilidades definidas y abierto a
            la participaci&oacute;n de la membres&iacute;a.
          </p>
        </div>

        <nav className="my-10 grid gap-3 sm:grid-cols-3" aria-label="Comit&eacute;s de trabajo">
          {COMMITTEES.map((committee, index) => (
            <a
              key={committee.id}
              href={`#${committee.id}`}
              className="group flex min-h-20 items-center gap-4 rounded-md border border-border bg-surface px-5 py-4 font-heading text-sm font-bold leading-snug text-primary shadow-[var(--shadow-card)] transition-colors hover:border-sky hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="text-xs font-black text-sky-600">0{index + 1}</span>
              <span>{committee.name}</span>
            </a>
          ))}
        </nav>

        <div>
          {COMMITTEES.map((committee, index) => (
            <CommitteeArticle key={committee.id} committee={committee} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
