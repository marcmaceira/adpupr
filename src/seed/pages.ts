/**
 * Page composition: which block instances (fixture keys) make up each route, in order,
 * plus per-page SEO and sitemap settings. Fixture keys are "<blockSlug>.<name>"; each
 * key is provided by exactly one group in src/seed/groups/.
 */

export interface PageSpec {
  readonly path: string;
  readonly title: string;
  readonly layout: readonly string[];
  readonly meta?: {
    readonly title?: string;
    readonly description?: string;
    readonly ogDescription?: string;
  };
  readonly sitemap: {
    readonly include: boolean;
    readonly priority?: "1" | "0.8" | "0.7";
    readonly changeFrequency?: "weekly" | "monthly" | "yearly";
  };
  readonly noindex?: boolean;
}

export const GUIDE_PATH = "/guia-de-componentes";

export const PAGES: readonly PageSpec[] = [
  {
    path: "/",
    title: "Inicio",
    layout: [
      "hero.home",
      "stats.home",
      "textSplit.homeAbout",
      "ctaBand.homeConference",
      "videoFeature.home",
      "featureCards.homeEngagement",
      "ctaBand.homeMembership",
    ],
    sitemap: { include: true, priority: "1", changeFrequency: "monthly" },
  },
  {
    path: "/conferencia",
    title: "Conferencia 2026",
    layout: [
      "hero.conference",
      "eventOverview.conference",
      "eventBenefits.conference",
      "pricingTable.conference",
      "ctaBand.conferenceRegistration",
      "numberedGrid.conferenceThemes",
    ],
    meta: {
      title: "Conferencia 2026",
      description:
        "Conoce los detalles e inscríbete en la 3ra Conferencia Anual de Administración Pública de la ADPUPR, el 2 de octubre de 2026.",
      ogDescription: "Estado, sociedad y colaboración pública: nuevas arquitecturas de gobernanza.",
    },
    // The current sitemap leaves /conferencia out; kept as a per-page setting.
    sitemap: { include: false, priority: "0.7", changeFrequency: "monthly" },
  },
  {
    path: "/contactanos",
    title: "Contáctanos",
    layout: ["hero.contact", "contactSection.contact"],
    meta: {
      title: "Contáctanos",
      description:
        "Conversa con la ADPUPR para colaborar, establecer alianzas, participar en eventos o conocer más sobre nuestro trabajo.",
      ogDescription:
        "Escríbenos y conoce los canales oficiales de la Asociación de Administración Pública de Puerto Rico.",
    },
    sitemap: { include: true, priority: "0.7", changeFrequency: "yearly" },
  },
  {
    path: "/membresia",
    title: "Membresía",
    layout: ["hero.membership", "membershipEnrollment.membership", "textSplit.membershipCommunity"],
    meta: {
      title: "Membresía",
      description:
        "Conoce las tarifas, completa el formulario y selecciona tu método de pago para solicitar membresía en la ADPUPR.",
      ogDescription:
        "Tarifas, formulario y métodos de pago para integrantes regulares y estudiantes de la ADPUPR.",
    },
    sitemap: { include: true, priority: "0.7", changeFrequency: "monthly" },
  },
  {
    path: "/recursos",
    title: "Recursos",
    layout: [
      "hero.resources",
      "resourceLibrary.publications",
      "ctaBand.resourcesCall",
      "iconColumns.library",
    ],
    meta: {
      title: "Recursos",
      description:
        "Consulta boletines, artículos de opinión, comunicados, convocatorias y el archivo histórico de la ADPUPR.",
      ogDescription:
        "Publicaciones y archivo histórico sobre administración pública en Puerto Rico.",
    },
    sitemap: { include: true, priority: "0.8", changeFrequency: "weekly" },
  },
  {
    path: "/nosotros/quienes-somos",
    title: "Quiénes somos",
    layout: [
      "hero.whoWeAre",
      "textSplit.identity",
      "featureCards.missionVision",
      "numberedList.objectives",
    ],
    meta: {
      title: "Quiénes somos",
      description:
        "Conoce la historia, misión, visión y objetivos de la Asociación de Administración Pública de Puerto Rico.",
    },
    sitemap: { include: true, priority: "0.8", changeFrequency: "monthly" },
  },
  {
    path: "/nosotros/estructura-organizacional",
    title: "Estructura organizacional",
    layout: ["hero.structure", "peopleGrid.board", "committees.all"],
    meta: {
      title: "Estructura organizacional",
      description:
        "Conoce la Junta Directiva y la estructura de comités de la Asociación de Administración Pública de Puerto Rico.",
    },
    sitemap: { include: true, priority: "0.8", changeFrequency: "monthly" },
  },
  {
    path: "/nosotros/historia-fundacion",
    title: "Historia de Fundación",
    layout: [
      "hero.history",
      "peopleGrid.founders",
      "stats.milestones",
      "numberedList.foundingWork",
    ],
    meta: {
      title: "Historia de Fundación",
      description:
        "Conoce la gestión, la Junta Fundadora y los principales hitos que dieron origen a la Asociación de Administración Pública de Puerto Rico.",
    },
    sitemap: { include: true, priority: "0.7", changeFrequency: "yearly" },
  },
  {
    path: GUIDE_PATH,
    title: "Guía de componentes",
    // Filled from every group's `guide` list.
    layout: [],
    meta: {
      title: "Guía de componentes",
      description: "Todas las secciones disponibles en el sitio, en todas sus variantes.",
    },
    sitemap: { include: false },
    noindex: true,
  },
];
