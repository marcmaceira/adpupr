import type { EventBenefitsBlock, EventOverviewBlock } from "@/payload-types";
import type { BlockInput, GroupSeed } from "../context";
import { bold, richText } from "../lexical";

type Period = NonNullable<EventOverviewBlock["agenda"]["periods"]>[number];
type Entry = Omit<NonNullable<Period["entries"]>[number], "id">;

const entry = (start: string, end: string, title: string, description?: string): Entry => ({
  start,
  end,
  title,
  description: description ?? null,
  quiet: false,
});

const quietEntry = (start: string, end: string, title: string, description?: string): Entry => ({
  ...entry(start, end, title, description),
  quiet: true,
});

const MORNING: readonly Entry[] = [
  quietEntry("7:30 a.m.", "8:30 a.m.", "Registro, desayuno y networking"),
  entry(
    "8:30 a.m.",
    "8:55 a.m.",
    "Bienvenida protocolar, saludo y reflexión presidencial",
    "Apertura a cargo de la Dirección de Relaciones Públicas y la Presidencia de ADPUPR.",
  ),
  entry(
    "8:55 a.m.",
    "9:40 a.m.",
    "Conferencia magistral",
    "Presentación de 40 minutos, seguida de 5 minutos de preguntas y comentarios del público.",
  ),
  entry(
    "9:40 a.m.",
    "10:35 a.m.",
    "Panel académico / Investigaciones",
    "Investigaciones de ponentes seleccionados por convocatoria, en un panel moderado.",
  ),
  quietEntry("10:35 a.m.", "10:40 a.m.", "Mensaje de patrocinadores"),
  entry(
    "10:40 a.m.",
    "11:40 a.m.",
    "Gran panel multisectorial",
    "Diálogo entre el Estado, la academia, el sector privado y el tercer sector.",
  ),
  quietEntry("11:40 a.m.", "11:45 a.m.", "Mensaje de patrocinadores"),
  quietEntry(
    "11:45 a.m.",
    "12:40 p.m.",
    "Almuerzo de networking",
    "Receso para almorzar, conectar con participantes y visitar los espacios de exhibición en el vestíbulo.",
  ),
];

const AFTERNOON: readonly Entry[] = [
  entry(
    "12:40 p.m.",
    "1:40 p.m.",
    "Panel presidencial / Practitioners",
    "Diálogo con tres invitados, moderado por la Presidencia.",
  ),
  quietEntry("1:40 p.m.", "1:45 p.m.", "Mensaje de patrocinadores"),
  entry(
    "1:45 p.m.",
    "2:15 p.m.",
    "Reconocimiento a colaboradores",
    "Reconocimiento a colaboradores y mención de acuerdos colaborativos, con la participación del Presidente de ASPA.",
  ),
  entry(
    "2:15 p.m.",
    "3:10 p.m.",
    "Panel II: Casos reales",
    "Estudios de casos, iniciativas sociales, experiencias reales y aprendizajes aplicados.",
  ),
  quietEntry("3:10 p.m.", "3:15 p.m.", "Mensaje de patrocinadores"),
  quietEntry("3:15 p.m.", "3:35 p.m.", "Receso de la tarde", "Merienda y networking."),
  entry(
    "3:35 p.m.",
    "4:00 p.m.",
    "Laboratorio de reacción del público, síntesis y cierre académico",
    "Un espacio de retroalimentación guiada y propuestas de acción para cerrar la jornada académica.",
  ),
  quietEntry(
    "4:00 p.m.",
    "4:15 p.m.",
    "Networking y registro para la asamblea",
    "Validación de membresía activa y registro de participantes.",
  ),
  entry(
    "4:15 p.m.",
    "5:00 p.m.",
    "Asamblea Ordinaria ADPUPR",
    "Encuentro de la Junta de Directores y la membresía. Agenda, propuesta de enmiendas e informe de gestión.",
  ),
];

