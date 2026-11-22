import type { BlockInput, BlockInputAny, GroupSeed, SeedContext } from "../context";

type HeroInput = BlockInput<"hero">;
type CtaBandInput = BlockInput<"ctaBand">;
type StatsInput = BlockInput<"stats">;

const REGISTRATION_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd3Nc0d9srM9AgoSQal0RWS__ARj53TacAYnNQ24VxXYYAbHA/viewform";

/* ───────────── hero ───────────── */

const homeHero = (ctx: SeedContext): HeroInput => ({
  blockType: "hero",
  variant: "home",
  eyebrow: "Asociación de Administración Pública de Puerto Rico",
  heading: "De la opinión\na la acción.",
  headingHighlight: "acción",
  lede: "ADPUPR convoca a profesionales, académicos y estudiantes en torno al estudio, la práctica y la mejora continua de la administración pública en Puerto Rico.",
  actions: [
    {
      style: "primary",
      link: { label: "Hacerme miembro", type: "internal", page: ctx.pageId("/membresia") },
    },
    {
      style: "secondary",
      link: {
        label: "Conocer la Asociación",
        type: "internal",
        page: ctx.pageId("/nosotros/quienes-somos"),
      },
    },
  ],
  sectionLinks: [],
  settings: { anchorId: "inicio" },
});

const conferenceHero = (): HeroInput => ({
  blockType: "hero",
  variant: "event",
  eyebrow: "Conferencia 2026",
  heading: "3ra Conferencia Anual de Administración Pública",
  themeBox: {
    label: "Tema central",
    text: "Estado, sociedad y colaboración pública: nuevas arquitecturas de gobernanza",
  },
  eventDate: {
    day: "02",
    monthYear: "Octubre\n2026",
    caption: "Viernes · Hato Rey, Puerto Rico",
  },
  actions: [],
  sectionLinks: [],
});

const contactHero = (): HeroInput => ({
  blockType: "hero",
  variant: "subhead",
  eyebrow: "Contacto",
  heading: "Las mejores iniciativas nacen de la colaboración.",
  lede: "Cada conversación puede abrir una nueva manera de aportar a una administración pública más efectiva, ética e innovadora.",
  actions: [],
  sectionLinks: [],
});

const membershipHero = (): HeroInput => ({
  blockType: "hero",
  variant: "subhead",
  eyebrow: "Únete a la Asociación",
  heading: "De la opinión a la acción.",
  lede: "Ser miembro de ADPUPR te conecta con personas comprometidas con una administración pública ética, moderna y basada en datos.",
  actions: [],
  sectionLinks: [],
});

const resourcesHero = (): HeroInput => ({
  blockType: "hero",
  variant: "resources",
  eyebrow: "Centro de recursos",
  heading: "Conocimiento para el servicio público.",
  lede: "Explora publicaciones, convocatorias y materiales que documentan la conversación sobre la administración pública en Puerto Rico.",
  navLabel: "Secciones de recursos",
  actions: [],
  sectionLinks: [
    { link: { label: "Publicaciones", type: "custom", url: "#publicaciones" } },
    { link: { label: "Convocatoria", type: "custom", url: "#convocatoria-boletin" } },
    { link: { label: "Biblioteca", type: "custom", url: "#biblioteca" } },
  ],
});

const whoWeAreHero = (): HeroInput => ({
  blockType: "hero",
  variant: "brief",
  eyebrow: "Quiénes somos",
  heading: "La administración pública es profundamente humana.",
  actions: [],
  sectionLinks: [],
});

const structureHero = (): HeroInput => ({
  blockType: "hero",
  variant: "structure",
  eyebrow: "Nosotros",
  heading: "Estructura organizacional",
  lede: "Conozca a quienes integran la Junta Directiva y cómo se organiza el trabajo institucional de la ADPUPR.",
  navLabel: "Contenido de la página",
  // Same-page anchors stay relative ("#comites") so the hrefs match the current site.
  actions: [
    {
      style: "primary",
      link: { label: "Ver Junta Directiva", type: "custom", url: "#junta-directiva" },
    },
    { style: "secondary", link: { label: "Ver comités", type: "custom", url: "#comites" } },
  ],
  sectionLinks: [],
});

const historyHero = (): HeroInput => ({
  blockType: "hero",
  variant: "history",
  eyebrow: "Nuestra historia",
  heading: "Historia de Fundación",
  lede: "Durante el período 2023–2025, la Junta Fundadora estableció las bases institucionales que dieron origen y proyección a la Asociación de Administración Pública de Puerto Rico.",
  actions: [],
  sectionLinks: [],
});

/* ───────────── ctaBand ───────────── */

