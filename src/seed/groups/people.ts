import type { BlockInput, GroupSeed, SeedContext } from "../context";
import { inSequence } from "../context";

/** Read-only Blob store root that served the portraits before the CMS. */
const BLOB = "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com";

interface PersonSeed {
  readonly slug: string;
  readonly name: string;
  /** Blob pathname of the original portrait. */
  readonly portrait: string;
  readonly bio?: string;
}

/**
 * The 15 people who appear on the site, once each. Where a placement shows a different
 * spelling, the placement carries a display name override (see the fixtures below).
 * Jonnathan's two Blob portraits are byte-identical, so only one is imported.
 */
const PEOPLE: readonly PersonSeed[] = [
  {
    slug: "jonnathan-garcia-rosado",
    name: "Jonnathan García Rosado",
    portrait: "jonnathan-garcia-c62e3a40-d4b6-47cd-982c-abc816eb1059.png",
    bio: 'Servidor público en el Departamento de Educación. Egresado de la Escuela Graduada de Administración Pública "Roberto Sánchez Vilella" (UPR). Cursa estudios doctorales con investigación sobre pobreza energética e inversión extranjera.',
  },
  {
    slug: "luis-matos-gonzalez",
    name: "Luis A. Matos González, Ph.D.",
    portrait: "luis-matos-2b67915d-b6cc-4b95-ad2e-b5c465a42ea9.png",
    bio: "Catedrático Auxiliar en Ciencias Sociales (UPR Cayey). Doctorado en Gobierno y Políticas Públicas (Universidad de Costa Rica). Especialización en políticas públicas, gobernanza, innovación y transparencia gubernamental.",
  },
  {
    slug: "mariluz-serrano-ortiz",
    name: "Mariluz Serrano-Ortiz, Ed.D.",
    portrait: "mariluz-serrano-82cca165-f382-4b59-9021-6722ec453d73.png",
    bio: "Educadora, investigadora y conferenciante internacional. Catedrática Auxiliar en la Facultad de Administración de Empresas de la UPR. Creadora del modelo TIHA (Tecnologías para la Inspiración y la Humanización del Aprendizaje).",
  },
  {
    slug: "juan-david-alicea-otero",
    name: "Juan David Alicea Otero",
    portrait: "juan-david-d39b7bbc-dda3-4527-8f5d-d6400cd0e663.png",
    bio: "Bachillerato en Ciencias Sociales con concentración en Relaciones Laborales y Ciencia Política. Cursa Maestría en Administración Pública (UPR Río Piedras) con especialidad en Gobierno y Política Pública.",
  },
  {
    slug: "victoria-ramirez-lamprea",
    name: "Victoria Ramírez Lamprea, MPA",
    portrait: "victoria-ramirez-cee9d93e-160d-46ad-b8e0-baf225f2b9e8.png",
    bio: 'Estudiante de Juris Doctor en la Escuela de Derecho (UPR) y Presidenta de la Clase 2029. Egresada de la Escuela Graduada de Administración Pública "Roberto Sánchez Vilella" (UPR). Formación y experiencia en Administración Pública y Estudios Internacionales con visión innovadora y global.',
  },
  {
    slug: "janiel-de-jesus-santiago",
    name: "Janiel de Jesús Santiago",
    portrait: "janiel-de-jesus-7e19a5ae-dd35-43fa-b117-21e6e25e3662.png",
    bio: "Cursa estudios en la Escuela Graduada de Administración Pública (UPR). Bachillerato en Ciencias Políticas con concentración menor en Derechos Humanos. Enfoque en temas de gobernanza.",
  },
  {
    slug: "ana-teresa-rodriguez-lebron",
    name: "Ana Teresa Rodríguez Lebrón, PhD",
    portrait: "ana-rodriguez-edd82bd9-04dc-4206-9af9-04d2a53708d3.png",
    bio: "Especialista en educación superior, gobernanza y ética de las tecnologías emergentes, con formación doctoral en literatura, Juris Doctor y Maestría en Administración Pública. Se desempeña como investigadora y conferencista en inteligencia artificial, gobernanza de internet y ética aplicada.",
  },
  {
    slug: "urayoan-jordan-salivia",
    name: "Urayoán Jordán Salivia",
    portrait: "urayoan-305ea19e-e0e2-4e31-a8dc-6567867b49cd.png",
    bio: "Profesor de la Escuela Graduada de Administración Pública (EGAP) de la Universidad de Puerto Rico, Recinto de Río Piedras. Posee un Doctorado en Administración Pública de la Universidad de Baltimore y una Maestría en Administración Pública de la UPR Río Piedras. Fue el Presidente fundador de ADPUPR. Cuenta con una amplia trayectoria como académico, administrador público y asesor parlamentario profesional. Su experiencia integra la docencia, el procedimiento parlamentario, la gobernanza organizacional y el fortalecimiento de entidades públicas, profesionales y comunitarias. Como coordinador del Comité de Educación y Tecnología de ADPUPR, impulsa iniciativas formativas orientadas al desarrollo de competencias prácticas para la gestión pública, la deliberación democrática y la toma de decisiones institucionales. Su aportación fortalece la misión educativa de ADPUPR y su compromiso con una administración pública ética, efectiva e innovadora.",
  },
  {
    slug: "liz-ortiz-laureano",
    name: "Liz. J. Ortiz Laureano",
    portrait: "liz-68f1ad00-d563-4d6a-b9f6-58e974a11a24.png",
  },
  {
    slug: "deborah-roman-cortes",
    name: "Déborah R. Román Cortés",
    portrait: "debora-60cc4ded-688e-466f-8d5c-2e78b022aa38.png",
  },
  {
    slug: "rosalie-ayala-colon",
    name: "Rosalie Ayala Colón",
    portrait: "rosalie-6bc1df39-30e0-4c76-bd31-ab4570bad221.png",
  },
  {
    slug: "alexis-gomez-rivera",
    name: "Alexis Gómez Rivera",
    portrait: "alexis-f9f50ad9-3b17-4fe9-b85c-4cb1cd7111ab.png",
  },
  {
    slug: "jonuel-negron",
    name: "Jonuel Negrón",
    portrait: "jonuel-negron-12649ace-f27c-4fab-af6a-a5cc253c78fd.png",
  },
  {
    slug: "deliz-rodriguez-carrasquillo",
    // The old page had a trailing space here ("…, Ph.D. "); it is not visible and is trimmed.
    name: "Deliz Rodríguez-Carrasquillo, Ph.D.",
    portrait: "deliz-9c750515-e457-4653-bfbe-fc8fbc112d2c.png",
    bio: "Catedrática Auxiliar en la Escuela Graduada de Administración Pública de la Universidad de Puerto Rico, Recinto de Río Piedras. Posee un doctorado en Psicología Industrial Organizacional de la UPR-RP, con formación en el análisis de factores psicosociales que influyen en la experiencia laboral y en el diseño de entornos de trabajo más justos. Su trayectoria integra la docencia, la investigación y la consultoría, con proyectos de clasificación, retribución y recursos humanos en el sector público. Ha publicado artículos en revistas arbitradas sobre equidad de género, reclutamiento y selección de personas empleadas, y se desempeña como editora de la Revista de Administración Pública. Su agenda académica se centra en la intersección entre políticas públicas y gestión del talento humano, con énfasis en equidad, diversidad, empleo y estrategias de reclutamiento y selección. Además, brinda consultoría al sector público en temas vinculados a los recursos humanos.",
  },
  {
    slug: "javier-cuevas-landron",
    name: "Javier Cuevas Landrón",
    portrait: "javier-c4fcd99b-48d2-4471-9d88-d97bd93a59c7.png",
    bio: "Servidor público con varios años de experiencia en las ramas legislativa y ejecutiva del Gobierno de Puerto Rico. Con preparación en ciencias políticas y administración pública, ha integrado múltiples organizaciones públicas y políticas a nivel estatal y federal. Comenzó su carrera en el Senado de Puerto Rico, donde trabajó en la Oficina del Portavoz de la Mayoría, el Comité de Reglas y Calendarios y una de las Portavocías Alternas de la Minoría. Posee experiencia detallada en el proceso legislativo, los procedimientos parlamentarios y las relaciones intergubernamentales. Actualmente es ayudante especial del Secretario de Salud de Puerto Rico y coordinador del Comité de Asuntos Legislativos de ADPUPR.",
  },
];