const eventOverview = (): BlockInput<"eventOverview"> => ({
  blockType: "eventOverview",
  details: [
    { icon: "calendar-days", label: "Fecha", value: "Viernes, 2 de octubre de 2026" },
    { icon: "clock", label: "Horario", value: "7:30 a.m. – 5:00 p.m." },
    {
      icon: "map-pin",
      label: "Lugar",
      value: "Salón Teatro Ing. Salvador V. Caro, sede de Hato Rey del CIAPR",
    },
  ],
  intro: {
    eyebrow: "Una jornada para conectar",
    heading: "Ideas para un mejor servicio público.",
    rows: [
      {
        icon: "users",
        heading: "Asiste para participar en:",
        text: "Una conferencia magistral, paneles académicos, discusiones multisectoriales, networking y experiencias de profesionales de la práctica.",
        emphasis: false,
      },
      {
        icon: "badge-check",
        heading: null,
        text: "Certificación de Convalidación de hasta un máximo de 8.5 horas en educación continua de la Oficina de Ética Gubernamental (OEG)",
        emphasis: true,
      },
    ],
  },
  agenda: {
    heading: "Agenda del día",
    expandLabel: "Ver agenda completa",
    collapseLabel: "Ocultar agenda",
    periods: [
      {
        title: "Mañana",
        summary: "Apertura, investigación y diálogo multisectorial.",
        entries: [...MORNING],
      },
      {
        title: "Tarde",
        summary: "Experiencias, propuestas y encuentro de la membresía.",
        entries: [...AFTERNOON],
      },
    ],
    note: "Programa sujeto a ajustes.",
    registrationLink: {
      label: "Ver tarifas e inscripción",
      type: "custom",
      url: "#inscripcion",
      newTab: false,
    },
  },
});

const eventBenefits = (): BlockInput<"eventBenefits"> => ({
  blockType: "eventBenefits",
  eyebrow: "Tu inscripción incluye",
  heading: "Todo lo que incluye tu experiencia.",
  callout: {
    label: "Educación continua",
    srPrefix: "Hasta",
    value: "8.5 h",
    note: "Hasta 8.5 horas de la Oficina de Ética Gubernamental (OEG).",
  },
  benefits: [
    {
      icon: "presentation",
      title: "Conferencias y paneles",
      detail: "Acceso al programa completo.",
    },
    {
      icon: "file-text",
      title: "Materiales y recursos",
      detail: "Contenido exclusivo para participantes.",
    },
    { icon: "badge-check", title: "Certificado", detail: "Certificado de participación." },
    {
      icon: "utensils",
      title: "Desayuno, almuerzo y meriendas",
      detail: "Incluidos en tu inscripción.",
    },
    { icon: "coffee", title: "Café y agua", detail: "Acceso a estaciones de café y agua." },
    {
      icon: "users",
      title: "Networking",
      detail: "Con profesionales, estudiantes graduados, servidores públicos y organizaciones.",
    },
    {
      icon: "store",
      title: "Exhibiciones y aliados",
      detail: "Acceso a booths, exhibiciones y aliados.",
    },
  ],
  footnote: richText<NonNullable<EventBenefitsBlock["footnote"]>>([
    bold("Asamblea Ordinaria"),
    " · Exclusiva para miembros activos de ADPUPR.",
  ]),
  settings: { anchorId: "beneficios" },
});

const PAYPAL_LABEL = "Pagar con PayPal";
const MEMBERS_BADGE = "Miembros";

