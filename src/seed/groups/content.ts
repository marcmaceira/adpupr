import type {
  FeatureCardsBlock,
  NumberedListBlock,
  RichTextBlock,
  TextSplitBlock,
} from "@/payload-types";
import type { BlockInput, GroupSeed, SeedContext } from "../context";
import { bold, bullets, link, numbered, richText } from "../lexical";

type TextSplitBody = NonNullable<TextSplitBlock["body"]>;
type RichTextBody = NonNullable<RichTextBlock["body"]>;
type FeatureCardItems = NonNullable<FeatureCardsBlock["items"]>;
type NumberedItems = NonNullable<NumberedListBlock["items"]>;

/* ───────────── textSplit ───────────── */

const homeAbout = (ctx: SeedContext): BlockInput<"textSplit"> => ({
  blockType: "textSplit",
  ratio: "wideLeft",
  accent: "rightRule",
  headingSize: "section",
  eyebrow: "Quiénes somos",
  heading: "Una comunidad que convierte conocimiento en acción.",
  body: richText<TextSplitBody>(
    "La ADPUPR reúne a profesionales, académicos y estudiantes para analizar los retos del servicio público, compartir conocimiento y promover soluciones que fortalezcan la administración pública en Puerto Rico.",
  ),
  link: {
    label: "Conoce nuestra trayectoria",
    type: "internal",
    page: ctx.pageId("/nosotros/quienes-somos"),
  },
  settings: { tone: "bg" },
});

const identity = (): BlockInput<"textSplit"> => ({
  blockType: "textSplit",
  ratio: "fixedLeft",
  accent: "goldBar",
  headingSize: "compact",
  eyebrow: "Nuestra identidad",
  heading: "Conocimiento al servicio del interés público.",
  body: richText<TextSplitBody>(
    "Fundada el 8 de agosto de 2023, la Asociación de Administración Pública de Puerto Rico es una organización profesional sin fines de lucro dedicada a fortalecer la gestión pública en nuestro archipiélago. Promovemos la investigación rigurosa y el análisis académico como base para el diseño de políticas públicas éticas, eficientes y eficaces, poniendo este conocimiento al servicio de la toma de decisiones y del interés público.",
    "En la ADPUPR entendemos que la administración de lo público no es únicamente una labor técnica, sino profundamente humana. Implica tomar decisiones que impactan la vida cotidiana de las personas. Por ello, trabajamos en el desarrollo de soluciones informadas para los desafíos contemporáneos, abordando problemáticas complejas desde una perspectiva interdisciplinaria. Actuamos como un puente entre el conocimiento académico, la práctica profesional y la ciudadanía.",
  ),
  settings: { tone: "bg" },
});

const membershipCommunity = (): BlockInput<"textSplit"> => ({
  blockType: "textSplit",
  ratio: "narrowLeft",
  accent: "bottomRule",
  headingSize: "section",
  eyebrow: "Una comunidad que aporta",
  heading: "Crecer y servir, en comunidad.",
  body: richText<TextSplitBody>(
    "Pertenecer a la Asociación de Administración Pública de Puerto Rico (ADPUPR) brinda la oportunidad de integrarse a una red de profesionales, académicos, estudiantes y personas interesadas en fortalecer la administración y el servicio público puertorriqueño. Esta comunidad facilita el intercambio de conocimientos y experiencias entre personas que se desempeñan en el gobierno, la academia, organizaciones comunitarias y otros sectores relacionados con la gestión pública.",
    "Nuestra membresía también promueve el desarrollo profesional mediante talleres, conferencias, conversatorios, publicaciones y otras actividades educativas sobre temas pertinentes para la administración pública puertorriqueña. Asimismo, sus miembros pueden beneficiarse de tarifas preferenciales en determinadas actividades, mantenerse informados sobre iniciativas de la Asociación y ampliar su red de contactos profesionales.",
    "Además, la ADPUPR ofrece espacios para participar en comités de trabajo, asambleas y proyectos institucionales, permitiendo que sus integrantes aporten sus conocimientos, desarrollen destrezas de liderazgo y colaboren en el análisis de los asuntos públicos. Ser parte de la Asociación no solo representa una oportunidad de crecimiento profesional, sino también una forma de contribuir al desarrollo de una administración pública más ética, eficiente, transparente y comprometida con las necesidades de Puerto Rico.",
  ),
  settings: { tone: "surface" },
});