/** Person ids by slug, filled by `collections` (which always runs before fixtures). */
const personIds = new Map<string, number>();

async function personId(ctx: SeedContext, slug: string): Promise<number> {
  const known = personIds.get(slug);
  if (known) return known;
  const { docs } = await ctx.payload.find({
    collection: "people",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const id = docs[0]?.id;
  if (!id) throw new Error(`No seeded person with slug ${slug}`);
  personIds.set(slug, id);
  return id;
}

async function seedPeople(ctx: SeedContext) {
  await inSequence(PEOPLE, async (person) => {
    const portrait = await ctx.media({
      source: `${BLOB}/${person.portrait}`,
      alt: `Retrato de ${person.name}`,
      filename: `retrato-${person.slug}.png`,
    });
    const id = await ctx.upsert(
      "people",
      { slug: { equals: person.slug } },
      { slug: person.slug, name: person.name, portrait, bio: person.bio ?? null },
    );
    personIds.set(person.slug, id);
  });
  ctx.log(`${PEOPLE.length} people ready`);
}

async function seedCommittees(ctx: SeedContext) {
  const id = (slug: string) => personId(ctx, slug);
  const committees = [
    {
      slug: "publicaciones-institucionales",
      order: 1,
      name: "Publicaciones Institucionales",
      description:
        "El Comité de Publicaciones Institucionales tiene como finalidad coordinar, supervisar y fortalecer los productos comunicativos formales y académicos de la Asociación, de manera que reflejen su misión, visión y valores. Además, estas comunicaciones servirán para divulgar temas afines a la membresía, incluyendo actividades, logros y aportaciones de las personas que la componen.",
      focus:
        "En estos momentos, el eje principal del trabajo del Comité es el boletín institucional de la Asociación, complementado por cápsulas educativas publicadas en las redes sociales oficiales.",
      functionsLabel: "El alcance del Comité incluye",
      functions: [
        { text: "Planificar, coordinar y evaluar el boletín institucional de la Asociación." },
        {
          text: "Diseñar y coordinar cápsulas educativas para su difusión en redes sociales, en coordinación con la Junta ADPU-PR y otros comités.",
        },
        {
          text: "Proponer lineamientos editoriales y de estilo para las publicaciones institucionales, como el boletín, las cápsulas y los comunicados.",
        },
      ],
      coordinator: { person: await id("deliz-rodriguez-carrasquillo") },
      editorialBoard: {
        title: "Junta Editora",
        summary:
          "La Junta Editora lidera la planificación, coordinación y producción del Boletín Informativo de la ADPUPR, velando por la calidad editorial, la pertinencia de los contenidos y la difusión de información de interés para la comunidad profesional de la administración pública.",
        members: [
          {
            person: await id("deliz-rodriguez-carrasquillo"),
            displayName: "Dra. Deliz Rodríguez Carrasquillo",
            role: "Coordinadora del Comité",
          },
          {
            person: await id("jonnathan-garcia-rosado"),
            role: "Presidente de la ADPUPR y Miembro del Comité",
          },
          {
            person: await id("victoria-ramirez-lamprea"),
            displayName: "Victoria Ramírez",
            role: "Directora de Relaciones Públicas de la ADPUPR y Miembro del Comité",
          },
        ],
        responsibilities: [
          {
            text: "Planificar cada número del boletín, en el marco de los temas y lineamientos aprobados por el Comité de Publicaciones Institucionales. Esto incluye la selección del tema, cantidad de noticias recientes, entrevista y los artículos de opinión.",
          },
          {
            text: "Además, la Junta Editora será responsable del montaje y edición del boletín informativo.",
          },
          {
            text: "Se considerarán todas las recomendaciones, ideas y estrategias de los miembros del Comité y la Junta Editora tomará la decisión de acuerdo con la misión y valores de ADPUPR.",
          },
        ],
      },
    },
    {
      slug: "asuntos-legislativos",
      order: 2,
      name: "Asuntos Legislativos",
      description:
        "El Comité de Asuntos Legislativos tiene la responsabilidad de analizar, dar seguimiento y comunicar a la membresía los desarrollos legislativos y regulatorios que impactan la administración pública en Puerto Rico. Su función es servir como puente entre los procesos formales de formulación de política pública y la comunidad profesional de ADPUPR, promoviendo una comprensión accesible, rigurosa y no partidista de los cambios legales que afectan el servicio público, las instituciones gubernamentales y la gestión administrativa.",
      focus: null,
      functionsLabel: "Funciones principales",
      functions: [
        {
          text: "Monitoreo legislativo sistemático: revisar proyectos de ley, resoluciones conjuntas, informes, reglamentos y decisiones administrativas con impacto en la administración pública.",
        },
        {
          text: "Análisis técnico y resúmenes ejecutivos: elaborar cápsulas informativas, análisis comparados y documentos breves que expliquen en lenguaje claro los cambios legislativos relevantes para el ecosistema público.",
        },
        {
          text: "Redacción de ponencias: preparar ponencias sobre medidas relacionadas con la administración pública y el funcionamiento del servicio público en las ramas ejecutiva, legislativa y judicial, incluyendo proyectos de ley, resoluciones, reglamentos, órdenes ejecutivas y administrativas, y cartas circulares.",
        },
      ],
      coordinator: { person: await id("javier-cuevas-landron") },
      editorialBoard: { title: null, summary: null, members: [], responsibilities: [] },
    },
    {
      slug: "educacion-tecnologia",
      order: 3,
      name: "Educación y Tecnología",
      description:
        "El Comité de Educación y Tecnología de ADPUPR tiene como propósito fomentar una cultura de aprendizaje continuo dentro de la Asociación y aportar al desarrollo de una ciudadanía informada. Su trabajo integra la educación en temas de administración pública con el uso de las tecnologías, promoviendo el acceso al conocimiento y el pensamiento crítico que contribuyan al bienestar colectivo.",
      focus: null,
      functionsLabel: "Funciones",
      functions: [
        { text: "Desarrollar contenidos educativos accesibles en diversos formatos y medios." },
        {
          text: "Integrar herramientas tecnológicas innovadoras a los procesos educativos del Comité, promoviendo su uso responsable, ético y efectivo.",
        },
        { text: "Apoyar la misión de ADPUPR mediante actividades educativas." },
      ],
      coordinator: {
        person: await id("urayoan-jordan-salivia"),
        displayName: "Dr. Urayoán Jordán Salivia",
      },
      editorialBoard: { title: null, summary: null, members: [], responsibilities: [] },
    },
  ];

  await inSequence(committees, (committee) =>
    ctx.upsert("committees", { slug: { equals: committee.slug } }, committee),
  );
  ctx.log(`${committees.length} committees ready`);
}

/* ───────────── Block fixtures ───────────── */

const PORTRAIT_ALT = "Retrato de {nombre}";

const boardLabels = {
  portraitAlt: PORTRAIT_ALT,
  open: "Ver biografía",
  openAria: "Ver biografía de {nombre}",
  bioAria: "Biografía de {nombre}",
  closeAria: "Cerrar biografía de {nombre}",
};

async function board(ctx: SeedContext, anchorId: string | null): Promise<BlockInput<"peopleGrid">> {
  const row = async (slug: string, role: string, displayName?: string) => ({
    person: await personId(ctx, slug),
    role,
    displayName: displayName ?? null,
  });
  return {
    blockType: "peopleGrid",
    variant: "bioOverlay",
    eyebrow: "Liderazgo institucional",
    heading: "Junta Directiva",
    intro: "Profesionales comprometidos con fortalecer la administración pública de Puerto Rico.",
    members: [
      await row("jonnathan-garcia-rosado", "Presidente", "Jonnathan García Rosado, MPA"),
      await row("luis-matos-gonzalez", "Vicepresidente"),
      await row("mariluz-serrano-ortiz", "Secretaria Ejecutiva"),
      await row("juan-david-alicea-otero", "Director de Tesorería"),
      await row("victoria-ramirez-lamprea", "Directora de Relaciones Públicas"),
      await row("janiel-de-jesus-santiago", "Vocal de la Junta de Directores"),
      await row("ana-teresa-rodriguez-lebron", "Vocal de la Junta de Directores"),
    ],
    labels: boardLabels,
    showBios: false,
    settings: { anchorId },
  };
}

async function founders(
  ctx: SeedContext,
  anchorId: string | null,
): Promise<BlockInput<"peopleGrid">> {
  const row = async (slug: string, role: string) => ({
    person: await personId(ctx, slug),
    role,
    displayName: null,
  });
  return {
    blockType: "peopleGrid",
    variant: "portrait",
    eyebrow: "Liderazgo inaugural",
    heading: "Junta Fundadora",
    // "Siete" is the number of members written as text; editors update it by hand.
    intro:
      "Siete profesionales asumieron la responsabilidad de convertir una visión compartida en una institución con bases firmes.",
    members: [
      await row("urayoan-jordan-salivia", "Presidente"),
      await row("liz-ortiz-laureano", "Vicepresidenta"),
      await row("deborah-roman-cortes", "Secretaria"),
      await row("jonnathan-garcia-rosado", "Director de Tesorería"),
      await row("rosalie-ayala-colon", "Directora de Relaciones Públicas"),
      await row("alexis-gomez-rivera", "Vocal"),
      await row("jonuel-negron", "Vocal"),
    ],
    labels: {
      portraitAlt: PORTRAIT_ALT,
      open: null,
      openAria: null,
      bioAria: null,
      closeAria: null,
    },
    showBios: false,
    settings: { anchorId },
  };
}

function committeesBlock(anchorId: string | null): BlockInput<"committees"> {
  return {
    blockType: "committees",
    eyebrow: "Comités de trabajo",
    heading: "Donde se hace el trabajo.",
    // "Tres" is the number of committees written as text; editors update it by hand.
    intro:
      "Tres comités estructuran la actividad sustantiva de la Asociación, cada uno con responsabilidades definidas y abierto a la participación de la membresía.",
    selection: "all",
    committees: [],
    labels: {
      navAria: "Comités de trabajo",
      committeeEyebrow: "Comité de trabajo",
      committeeHeading: "Comité de {nombre}",
      coordinator: "Coordinación",
      portraitAlt: PORTRAIT_ALT,
      members: "Integrantes",
      responsibilities: "Responsabilidades",
    },
    settings: { anchorId },
  };
}

/** Seed data owned by the "people" group: Personas, Comités, peopleGrid and committees. */
export const peopleSeed: GroupSeed = {
  collections: async (ctx) => {
    await seedPeople(ctx);
    await seedCommittees(ctx);
  },
  fixtures: {
    "peopleGrid.board": (ctx) => board(ctx, "junta-directiva"),
    "peopleGrid.founders": (ctx) => founders(ctx, null),
    "committees.all": () => committeesBlock("comites"),
  },
  // Same content without anchors, so the guide page never duplicates the real ids.
  // The guide adds the two secondary options: portrait bios turned on, and hand-picked
  // committees (in a different order than the collection).
  guide: async (ctx) => {
    const picked = await ctx.payload.find({
      collection: "committees",
      sort: "-order",
      limit: 2,
      depth: 0,
      overrideAccess: true,
    });
    return [
      await board(ctx, null),
      await founders(ctx, null),
      { ...(await founders(ctx, null)), showBios: true },
      committeesBlock(null),
      { ...committeesBlock(null), selection: "selected", committees: picked.docs.map((d) => d.id) },
    ];
  },
};