const pricingTable = (): BlockInput<"pricingTable"> => ({
  blockType: "pricingTable",
  eyebrow: "Inscripción · Paso 1",
  heading: "Realiza tu pago.",
  intro:
    "Selecciona tu tarifa y realiza el pago con PayPal o ATH Móvil. Conserva tu evidencia de pago, ya que deberás incluirla en el formulario de inscripción.",
  prices: [
    {
      name: "Costo regular",
      price: "$180",
      note: "Para participantes no afiliados.",
      buttonLabel: PAYPAL_LABEL,
      paymentUrl: "https://www.paypal.com/ncp/payment/GCAUMGUNGTMBW",
      featured: false,
      badge: null,
    },
    {
      name: "Costo preferencial",
      price: "$100",
      note: "Para miembros activos de ADPUPR.",
      buttonLabel: PAYPAL_LABEL,
      paymentUrl: "https://www.paypal.com/ncp/payment/362TTQUZLAK7G",
      featured: true,
      badge: MEMBERS_BADGE,
    },
    {
      name: "Preferencial estudiantil",
      price: "$75",
      note: "Para miembros estudiantes activos de ADPUPR.",
      buttonLabel: PAYPAL_LABEL,
      paymentUrl: "https://www.paypal.com/ncp/payment/FAW7NTNWFWQXL",
      featured: true,
      badge: MEMBERS_BADGE,
    },
  ],
  athMovil: {
    title: "Pago con ATH Móvil",
    text: "Al continuar, serás redirigido a ATH Móvil. Escribe manualmente el monto correspondiente a tu tarifa para finalizar la transacción.",
    buttonLabel: "Pagar con ATH Móvil",
  },
  footnote: "Las tarifas preferenciales aplican exclusivamente a miembros activos de ADPUPR.",
  settings: { anchorId: "inscripcion" },
});

const conferenceThemes = (): BlockInput<"numberedGrid"> => ({
  blockType: "numberedGrid",
  eyebrow: "Programa de contenido",
  heading: "Ejes temáticos",
  intro: "Funcionarán como hilos conductores en las actividades preconferencia.",
  numberPrefix: "EJE",
  leadIn: "Enfoque:",
  items: [
    {
      number: "01",
      title: "Gobernanza inteligente y humana",
      description:
        "Responde a uno de los mayores desafíos de la administración pública contemporánea: cómo aprovechar la inteligencia tecnológica sin perder la inteligencia humana. Reconoce que un gobierno moderno no solo debe ser más eficiente y digital, sino también más cercano, ético, participativo y orientado al bienestar de las personas.",
    },
    {
      number: "02",
      title: "Reconstruir la confianza pública",
      description:
        "Reconstruir la confianza pública significa fortalecer la credibilidad y legitimidad de las instituciones mediante una gestión ética, transparente, participativa y responsable, capaz de responder al interés público y generar confianza ciudadana.",
    },
    {
      number: "03",
      title: "Capacidades del Estado y profesionalización",
      description:
        "Un Estado es tan fuerte como las capacidades de sus instituciones y de las personas que las integran. Las mejores leyes, políticas públicas o tecnologías tienen un impacto limitado si el servicio público carece de las competencias, el liderazgo y las estructuras necesarias para implementarlas eficazmente.",
    },
    {
      number: "04",
      title: "Estado, sociedad y colaboración pública",
      description:
        "Nuevas arquitecturas de gobernanza. Este eje promueve la reflexión sobre la colaboración entre el Estado, la academia, el tercer sector, la empresa privada y la ciudadanía como mecanismo para fortalecer la gobernanza democrática y la creación de valor público. Asimismo, aborda temas como la coproducción de valor público, el cooperativismo, la gobernanza municipal y otros modelos de colaboración intersectorial que contribuyan al desarrollo sostenible y al fortalecimiento de las instituciones públicas.",
    },
  ],
});

/** Seed data owned by the "conference" group: eventOverview, eventBenefits, pricingTable, numberedGrid. */
export const conferenceSeed: GroupSeed = {
  fixtures: {
    "eventOverview.conference": eventOverview,
    "eventBenefits.conference": eventBenefits,
    "pricingTable.conference": pricingTable,
    "numberedGrid.conferenceThemes": conferenceThemes,
  },
  // Anchor ids must stay unique on the guide page, so its copies carry none.
  guide: async () => [
    eventOverview(),
    { ...eventBenefits(), settings: {} },
    { ...pricingTable(), settings: {} },
    conferenceThemes(),
  ],
};