/* ───────────── featureCards ───────────── */

const homeEngagement = (ctx: SeedContext): BlockInput<"featureCards"> => ({
  blockType: "featureCards",
  variant: "separate",
  eyebrow: "Participa",
  heading: "Hay más de una forma de aportar.",
  items: [
    {
      tone: "light",
      icon: "file-pen-line",
      eyebrow: "Comparte tus ideas",
      title: "Convocatoria V Boletín Informativo",
      text: "Somete tu artículo de opinión y aporta nuevas perspectivas a la conversación sobre administración pública.",
      link: {
        label: "Someter un artículo",
        type: "internal",
        page: ctx.pageId("/recursos"),
        anchor: "convocatoria-boletin",
      },
    },
    {
      tone: "dark",
      icon: "heart-handshake",
      eyebrow: "Apoya a la ADPUPR",
      title: "Tu donativo fortalece nuestra labor",
      text: "Con tu apoyo impulsamos iniciativas, publicaciones y espacios de desarrollo profesional que fortalecen la administración pública en Puerto Rico.",
      link: { label: "Quiero donar", type: "internal", page: ctx.pageId("/contactanos") },
    },
  ] satisfies FeatureCardItems,
  settings: { tone: "bg" },
});

const missionVision = (): BlockInput<"featureCards"> => ({
  blockType: "featureCards",
  variant: "joined",
  items: [
    {
      tone: "light",
      eyebrow: "Misión",
      title: "Fortalecer la sana administración pública.",
      text: "La misión de la Asociación de Administración Pública de Puerto Rico (ADPUPR) es promover y fortalecer la sana administración pública en Puerto Rico. Nos comprometemos a impulsar la educación, la investigación, la innovación y la participación en la toma de decisiones públicas.",
    },
    {
      tone: "dark",
      eyebrow: "Visión",
      title: "Ser referente de una gestión eficaz y ética.",
      text: "Nuestra visión es ser un referente líder en la promoción de una administración pública eficaz y ética en Puerto Rico. Aspiramos a ser un catalizador de cambios positivos en la toma de decisiones y políticas públicas, contribuyendo al desarrollo sostenible, la equidad y la transparencia en nuestro entorno. Vemos un futuro en el que nuestra asociación sea reconocida por su compromiso con la excelencia en la administración pública y su impacto en la sociedad puertorriqueña.",
    },
  ] satisfies FeatureCardItems,
  settings: { tone: "surface2" },
});

/* ───────────── numberedList ───────────── */

const objectives = (): BlockInput<"numberedList"> => ({
  blockType: "numberedList",
  variant: "stacked",
  eyebrow: "Objetivos",
  heading: "Cinco compromisos que orientan nuestro trabajo.",
  items: [
    {
      text: "Agrupar en una organización a los interesados en promover los valores de una sana Administración Pública en Puerto Rico.",
    },
    {
      text: "Promover la educación, difusión de conocimiento y el estudio de la Administración Pública ofreciendo, coordinando o auspiciando cursos, foros, conferencias, conversatorios, seminarios, intercambio de ideas y otras actividades relacionadas.",
    },
    { text: "Establecer redes y conexiones de comunicación entre los integrantes." },
    {
      text: "Tener una participación colectiva activa en los asuntos públicos y gobernanza de Puerto Rico.",
    },
    { text: "Cualquier otro objetivo establecido por la Asamblea de Integrantes." },
  ] satisfies NumberedItems,
});

const foundingWork = (): BlockInput<"numberedList"> => ({
  blockType: "numberedList",
  variant: "sidebar",
  eyebrow: "2023–2025",
  heading: "La gestión fundadora",
  items: [
    {
      text: "Constituyó y organizó la ADPUPR, estableciendo su estructura de gobernanza, reglamentación y procesos institucionales.",
    },
    {
      text: "Celebró las primeras conferencias anuales de la Asociación, sentando las bases del principal espacio de encuentro académico y profesional de la ADPUPR.",
    },
    {
      text: "Impulsó la presencia institucional de la Asociación, mediante el desarrollo de la página web oficial y el lanzamiento del boletín informativo.",
    },
    {
      text: "Fortaleció la sostenibilidad administrativa y financiera, gestionando el cumplimiento de los requisitos legales, las membresías y las obligaciones institucionales.",
    },
    {
      text: "Promovió el crecimiento organizacional, impulsando nuevos comités de trabajo, publicaciones académicas y proyectos para asegurar la continuidad de la Asociación.",
    },
  ] satisfies NumberedItems,
});