const homeConferenceBand = (ctx: SeedContext): CtaBandInput => ({
  blockType: "ctaBand",
  variant: "primary",
  eyebrow: "Conferencia 2026",
  heading: "Inscríbete a la Conferencia de Administración Pública 2026.",
  headingHighlight: "2026",
  body: "Un encuentro de ponencias, paneles y networking en torno a la administración pública en Puerto Rico.",
  meta: [
    { icon: "calendar", text: "Octubre 2026" },
    { icon: "map-pin", text: "San Juan, Puerto Rico" },
    { text: "Presencial" },
  ],
  primaryAction: { label: "Inscríbete ahora", type: "internal", page: ctx.pageId("/conferencia") },
  secondaryAction: { label: "Ver detalles", type: "internal", page: ctx.pageId("/conferencia") },
  settings: { anchorId: "conferencia" },
});

const homeMembershipBand = (ctx: SeedContext): CtaBandInput => ({
  blockType: "ctaBand",
  variant: "mustard",
  heading: "Únete a la conversación que da forma al servicio público en Puerto Rico.",
  body: "$50 integrantes regulares · $25 estudiantes. Voz y voto en Asambleas y acceso a foros, talleres y conferencias.",
  meta: [],
  primaryAction: {
    label: "Solicitar membresía",
    type: "internal",
    page: ctx.pageId("/membresia"),
  },
});

const resourcesCallBand = (): CtaBandInput => ({
  blockType: "ctaBand",
  variant: "mustardIcon",
  icon: "send",
  eyebrow: "Convocatoria abierta",
  heading: "Comparte tu propuesta para el V Boletín Informativo.",
  body: "Somete tu artículo de opinión y aporta nuevas perspectivas a la conversación sobre administración pública.",
  meta: [],
  primaryAction: {
    label: "Someter propuesta",
    type: "custom",
    url: "mailto:info@adpupr.com?subject=Propuesta%20para%20el%20V%20Bolet%C3%ADn%20Informativo",
  },
  settings: { anchorId: "convocatoria-boletin" },
});

const conferenceRegistrationBand = (): CtaBandInput => ({
  blockType: "ctaBand",
  variant: "navy",
  eyebrow: "Inscripción · Paso 2",
  heading: "Completa tu registro.",
  body: "Una vez realizado el pago, completa el Formulario de Inscripción e incluye tu evidencia de pago.",
  meta: [],
  primaryAction: {
    label: "Completar formulario de inscripción",
    type: "custom",
    url: REGISTRATION_FORM_URL,
    newTab: true,
  },
});

/* ───────────── stats ───────────── */

const homeStats = (): StatsInput => ({
  blockType: "stats",
  variant: "band",
  items: [
    { value: "50", suffix: "+", label: "Miembros activos" },
    { value: "3", label: "Comités de trabajo" },
  ],
});

const milestoneStats = (): StatsInput => ({
  blockType: "stats",
  variant: "tiles",
  eyebrow: "Legado institucional",
  heading: "Hitos de la Gestión Fundadora",
  items: [
    { value: "2023", label: "Año de fundación" },
    { value: "2", label: "Conferencias organizadas" },
    { value: "1", label: "Boletín institucional creado" },
    { value: "7", label: "Miembros de la Junta Fundadora" },
  ],
});

/** Guide copies drop anchor ids so they never collide with other groups' sections. */
const withoutAnchor = <T extends BlockInputAny>(block: T): T => ({
  ...block,
  settings: { anchorId: null },
});

/** Seed data owned by the "bands" group: hero, ctaBand, stats. */
export const bandsSeed: GroupSeed = {
  fixtures: {
    "hero.home": homeHero,
    "hero.conference": conferenceHero,
    "hero.contact": contactHero,
    "hero.membership": membershipHero,
    "hero.resources": resourcesHero,
    "hero.whoWeAre": whoWeAreHero,
    "hero.structure": structureHero,
    "hero.history": historyHero,
    "ctaBand.homeConference": homeConferenceBand,
    "ctaBand.homeMembership": homeMembershipBand,
    "ctaBand.resourcesCall": resourcesCallBand,
    "ctaBand.conferenceRegistration": conferenceRegistrationBand,
    "stats.home": homeStats,
    "stats.milestones": milestoneStats,
  },
  // One instance of every variant: hero ×7, ctaBand ×4, stats ×2.
  guide: async (ctx) =>
    [
      homeHero(ctx),
      contactHero(),
      conferenceHero(),
      resourcesHero(),
      structureHero(),
      historyHero(),
      whoWeAreHero(),
      homeStats(),
      milestoneStats(),
      homeConferenceBand(ctx),
      homeMembershipBand(ctx),
      resourcesCallBand(),
      conferenceRegistrationBand(),
    ].map(withoutAnchor),
};