/* ───────────── videoFeature ───────────── */

const homeVideo = (): BlockInput<"videoFeature"> => ({
  blockType: "videoFeature",
  eyebrow: "Desde nuestro canal",
  heading: "Conversaciones sobre el servicio público.",
  intro:
    "Mira el video más reciente de la ADPUPR y visita nuestro canal para conocer más diálogos, entrevistas y actividades.",
  channelLink: {
    label: "Visitar canal de YouTube",
    type: "custom",
    url: "https://www.youtube.com/@ADPUPR",
    newTab: true,
  },
  youtubeId: "jhXQO0PB0PY",
  videoTitle: "Video más reciente de la ADPUPR en YouTube",
});

/* ───────────── iconColumns ───────────── */

const library = (): BlockInput<"iconColumns"> => ({
  blockType: "iconColumns",
  eyebrow: "Archivo histórico",
  heading: "Biblioteca de conferencias.",
  intro:
    "Un espacio para preservar y consultar las ideas compartidas en las conferencias de la ADPUPR a través de los años.",
  columns: [
    {
      icon: "file-chart-column",
      title: "Presentaciones",
      text: "Diapositivas y materiales presentados por conferenciantes y panelistas.",
      status: "Archivo en preparación",
    },
    {
      icon: "book-open",
      title: "Artículos de conferencias",
      text: "Ponencias, investigaciones y textos vinculados a conferencias anteriores.",
      status: "Archivo en preparación",
    },
  ],
  note: {
    icon: "library",
    text: "La biblioteca crecerá a medida que se digitalicen los documentos históricos.",
  },
  settings: { anchorId: "biblioteca" },
});

/* ───────────── richTextBlock (guide only) ───────────── */

const richTextExample = (tone: "bg" | "surface"): BlockInput<"richTextBlock"> => ({
  blockType: "richTextBlock",
  eyebrow: "Texto libre",
  heading:
    tone === "bg"
      ? "Una sección de texto para páginas nuevas."
      : "La misma sección sobre fondo blanco.",
  body: richText<RichTextBody>(
    [
      "Este bloque admite párrafos, ",
      bold("texto en negrita"),
      " y ",
      link("enlaces", "/contactanos"),
      ". Mantiene el ancho de lectura y el espaciado de las demás secciones.",
    ],
    bullets(["Listas con viñetas", "para enumerar ideas breves"]),
    numbered(["Listas numeradas", "para pasos en orden"]),
    "Elige un fondo gris claro o blanco para alternarlo con las secciones vecinas.",
  ),
  settings: { tone },
});

/** Seed data owned by the "content" group: textSplit, featureCards, numberedList, videoFeature, iconColumns, richTextBlock. */
export const contentSeed: GroupSeed = {
  fixtures: {
    "textSplit.homeAbout": (ctx) => ({
      ...homeAbout(ctx),
      settings: { tone: "bg", anchorId: "nosotros" },
    }),
    "textSplit.identity": identity,
    "textSplit.membershipCommunity": membershipCommunity,
    "featureCards.homeEngagement": homeEngagement,
    "featureCards.missionVision": missionVision,
    "numberedList.objectives": objectives,
    "numberedList.foundingWork": foundingWork,
    "videoFeature.home": homeVideo,
    "iconColumns.library": library,
  },
  guide: async (ctx) => [
    homeAbout(ctx),
    identity(),
    membershipCommunity(),
    { ...membershipCommunity(), accent: "none", settings: { tone: "bg" } },
    homeEngagement(ctx),
    missionVision(),
    objectives(),
    foundingWork(),
    homeVideo(),
    // Guide instances carry no anchors, so the guide never duplicates a page id.
    { ...library(), settings: {} },
    richTextExample("bg"),
    richTextExample("surface"),
  ],
};
