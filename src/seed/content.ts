// Snapshot of the original eight pages (HEAD 855abe9). Used only by the idempotent seed.
import type { RequiredDataFromCollectionSlug, DataFromGlobalSlug } from "payload";

export const SEED_PAGES = [
  {
    slug: "inicio",
    title: "ADPUPR \u2014 Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico",
    layout: [
      {
        blockType: "homeHero",
        anchor: "inicio",
        eyebrow: "Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico",
        heading: "De la opini\u00f3n\na la acci\u00f3n.",
        highlight: "acci\u00f3n",
        description:
          "ADPUPR convoca a profesionales, acad\u00e9micos y estudiantes en torno al estudio, la pr\u00e1ctica y la mejora continua de la administraci\u00f3n p\u00fablica en Puerto Rico.",
        buttons: [
          {
            label: "Hacerme miembro",
            url: "/membresia",
            style: "primary",
          },
          {
            label: "Conocer la Asociaci\u00f3n",
            url: "/nosotros/quienes-somos",
            style: "secondary",
          },
        ],
      },
      {
        blockType: "stats",
        variant: "band",
        items: [
          {
            value: "50",
            suffix: "+",
            label: "Miembros activos",
          },
          {
            value: "3",
            label: "Comit\u00e9s de trabajo",
          },
        ],
      },
      {
        blockType: "splitContent",
        anchor: "nosotros",
        background: "bg",
        style: "border",
        eyebrow: "Qui\u00e9nes somos",
        heading: "Una comunidad que convierte conocimiento en acci\u00f3n.",
        body: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "La ADPUPR re\u00fane a profesionales, acad\u00e9micos y estudiantes para analizar los retos del servicio p\u00fablico, compartir conocimiento y promover soluciones que fortalezcan la administraci\u00f3n p\u00fablica en Puerto Rico.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
        link: {
          label: "Conoce nuestra trayectoria",
          url: "/nosotros/quienes-somos",
        },
      },
      {
        blockType: "ctaBand",
        anchor: "conferencia",
        style: "navy",
        eyebrow: "Conferencia 2026",
        heading: "Inscr\u00edbete a la Conferencia de Administraci\u00f3n P\u00fablica 2026.",
        highlight: "2026",
        description:
          "Un encuentro de ponencias, paneles y networking en torno a la administraci\u00f3n p\u00fablica en Puerto Rico.",
        meta: {
          date: "Octubre 2026",
          location: "San Juan, Puerto Rico",
          format: "Presencial",
        },
        buttons: [
          {
            label: "Inscr\u00edbete ahora",
            url: "/conferencia",
            style: "primary",
          },
          {
            label: "Ver detalles",
            url: "/conferencia",
            style: "secondary",
          },
        ],
      },
      {
        blockType: "video",
        eyebrow: "Desde nuestro canal",
        heading: "Conversaciones sobre el servicio p\u00fablico.",
        description:
          "Mira el video m\u00e1s reciente de la ADPUPR y visita nuestro canal para conocer m\u00e1s di\u00e1logos, entrevistas y actividades.",
        videoUrl: "https://www.youtube.com/watch?v=jhXQO0PB0PY",
        channel: {
          label: "Visitar canal de YouTube",
          url: "https://www.youtube.com/@ADPUPR",
        },
      },
      {
        blockType: "cardGrid",
        background: "bg",
        style: "cards",
        eyebrow: "Participa",
        heading: "Hay m\u00e1s de una forma de aportar.",
        cards: [
          {
            eyebrow: "Comparte tus ideas",
            title: "Convocatoria V Bolet\u00edn Informativo",
            description:
              "Somete tu art\u00edculo de opini\u00f3n y aporta nuevas perspectivas a la conversaci\u00f3n sobre administraci\u00f3n p\u00fablica.",
            icon: "file-pen",
            link: {
              label: "Someter un art\u00edculo",
              url: "/recursos#convocatoria-boletin",
            },
            dark: false,
          },
          {
            eyebrow: "Apoya a la ADPUPR",
            title: "Tu donativo fortalece nuestra labor",
            description:
              "Con tu apoyo impulsamos iniciativas, publicaciones y espacios de desarrollo profesional que fortalecen la administraci\u00f3n p\u00fablica en Puerto Rico.",
            icon: "heart-handshake",
            link: {
              label: "Quiero donar",
              url: "/contactanos",
            },
            dark: true,
          },
        ],
      },
      {
        blockType: "ctaBand",
        style: "mustard",
        heading:
          "\u00danete a la conversaci\u00f3n que da forma al servicio p\u00fablico en Puerto Rico.",
        description:
          "$50 integrantes regulares \u00b7 $25 estudiantes. Voz y voto en Asambleas y acceso a foros, talleres y conferencias.",
        buttons: [
          {
            label: "Solicitar membres\u00eda",
            url: "/membresia",
            style: "primary",
          },
        ],
      },
    ],
    meta: {
      title: "ADPUPR \u2014 Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico",
      description:
        "Promovemos la sana administraci\u00f3n p\u00fablica, la educaci\u00f3n c\u00edvica y la investigaci\u00f3n aplicada al servicio p\u00fablico en Puerto Rico.",
    },
    _status: "published",
  },
  {
    slug: "nosotros/quienes-somos",
    title: "Qui\u00e9nes somos",
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "Qui\u00e9nes somos",
        title: "La administraci\u00f3n p\u00fablica es profundamente humana.",
        titleSize: "medium",
      },
      {
        blockType: "splitContent",
        background: "bg",
        style: "bar",
        eyebrow: "Nuestra identidad",
        heading: "Conocimiento al servicio del inter\u00e9s p\u00fablico.",
        body: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Fundada el 8 de agosto de 2023, la Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico es una organizaci\u00f3n profesional sin fines de lucro dedicada a fortalecer la gesti\u00f3n p\u00fablica en nuestro archipi\u00e9lago. Promovemos la investigaci\u00f3n rigurosa y el an\u00e1lisis acad\u00e9mico como base para el dise\u00f1o de pol\u00edticas p\u00fablicas \u00e9ticas, eficientes y eficaces, poniendo este conocimiento al servicio de la toma de decisiones y del inter\u00e9s p\u00fablico.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "En la ADPUPR entendemos que la administraci\u00f3n de lo p\u00fablico no es \u00fanicamente una labor t\u00e9cnica, sino profundamente humana. Implica tomar decisiones que impactan la vida cotidiana de las personas. Por ello, trabajamos en el desarrollo de soluciones informadas para los desaf\u00edos contempor\u00e1neos, abordando problem\u00e1ticas complejas desde una perspectiva interdisciplinaria. Actuamos como un puente entre el conocimiento acad\u00e9mico, la pr\u00e1ctica profesional y la ciudadan\u00eda.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
      },
      {
        blockType: "featurePair",
        items: [
          {
            eyebrow: "Misi\u00f3n",
            heading: "Fortalecer la sana administraci\u00f3n p\u00fablica.",
            text: "La misi\u00f3n de la Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico (ADPUPR) es promover y fortalecer la sana administraci\u00f3n p\u00fablica en Puerto Rico. Nos comprometemos a impulsar la educaci\u00f3n, la investigaci\u00f3n, la innovaci\u00f3n y la participaci\u00f3n en la toma de decisiones p\u00fablicas.",
          },
          {
            eyebrow: "Visi\u00f3n",
            heading: "Ser referente de una gesti\u00f3n eficaz y \u00e9tica.",
            text: "Nuestra visi\u00f3n es ser un referente l\u00edder en la promoci\u00f3n de una administraci\u00f3n p\u00fablica eficaz y \u00e9tica en Puerto Rico. Aspiramos a ser un catalizador de cambios positivos en la toma de decisiones y pol\u00edticas p\u00fablicas, contribuyendo al desarrollo sostenible, la equidad y la transparencia en nuestro entorno. Vemos un futuro en el que nuestra asociaci\u00f3n sea reconocida por su compromiso con la excelencia en la administraci\u00f3n p\u00fablica y su impacto en la sociedad puertorrique\u00f1a.",
          },
        ],
      },
      {
        blockType: "numberedList",
        background: "bg",
        layout: "stacked",
        eyebrow: "Objetivos",
        heading: "Cinco compromisos que orientan nuestro trabajo.",
        items: [
          {
            text: "Agrupar en una organizaci\u00f3n a los interesados en promover los valores de una sana Administraci\u00f3n P\u00fablica en Puerto Rico.",
          },
          {
            text: "Promover la educaci\u00f3n, difusi\u00f3n de conocimiento y el estudio de la Administraci\u00f3n P\u00fablica ofreciendo, coordinando o auspiciando cursos, foros, conferencias, conversatorios, seminarios, intercambio de ideas y otras actividades relacionadas.",
          },
          {
            text: "Establecer redes y conexiones de comunicaci\u00f3n entre los integrantes.",
          },
          {
            text: "Tener una participaci\u00f3n colectiva activa en los asuntos p\u00fablicos y gobernanza de Puerto Rico.",
          },
          {
            text: "Cualquier otro objetivo establecido por la Asamblea de Integrantes.",
          },
        ],
      },
    ],
    meta: {
      title: "Qui\u00e9nes somos",
      description:
        "Conoce la misi\u00f3n, visi\u00f3n y objetivos de la Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico.",
    },
    _status: "published",
  },
  {
    slug: "nosotros/estructura-organizacional",
    title: "Estructura organizacional",
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "Nosotros",
        title: "Estructura organizacional",
        titleSize: "large",
        description:
          "Conozca a quienes integran la Junta Directiva y c\u00f3mo se organiza el trabajo institucional de la ADPUPR.",
        buttons: [
          {
            label: "Ver Junta Directiva",
            url: "#junta-directiva",
            style: "primary",
          },
          {
            label: "Ver comit\u00e9s",
            url: "#comites",
            style: "secondary",
          },
        ],
      },
      {
        blockType: "peopleGrid",
        anchor: "junta-directiva",
        background: "bg",
        display: "bios",
        eyebrow: "Liderazgo institucional",
        heading: "Junta Directiva",
        description:
          "Profesionales comprometidos con fortalecer la administraci\u00f3n p\u00fablica de Puerto Rico.",
        people: [
          {
            name: "Jonnathan Garc\u00eda Rosado, MPA",
            role: "Presidente",
            bio: 'Servidor p\u00fablico en el Departamento de Educaci\u00f3n. Egresado de la Escuela Graduada de Administraci\u00f3n P\u00fablica "Roberto S\u00e1nchez Vilella" (UPR). Cursa estudios doctorales con investigaci\u00f3n sobre pobreza energ\u00e9tica e inversi\u00f3n extranjera.',
            photo: {
              id: 0,
              alt: "Retrato de Jonnathan Garc\u00eda Rosado, MPA",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/jonnathan-garcia-c62e3a40-d4b6-47cd-982c-abc816eb1059.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Luis A. Matos Gonz\u00e1lez, Ph.D.",
            role: "Vicepresidente",
            bio: "Catedr\u00e1tico Auxiliar en Ciencias Sociales (UPR Cayey). Doctorado en Gobierno y Pol\u00edticas P\u00fablicas (Universidad de Costa Rica). Especializaci\u00f3n en pol\u00edticas p\u00fablicas, gobernanza, innovaci\u00f3n y transparencia gubernamental.",
            photo: {
              id: 0,
              alt: "Retrato de Luis A. Matos Gonz\u00e1lez, Ph.D.",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/luis-matos-2b67915d-b6cc-4b95-ad2e-b5c465a42ea9.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Mariluz Serrano-Ortiz, Ed.D.",
            role: "Secretaria Ejecutiva",
            bio: "Educadora, investigadora y conferenciante internacional. Catedr\u00e1tica Auxiliar en la Facultad de Administraci\u00f3n de Empresas de la UPR. Creadora del modelo TIHA (Tecnolog\u00edas para la Inspiraci\u00f3n y la Humanizaci\u00f3n del Aprendizaje).",
            photo: {
              id: 0,
              alt: "Retrato de Mariluz Serrano-Ortiz, Ed.D.",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/mariluz-serrano-82cca165-f382-4b59-9021-6722ec453d73.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Juan David Alicea Otero",
            role: "Director de Tesorer\u00eda",
            bio: "Bachillerato en Ciencias Sociales con concentraci\u00f3n en Relaciones Laborales y Ciencia Pol\u00edtica. Cursa Maestr\u00eda en Administraci\u00f3n P\u00fablica (UPR R\u00edo Piedras) con especialidad en Gobierno y Pol\u00edtica P\u00fablica.",
            photo: {
              id: 0,
              alt: "Retrato de Juan David Alicea Otero",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/juan-david-d39b7bbc-dda3-4527-8f5d-d6400cd0e663.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Victoria Ram\u00edrez Lamprea, MPA",
            role: "Directora de Relaciones P\u00fablicas",
            bio: 'Estudiante de Juris Doctor en la Escuela de Derecho (UPR) y Presidenta de la Clase 2029. Egresada de la Escuela Graduada de Administraci\u00f3n P\u00fablica "Roberto S\u00e1nchez Vilella" (UPR). Formaci\u00f3n y experiencia en Administraci\u00f3n P\u00fablica y Estudios Internacionales con visi\u00f3n innovadora y global.',
            photo: {
              id: 0,
              alt: "Retrato de Victoria Ram\u00edrez Lamprea, MPA",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/victoria-ramirez-cee9d93e-160d-46ad-b8e0-baf225f2b9e8.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Janiel de Jes\u00fas Santiago",
            role: "Vocal de la Junta de Directores",
            bio: "Cursa estudios en la Escuela Graduada de Administraci\u00f3n P\u00fablica (UPR). Bachillerato en Ciencias Pol\u00edticas con concentraci\u00f3n menor en Derechos Humanos. Enfoque en temas de gobernanza.",
            photo: {
              id: 0,
              alt: "Retrato de Janiel de Jes\u00fas Santiago",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/janiel-de-jesus-7e19a5ae-dd35-43fa-b117-21e6e25e3662.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Ana Teresa Rodr\u00edguez Lebr\u00f3n, PhD",
            role: "Vocal de la Junta de Directores",
            bio: "Especialista en educaci\u00f3n superior, gobernanza y \u00e9tica de las tecnolog\u00edas emergentes, con formaci\u00f3n doctoral en literatura, Juris Doctor y Maestr\u00eda en Administraci\u00f3n P\u00fablica. Se desempe\u00f1a como investigadora y conferencista en inteligencia artificial, gobernanza de internet y \u00e9tica aplicada.",
            photo: {
              id: 0,
              alt: "Retrato de Ana Teresa Rodr\u00edguez Lebr\u00f3n, PhD",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/ana-rodriguez-edd82bd9-04dc-4206-9af9-04d2a53708d3.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
        ],
      },
      {
        blockType: "committeeList",
        anchor: "comites",
        eyebrow: "Comit\u00e9s de trabajo",
        heading: "Tres frentes de acci\u00f3n.",
        description:
          "Tres comit\u00e9s estructuran la actividad sustantiva de la Asociaci\u00f3n, cada uno con responsabilidades definidas y abierto a la participaci\u00f3n de la membres\u00eda.",
      },
    ],
    meta: {
      title: "Estructura organizacional",
      description: "Conoce la Junta Directiva y los comit\u00e9s de trabajo de la ADPUPR.",
    },
    _status: "published",
  },
  {
    slug: "nosotros/historia-fundacion",
    title: "Historia de Fundaci\u00f3n",
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "Nuestra historia",
        title: "Historia de Fundaci\u00f3n",
        titleSize: "large",
        description:
          "Durante el per\u00edodo 2023\u20132025, la Junta Fundadora estableci\u00f3 las bases institucionales que dieron origen y proyecci\u00f3n a la Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico.",
      },
      {
        blockType: "peopleGrid",
        background: "surface-2",
        display: "portraits",
        eyebrow: "Liderazgo inaugural",
        heading: "Junta Fundadora",
        description:
          "Siete profesionales asumieron la responsabilidad de convertir una visi\u00f3n compartida en una instituci\u00f3n con bases firmes.",
        people: [
          {
            name: "Urayo\u00e1n Jord\u00e1n Salivia",
            role: "Presidente",
            photo: {
              id: 0,
              alt: "Retrato de Urayo\u00e1n Jord\u00e1n Salivia",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/urayoan-305ea19e-e0e2-4e31-a8dc-6567867b49cd.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Liz. J. Ortiz Laureano",
            role: "Vicepresidenta",
            photo: {
              id: 0,
              alt: "Retrato de Liz. J. Ortiz Laureano",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/liz-68f1ad00-d563-4d6a-b9f6-58e974a11a24.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "D\u00e9borah R. Rom\u00e1n Cort\u00e9s",
            role: "Secretaria",
            photo: {
              id: 0,
              alt: "Retrato de D\u00e9borah R. Rom\u00e1n Cort\u00e9s",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/debora-60cc4ded-688e-466f-8d5c-2e78b022aa38.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Jonnathan Garc\u00eda Rosado",
            role: "Director de Tesorer\u00eda",
            photo: {
              id: 0,
              alt: "Retrato de Jonnathan Garc\u00eda Rosado",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/jonnathan-6aca08c9-7520-41d2-800c-fa3e435093c0.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Rosalie Ayala Col\u00f3n",
            role: "Directora de Relaciones P\u00fablicas",
            photo: {
              id: 0,
              alt: "Retrato de Rosalie Ayala Col\u00f3n",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/rosalie-6bc1df39-30e0-4c76-bd31-ab4570bad221.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Alexis G\u00f3mez Rivera",
            role: "Vocal",
            photo: {
              id: 0,
              alt: "Retrato de Alexis G\u00f3mez Rivera",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/alexis-f9f50ad9-3b17-4fe9-b85c-4cb1cd7111ab.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
          {
            name: "Jonuel Negr\u00f3n",
            role: "Vocal",
            photo: {
              id: 0,
              alt: "Retrato de Jonuel Negr\u00f3n",
              url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/jonuel-negron-12649ace-f27c-4fab-af6a-a5cc253c78fd.png",
              createdAt: "2026-01-01T00:00:00.000Z",
              updatedAt: "2026-01-01T00:00:00.000Z",
            },
          },
        ],
      },
      {
        blockType: "stats",
        variant: "panel",
        eyebrow: "Legado institucional",
        heading: "Hitos de la Gesti\u00f3n Fundadora",
        items: [
          {
            value: "2023",
            label: "A\u00f1o de fundaci\u00f3n",
          },
          {
            value: "2",
            label: "Conferencias organizadas",
          },
          {
            value: "1",
            label: "Bolet\u00edn institucional creado",
          },
          {
            value: "7",
            label: "Miembros de la Junta Fundadora",
          },
        ],
      },
      {
        blockType: "numberedList",
        background: "bg",
        layout: "split",
        eyebrow: "2023\u20132025",
        heading: "La gesti\u00f3n fundadora",
        items: [
          {
            text: "Constituy\u00f3 y organiz\u00f3 la ADPUPR, estableciendo su estructura de gobernanza, reglamentaci\u00f3n y procesos institucionales.",
          },
          {
            text: "Celebr\u00f3 las primeras conferencias anuales de la Asociaci\u00f3n, sentando las bases del principal espacio de encuentro acad\u00e9mico y profesional de la ADPUPR.",
          },
          {
            text: "Impuls\u00f3 la presencia institucional de la Asociaci\u00f3n, mediante el desarrollo de la p\u00e1gina web oficial y el lanzamiento del bolet\u00edn informativo.",
          },
          {
            text: "Fortaleci\u00f3 la sostenibilidad administrativa y financiera, gestionando el cumplimiento de los requisitos legales, las membres\u00edas y las obligaciones institucionales.",
          },
          {
            text: "Promovi\u00f3 el crecimiento organizacional, impulsando nuevos comit\u00e9s de trabajo, publicaciones acad\u00e9micas y proyectos para asegurar la continuidad de la Asociaci\u00f3n.",
          },
        ],
      },
    ],
    meta: {
      title: "Historia de Fundaci\u00f3n",
      description:
        "Conoce la Junta Fundadora y los hitos de la gesti\u00f3n inaugural de la ADPUPR durante 2023\u20132025.",
    },
    _status: "published",
  },
  {
    slug: "membresia",
    title: "Membres\u00eda",
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "\u00danete a la Asociaci\u00f3n",
        title: "De la opini\u00f3n a la acci\u00f3n.",
        titleSize: "large",
        description:
          "Ser miembro de ADPUPR te conecta con personas comprometidas con una administraci\u00f3n p\u00fablica \u00e9tica, moderna y basada en datos.",
      },
      {
        blockType: "checklist",
        background: "surface-2",
        eyebrow: "Beneficios de la membres\u00eda",
        heading: "Lo que incluye tu membres\u00eda.",
        items: [
          {
            text: "Acceder y participar en foros, talleres, conferencias y conversatorios a costos exclusivos, con pre-reservaciones.",
          },
          {
            text: "Unirte a los equipos de los comit\u00e9s de trabajo de tu inter\u00e9s.",
          },
          {
            text: "Formar parte de una red profesional con acad\u00e9micos, investigadores, estudiantes y profesionales del servicio p\u00fablico.",
          },
          {
            text: "Contribuir al an\u00e1lisis, la investigaci\u00f3n y el debate p\u00fablico informado en Puerto Rico.",
          },
          {
            text: "Tener voz y voto en las Asambleas de ADPUPR.",
          },
          {
            text: "Fortalecer tu desarrollo profesional y ampliar tus oportunidades de aprendizaje y colaboraci\u00f3n.",
          },
        ],
      },
      {
        blockType: "signupSteps",
        background: "surface-2",
        formStep: {
          eyebrow: "Paso 1 \u00b7 Pre-registro",
          heading: "Completa el formulario de membres\u00eda.",
          text: "Si solicitas ingreso por primera vez, completa el formulario para quedar prerregistrado como integrante de la ADPUPR. El formulario y el pago son procesos separados.",
          link: {
            label: "Completar formulario de membres\u00eda",
            url: "https://docs.google.com/forms/d/e/1FAIpQLSed-nAU7aA8_D4DQ7HjD0byLe3B8b_0zY0WEL-Riy1nKgbVbg/viewform",
          },
          noteTitle: "Confirmaci\u00f3n de membres\u00eda",
          noteText: "La membres\u00eda se activa una vez que la ADPUPR verifica y aprueba el pago.",
        },
        paymentStep: {
          eyebrow: "Paso 2 \u00b7 Pago",
          heading: "Selecciona un m\u00e9todo de pago.",
          methods: [
            {
              title: "ATH M\u00f3vil",
              description: "Paga por negocio a **ADPUPR**.",
              link: {
                label: "Pagar con ATH M\u00f3vil",
                url: "https://pagos.athmovilapp.com/qrCodePayment.html?133d0fe53fe0aee5f76f045eeebc2197e51d7aec08444832522d3dda729305c0",
              },
            },
            {
              title: "PayPal",
              options: [
                {
                  label: "Membres\u00eda regular",
                  price: "$50",
                  url: "https://www.paypal.com/ncp/payment/K3YBF8EGL7CDA",
                },
                {
                  label: "Membres\u00eda de estudiante",
                  price: "$25",
                  url: "https://www.paypal.com/ncp/payment/MESA9TVUCWGL6",
                },
              ],
            },
            {
              title: "Cheque o giro",
              description:
                "Emite el cheque o giro a nombre de la \u201cAsociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico\u201d y env\u00edalo por correo postal a:",
              showPostalAddress: true,
            },
          ],
        },
      },
      {
        blockType: "splitContent",
        background: "surface",
        style: "plain",
        eyebrow: "Una comunidad que aporta",
        heading: "Crecer y servir, en comunidad.",
        body: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Pertenecer a la Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico (ADPUPR) brinda la oportunidad de integrarse a una red de profesionales, acad\u00e9micos, estudiantes y personas interesadas en fortalecer la administraci\u00f3n y el servicio p\u00fablico puertorrique\u00f1o. Esta comunidad facilita el intercambio de conocimientos y experiencias entre personas que se desempe\u00f1an en el gobierno, la academia, organizaciones comunitarias y otros sectores relacionados con la gesti\u00f3n p\u00fablica.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Nuestra membres\u00eda tambi\u00e9n promueve el desarrollo profesional mediante talleres, conferencias, conversatorios, publicaciones y otras actividades educativas sobre temas pertinentes para la administraci\u00f3n p\u00fablica puertorrique\u00f1a. Asimismo, sus miembros pueden beneficiarse de tarifas preferenciales en determinadas actividades, mantenerse informados sobre iniciativas de la Asociaci\u00f3n y ampliar su red de contactos profesionales.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Adem\u00e1s, la ADPUPR ofrece espacios para participar en comit\u00e9s de trabajo, asambleas y proyectos institucionales, permitiendo que sus integrantes aporten sus conocimientos, desarrollen destrezas de liderazgo y colaboren en el an\u00e1lisis de los asuntos p\u00fablicos. Ser parte de la Asociaci\u00f3n no solo representa una oportunidad de crecimiento profesional, sino tambi\u00e9n una forma de contribuir al desarrollo de una administraci\u00f3n p\u00fablica m\u00e1s \u00e9tica, eficiente, transparente y comprometida con las necesidades de Puerto Rico.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
      },
    ],
    meta: {
      title: "Membres\u00eda",
      description:
        "Conoce las tarifas, completa el formulario y selecciona tu m\u00e9todo de pago para solicitar membres\u00eda en la ADPUPR.",
    },
    _status: "published",
  },
  {
    slug: "recursos",
    title: "Recursos",
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "Centro de recursos",
        title: "Conocimiento para el servicio p\u00fablico.",
        titleSize: "large",
        description:
          "Explora publicaciones, convocatorias y materiales que documentan la conversaci\u00f3n sobre la administraci\u00f3n p\u00fablica en Puerto Rico.",
        sideLinks: [
          {
            label: "Publicaciones",
            url: "#publicaciones",
          },
          {
            label: "Convocatoria",
            url: "#convocatoria-boletin",
          },
          {
            label: "Biblioteca",
            url: "#biblioteca",
          },
        ],
      },
      {
        blockType: "resourceLibrary",
        anchor: "publicaciones",
        eyebrow: "Boletines informativos",
        heading: "Una memoria activa de la profesi\u00f3n.",
        body: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Los boletines informativos de ADPUPR son publicaciones institucionales que documentan, difunden y analizan iniciativas, entrevistas, art\u00edculos de opini\u00f3n y actividades relevantes para la administraci\u00f3n p\u00fablica en Puerto Rico.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "A trav\u00e9s de estos boletines, la Asociaci\u00f3n promueve la educaci\u00f3n p\u00fablica profesional, el intercambio de ideas y la reflexi\u00f3n cr\u00edtica sobre los principales retos de la gobernanza, la gesti\u00f3n p\u00fablica y el servicio p\u00fablico.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
      },
      {
        blockType: "ctaBand",
        anchor: "convocatoria-boletin",
        style: "mustard",
        icon: "send",
        eyebrow: "Convocatoria abierta",
        heading: "Comparte tu propuesta para el V Bolet\u00edn Informativo.",
        description:
          "Somete tu art\u00edculo de opini\u00f3n y aporta nuevas perspectivas a la conversaci\u00f3n sobre administraci\u00f3n p\u00fablica.",
        buttons: [
          {
            label: "Someter propuesta",
            url: "mailto:info@adpupr.com?subject=Propuesta%20para%20el%20V%20Bolet%C3%ADn%20Informativo",
            style: "primary",
          },
        ],
      },
      {
        blockType: "cardGrid",
        anchor: "biblioteca",
        background: "surface",
        style: "columns",
        eyebrow: "Archivo hist\u00f3rico",
        heading: "Biblioteca de conferencias.",
        intro:
          "Un espacio para preservar y consultar las ideas compartidas en las conferencias de la ADPUPR a trav\u00e9s de los a\u00f1os.",
        cards: [
          {
            icon: "file-chart",
            title: "Presentaciones",
            description: "Diapositivas y materiales presentados por conferenciantes y panelistas.",
            status: "Archivo en preparaci\u00f3n",
          },
          {
            icon: "book-open",
            title: "Art\u00edculos de conferencias",
            description:
              "Ponencias, investigaciones y textos vinculados a conferencias anteriores.",
            status: "Archivo en preparaci\u00f3n",
          },
        ],
        note: "La biblioteca crecer\u00e1 a medida que se digitalicen los documentos hist\u00f3ricos.",
      },
    ],
    meta: {
      title: "Recursos",
      description:
        "Consulta boletines, art\u00edculos de opini\u00f3n, comunicados, convocatorias y el archivo hist\u00f3rico de la ADPUPR.",
    },
    _status: "published",
  },
  {
    slug: "conferencia",
    title: "Conferencia 2026",
    layout: [
      {
        blockType: "eventHero",
        eyebrow: "Conferencia 2026",
        title: "3ra Conferencia Anual de Administraci\u00f3n P\u00fablica",
        themeLabel: "Tema central",
        theme:
          "Estado, sociedad y colaboraci\u00f3n p\u00fablica: nuevas arquitecturas de gobernanza",
        dateNumber: "02",
        dateLabel: "octubre\n2026",
        detail: "Viernes \u00b7 Hato Rey, Puerto Rico",
      },
      {
        blockType: "eventDetails",
        background: "bg",
        items: [
          {
            icon: "calendar",
            label: "Fecha",
            value: "Viernes, 2 de octubre de 2026",
          },
          {
            icon: "clock",
            label: "Horario",
            value: "7:30 a.m. \u2013 5:00 p.m.",
          },
          {
            icon: "map-pin",
            label: "Lugar",
            value: "Sal\u00f3n Teatro Ing. Salvador V. Caro, sede de Hato Rey del CIAPR",
          },
        ],
      },
      {
        blockType: "iconList",
        background: "bg",
        eyebrow: "Una jornada para conectar",
        heading: "Ideas para un mejor servicio p\u00fablico.",
        items: [
          {
            icon: "users",
            title: "Asiste para participar en:",
            text: "Una conferencia magistral, paneles acad\u00e9micos, discusiones multisectoriales, networking y experiencias de profesionales de la pr\u00e1ctica.",
          },
          {
            icon: "badge-check",
            text: "Certificaci\u00f3n de Convalidaci\u00f3n de hasta un m\u00e1ximo de 8.5 horas en educaci\u00f3n continua de la Oficina de \u00c9tica Gubernamental (OEG)",
            emphasis: true,
          },
        ],
      },
      {
        blockType: "agenda",
        anchor: "agenda",
        background: "bg",
        heading: "Agenda del d\u00eda",
        periods: [
          {
            title: "Ma\u00f1ana",
            subtitle: "Apertura, investigaci\u00f3n y di\u00e1logo multisectorial.",
            entries: [
              {
                start: "7:30 a.m.",
                end: "8:30 a.m.",
                title: "Registro, desayuno y networking",
                minor: true,
              },
              {
                start: "8:30 a.m.",
                end: "8:55 a.m.",
                title: "Bienvenida protocolar, saludo y reflexi\u00f3n presidencial",
                description:
                  "Apertura a cargo de la Direcci\u00f3n de Relaciones P\u00fablicas y la Presidencia de ADPUPR.",
                minor: false,
              },
              {
                start: "8:55 a.m.",
                end: "9:40 a.m.",
                title: "Conferencia magistral",
                description:
                  "Presentaci\u00f3n de 40 minutos, seguida de 5 minutos de preguntas y comentarios del p\u00fablico.",
                minor: false,
              },
              {
                start: "9:40 a.m.",
                end: "10:35 a.m.",
                title: "Panel acad\u00e9mico / Investigaciones",
                description:
                  "Investigaciones de ponentes seleccionados por convocatoria, en un panel moderado.",
                minor: false,
              },
              {
                start: "10:35 a.m.",
                end: "10:40 a.m.",
                title: "Mensaje de patrocinadores",
                minor: true,
              },
              {
                start: "10:40 a.m.",
                end: "11:40 a.m.",
                title: "Gran panel multisectorial",
                description:
                  "Di\u00e1logo entre el Estado, la academia, el sector privado y el tercer sector.",
                minor: false,
              },
              {
                start: "11:40 a.m.",
                end: "11:45 a.m.",
                title: "Mensaje de patrocinadores",
                minor: true,
              },
              {
                start: "11:45 a.m.",
                end: "12:40 p.m.",
                title: "Almuerzo de networking",
                description:
                  "Receso para almorzar, conectar con participantes y visitar los espacios de exhibici\u00f3n en el vest\u00edbulo.",
                minor: true,
              },
            ],
          },
          {
            title: "Tarde",
            subtitle: "Experiencias, propuestas y encuentro de la membres\u00eda.",
            entries: [
              {
                start: "12:40 p.m.",
                end: "1:40 p.m.",
                title: "Panel presidencial / Practitioners",
                description: "Di\u00e1logo con tres invitados, moderado por la Presidencia.",
                minor: false,
              },
              {
                start: "1:40 p.m.",
                end: "1:45 p.m.",
                title: "Mensaje de patrocinadores",
                minor: true,
              },
              {
                start: "1:45 p.m.",
                end: "2:15 p.m.",
                title: "Reconocimiento a colaboradores",
                description:
                  "Reconocimiento a colaboradores y menci\u00f3n de acuerdos colaborativos, con la participaci\u00f3n del Presidente de ASPA.",
                minor: false,
              },
              {
                start: "2:15 p.m.",
                end: "3:10 p.m.",
                title: "Panel II: Casos reales",
                description:
                  "Estudios de casos, iniciativas sociales, experiencias reales y aprendizajes aplicados.",
                minor: false,
              },
              {
                start: "3:10 p.m.",
                end: "3:15 p.m.",
                title: "Mensaje de patrocinadores",
                minor: true,
              },
              {
                start: "3:15 p.m.",
                end: "3:35 p.m.",
                title: "Receso de la tarde",
                description: "Merienda y networking.",
                minor: true,
              },
              {
                start: "3:35 p.m.",
                end: "4:00 p.m.",
                title:
                  "Laboratorio de reacci\u00f3n del p\u00fablico, s\u00edntesis y cierre acad\u00e9mico",
                description:
                  "Un espacio de retroalimentaci\u00f3n guiada y propuestas de acci\u00f3n para cerrar la jornada acad\u00e9mica.",
                minor: false,
              },
              {
                start: "4:00 p.m.",
                end: "4:15 p.m.",
                title: "Networking y registro para la asamblea",
                description:
                  "Validaci\u00f3n de membres\u00eda activa y registro de participantes.",
                minor: true,
              },
              {
                start: "4:15 p.m.",
                end: "5:00 p.m.",
                title: "Asamblea Ordinaria ADPUPR",
                description:
                  "Encuentro de la Junta de Directores y la membres\u00eda. Agenda, propuesta de enmiendas e informe de gesti\u00f3n.",
                minor: false,
              },
            ],
          },
        ],
        footnote: "Programa sujeto a ajustes.",
        link: {
          label: "Ver tarifas e inscripci\u00f3n",
          url: "#inscripcion",
        },
      },
      {
        blockType: "benefitsPanel",
        anchor: "beneficios",
        eyebrow: "Tu inscripci\u00f3n incluye",
        heading: "Todo lo que incluye tu experiencia.",
        highlight: {
          label: "Educaci\u00f3n continua",
          value: "8.5 h",
          text: "Hasta 8.5 horas de la Oficina de \u00c9tica Gubernamental (OEG).",
        },
        items: [
          {
            title: "Conferencias y paneles",
            detail: "Acceso al programa completo.",
            icon: "presentation",
          },
          {
            title: "Materiales y recursos",
            detail: "Contenido exclusivo para participantes.",
            icon: "file-text",
          },
          {
            title: "Certificado",
            detail: "Certificado de participaci\u00f3n.",
            icon: "badge-check",
          },
          {
            title: "Desayuno, almuerzo y meriendas",
            detail: "Incluidos en tu inscripci\u00f3n.",
            icon: "utensils",
          },
          {
            title: "Caf\u00e9 y agua",
            detail: "Acceso a estaciones de caf\u00e9 y agua.",
            icon: "coffee",
          },
          {
            title: "Networking",
            detail:
              "Con profesionales, estudiantes graduados, servidores p\u00fablicos y organizaciones.",
            icon: "users",
          },
          {
            title: "Exhibiciones y aliados",
            detail: "Acceso a booths, exhibiciones y aliados.",
            icon: "store",
          },
        ],
        note: "**Asamblea Ordinaria** \u00b7 Exclusiva para miembros activos de ADPUPR.",
      },
      {
        blockType: "pricing",
        anchor: "inscripcion",
        background: "surface",
        eyebrow: "Inscripci\u00f3n \u00b7 Paso 1",
        heading: "Realiza tu pago.",
        intro:
          "Selecciona tu tarifa y realiza el pago con PayPal o ATH M\u00f3vil. Conserva tu evidencia de pago, ya que deber\u00e1s incluirla en el formulario de inscripci\u00f3n.",
        plans: [
          {
            name: "Costo regular",
            price: "$180",
            note: "Para participantes no afiliados.",
            featured: false,
            url: "https://www.paypal.com/ncp/payment/GCAUMGUNGTMBW",
            buttonLabel: "Pagar con PayPal",
            badge: "",
          },
          {
            name: "Costo preferencial",
            price: "$100",
            note: "Para miembros activos de ADPUPR.",
            featured: true,
            url: "https://www.paypal.com/ncp/payment/362TTQUZLAK7G",
            buttonLabel: "Pagar con PayPal",
            badge: "Miembros",
          },
          {
            name: "Preferencial estudiantil",
            price: "$75",
            note: "Para miembros estudiantes activos de ADPUPR.",
            featured: true,
            url: "https://www.paypal.com/ncp/payment/FAW7NTNWFWQXL",
            buttonLabel: "Pagar con PayPal",
            badge: "Miembros",
          },
        ],
        callout: {
          icon: "smartphone",
          title: "\u00bfPrefieres pagar con ATH M\u00f3vil?",
          text: "Al continuar, ser\u00e1s redirigido a ATH M\u00f3vil. Escribe manualmente el monto correspondiente a tu tarifa para finalizar la transacci\u00f3n.",
          link: {
            label: "Pagar con ATH M\u00f3vil",
            url: "https://pagos.athmovilapp.com/qrCodePayment.html?133d0fe53fe0aee5f76f045eeebc2197e51d7aec08444832522d3dda729305c0",
          },
        },
        footnote: "Las tarifas preferenciales aplican exclusivamente a miembros activos de ADPUPR.",
      },
      {
        blockType: "ctaBand",
        style: "navy-deep",
        eyebrow: "Inscripci\u00f3n \u00b7 Paso 2",
        heading: "Completa tu registro.",
        description:
          "Una vez realizado el pago, completa el Formulario de Inscripci\u00f3n e incluye tu evidencia de pago.",
        buttons: [
          {
            label: "Completar formulario de inscripci\u00f3n",
            url: "https://docs.google.com/forms/d/e/1FAIpQLSd3Nc0d9srM9AgoSQal0RWS__ARj53TacAYnNQ24VxXYYAbHA/viewform",
            style: "primary",
          },
        ],
      },
      {
        blockType: "numberedGrid",
        background: "surface",
        eyebrow: "Programa de contenido",
        heading: "Ejes tem\u00e1ticos",
        intro: "Funcionar\u00e1n como hilos conductores en las actividades preconferencia.",
        numberPrefix: "Eje",
        descriptionPrefix: "Enfoque:",
        items: [
          {
            title: "Gobernanza inteligente y humana",
            description:
              "Responde a uno de los mayores desaf\u00edos de la administraci\u00f3n p\u00fablica contempor\u00e1nea: c\u00f3mo aprovechar la inteligencia tecnol\u00f3gica sin perder la inteligencia humana. Reconoce que un gobierno moderno no solo debe ser m\u00e1s eficiente y digital, sino tambi\u00e9n m\u00e1s cercano, \u00e9tico, participativo y orientado al bienestar de las personas.",
          },
          {
            title: "Reconstruir la confianza p\u00fablica",
            description:
              "Reconstruir la confianza p\u00fablica significa fortalecer la credibilidad y legitimidad de las instituciones mediante una gesti\u00f3n \u00e9tica, transparente, participativa y responsable, capaz de responder al inter\u00e9s p\u00fablico y generar confianza ciudadana.",
          },
          {
            title: "Capacidades del Estado y profesionalizaci\u00f3n",
            description:
              "Un Estado es tan fuerte como las capacidades de sus instituciones y de las personas que las integran. Las mejores leyes, pol\u00edticas p\u00fablicas o tecnolog\u00edas tienen un impacto limitado si el servicio p\u00fablico carece de las competencias, el liderazgo y las estructuras necesarias para implementarlas eficazmente.",
          },
          {
            title: "Estado, sociedad y colaboraci\u00f3n p\u00fablica",
            description:
              "Nuevas arquitecturas de gobernanza. Este eje promueve la reflexi\u00f3n sobre la colaboraci\u00f3n entre el Estado, la academia, el tercer sector, la empresa privada y la ciudadan\u00eda como mecanismo para fortalecer la gobernanza democr\u00e1tica y la creaci\u00f3n de valor p\u00fablico. Asimismo, aborda temas como la coproducci\u00f3n de valor p\u00fablico, el cooperativismo, la gobernanza municipal y otros modelos de colaboraci\u00f3n intersectorial que contribuyan al desarrollo sostenible y al fortalecimiento de las instituciones p\u00fablicas.",
          },
        ],
      },
    ],
    meta: {
      title: "Conferencia 2026",
      description:
        "Conoce los detalles e inscr\u00edbete en la 3ra Conferencia Anual de Administraci\u00f3n P\u00fablica de la ADPUPR, el 2 de octubre de 2026.",
    },
    _status: "published",
  },
  {
    slug: "contactanos",
    title: "Cont\u00e1ctanos",
    layout: [
      {
        blockType: "pageHero",
        eyebrow: "Contacto",
        title: "Las mejores iniciativas nacen de la colaboraci\u00f3n.",
        titleSize: "medium",
        description:
          "Cada conversaci\u00f3n puede abrir una nueva manera de aportar a una administraci\u00f3n p\u00fablica m\u00e1s efectiva, \u00e9tica e innovadora.",
      },
      {
        blockType: "contactSection",
        eyebrow: "Conversemos",
        heading: "Tu inter\u00e9s tambi\u00e9n impulsa el servicio p\u00fablico.",
        body: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "En la ADPUPR valoramos cada conversaci\u00f3n, cada idea y cada persona interesada en aportar al desarrollo de una administraci\u00f3n p\u00fablica m\u00e1s efectiva, \u00e9tica e innovadora.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Ya sea que quieras unirte a nuestras iniciativas, establecer una alianza, participar en nuestros eventos o simplemente conocer m\u00e1s sobre nuestro trabajo, estamos disponibles para todo aquel que quiera sumar a la administraci\u00f3n p\u00fablica desde cualquier sector. Escr\u00edbenos o s\u00edguenos en nuestras redes sociales para mantenernos en contacto.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
                textFormat: 0,
                textStyle: "",
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
        form: {
          eyebrow: "Escr\u00EDbenos",
          heading: "Inicia una conversaci\u00F3n.",
          note: "El formulario no almacena tus datos.",
          buttonLabel: "Enviar correo",
        },
      },
    ],
    meta: {
      title: "Cont\u00e1ctanos",
      description:
        "Conversa con la ADPUPR para colaborar, establecer alianzas, participar en eventos o conocer m\u00e1s sobre nuestro trabajo.",
    },
    _status: "published",
  },
] satisfies RequiredDataFromCollectionSlug<"pages">[];

export const SEED_COMMITTEES = [
  {
    name: "Publicaciones Institucionales",
    description:
      "El Comit\u00e9 de Publicaciones Institucionales tiene como finalidad coordinar, supervisar y fortalecer los productos comunicativos formales y acad\u00e9micos de la Asociaci\u00f3n, de manera que reflejen su misi\u00f3n, visi\u00f3n y valores. Adem\u00e1s, estas comunicaciones servir\u00e1n para divulgar temas afines a la membres\u00eda, incluyendo actividades, logros y aportaciones de las personas que la componen.",
    focus:
      "En estos momentos, el eje principal del trabajo del Comit\u00e9 es el bolet\u00edn institucional de la Asociaci\u00f3n, complementado por c\u00e1psulas educativas publicadas en las redes sociales oficiales.",
    functionsLabel: "El alcance del Comit\u00e9 incluye",
    slug: "publicaciones-institucionales",
    functions: [
      {
        text: "Planificar, coordinar y evaluar el bolet\u00edn institucional de la Asociaci\u00f3n.",
      },
      {
        text: "Dise\u00f1ar y coordinar c\u00e1psulas educativas para su difusi\u00f3n en redes sociales, en coordinaci\u00f3n con la Junta ADPU-PR y otros comit\u00e9s.",
      },
      {
        text: "Proponer lineamientos editoriales y de estilo para las publicaciones institucionales, como el bolet\u00edn, las c\u00e1psulas y los comunicados.",
      },
    ],
    coordinator: {
      name: "Deliz Rodr\u00edguez-Carrasquillo, Ph.D. ",
      bio: "Catedr\u00e1tica Auxiliar en la Escuela Graduada de Administraci\u00f3n P\u00fablica de la Universidad de Puerto Rico, Recinto de R\u00edo Piedras. Posee un doctorado en Psicolog\u00eda Industrial Organizacional de la UPR-RP, con formaci\u00f3n en el an\u00e1lisis de factores psicosociales que influyen en la experiencia laboral y en el dise\u00f1o de entornos de trabajo m\u00e1s justos. Su trayectoria integra la docencia, la investigaci\u00f3n y la consultor\u00eda, con proyectos de clasificaci\u00f3n, retribuci\u00f3n y recursos humanos en el sector p\u00fablico. Ha publicado art\u00edculos en revistas arbitradas sobre equidad de g\u00e9nero, reclutamiento y selecci\u00f3n de personas empleadas, y se desempe\u00f1a como editora de la Revista de Administraci\u00f3n P\u00fablica. Su agenda acad\u00e9mica se centra en la intersecci\u00f3n entre pol\u00edticas p\u00fablicas y gesti\u00f3n del talento humano, con \u00e9nfasis en equidad, diversidad, empleo y estrategias de reclutamiento y selecci\u00f3n. Adem\u00e1s, brinda consultor\u00eda al sector p\u00fablico en temas vinculados a los recursos humanos.",
      photo: {
        id: 0,
        alt: "Retrato de Deliz Rodr\u00edguez-Carrasquillo, Ph.D. ",
        url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/deliz-9c750515-e457-4653-bfbe-fc8fbc112d2c.png",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    },
    board: {
      summary:
        "La Junta Editora lidera la planificaci\u00f3n, coordinaci\u00f3n y producci\u00f3n del Bolet\u00edn Informativo de la ADPUPR, velando por la calidad editorial, la pertinencia de los contenidos y la difusi\u00f3n de informaci\u00f3n de inter\u00e9s para la comunidad profesional de la administraci\u00f3n p\u00fablica.",
      members: [
        {
          name: "Dra. Deliz Rodr\u00edguez Carrasquillo",
          role: "Coordinadora del Comit\u00e9",
        },
        {
          name: "Jonnathan Garc\u00eda Rosado",
          role: "Presidente de la ADPUPR y Miembro del Comit\u00e9",
        },
        {
          name: "Victoria Ram\u00edrez",
          role: "Directora de Relaciones P\u00fablicas de la ADPUPR y Miembro del Comit\u00e9",
        },
      ],
      responsibilities: [
        {
          text: "Planificar cada n\u00famero del bolet\u00edn, en el marco de los temas y lineamientos aprobados por el Comit\u00e9 de Publicaciones Institucionales. Esto incluye la selecci\u00f3n del tema, cantidad de noticias recientes, entrevista y los art\u00edculos de opini\u00f3n.",
        },
        {
          text: "Adem\u00e1s, la Junta Editora ser\u00e1 responsable del montaje y edici\u00f3n del bolet\u00edn informativo.",
        },
        {
          text: "Se considerar\u00e1n todas las recomendaciones, ideas y estrategias de los miembros del Comit\u00e9 y la Junta Editora tomar\u00e1 la decisi\u00f3n de acuerdo con la misi\u00f3n y valores de ADPUPR.",
        },
      ],
      title: "Junta Editora",
    },
  },
  {
    name: "Asuntos Legislativos",
    description:
      "El Comit\u00e9 de Asuntos Legislativos tiene la responsabilidad de analizar, dar seguimiento y comunicar a la membres\u00eda los desarrollos legislativos y regulatorios que impactan la administraci\u00f3n p\u00fablica en Puerto Rico. Su funci\u00f3n es servir como puente entre los procesos formales de formulaci\u00f3n de pol\u00edtica p\u00fablica y la comunidad profesional de ADPUPR, promoviendo una comprensi\u00f3n accesible, rigurosa y no partidista de los cambios legales que afectan el servicio p\u00fablico, las instituciones gubernamentales y la gesti\u00f3n administrativa.",
    functionsLabel: "Funciones principales",
    slug: "asuntos-legislativos",
    functions: [
      {
        text: "Monitoreo legislativo sistem\u00e1tico: revisar proyectos de ley, resoluciones conjuntas, informes, reglamentos y decisiones administrativas con impacto en la administraci\u00f3n p\u00fablica.",
      },
      {
        text: "An\u00e1lisis t\u00e9cnico y res\u00famenes ejecutivos: elaborar c\u00e1psulas informativas, an\u00e1lisis comparados y documentos breves que expliquen en lenguaje claro los cambios legislativos relevantes para el ecosistema p\u00fablico.",
      },
      {
        text: "Redacci\u00f3n de ponencias: preparar ponencias sobre medidas relacionadas con la administraci\u00f3n p\u00fablica y el funcionamiento del servicio p\u00fablico en las ramas ejecutiva, legislativa y judicial, incluyendo proyectos de ley, resoluciones, reglamentos, \u00f3rdenes ejecutivas y administrativas, y cartas circulares.",
      },
    ],
    coordinator: {
      name: "Javier Cuevas Landr\u00f3n",
      bio: "Servidor p\u00fablico con varios a\u00f1os de experiencia en las ramas legislativa y ejecutiva del Gobierno de Puerto Rico. Con preparaci\u00f3n en ciencias pol\u00edticas y administraci\u00f3n p\u00fablica, ha integrado m\u00faltiples organizaciones p\u00fablicas y pol\u00edticas a nivel estatal y federal. Comenz\u00f3 su carrera en el Senado de Puerto Rico, donde trabaj\u00f3 en la Oficina del Portavoz de la Mayor\u00eda, el Comit\u00e9 de Reglas y Calendarios y una de las Portavoc\u00edas Alternas de la Minor\u00eda. Posee experiencia detallada en el proceso legislativo, los procedimientos parlamentarios y las relaciones intergubernamentales. Actualmente es ayudante especial del Secretario de Salud de Puerto Rico y coordinador del Comit\u00e9 de Asuntos Legislativos de ADPUPR.",
      photo: {
        id: 0,
        alt: "Retrato de Javier Cuevas Landr\u00f3n",
        url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/javier-c4fcd99b-48d2-4471-9d88-d97bd93a59c7.png",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    },
  },
  {
    name: "Educaci\u00f3n y Tecnolog\u00eda",
    description:
      "El Comit\u00e9 de Educaci\u00f3n y Tecnolog\u00eda de ADPUPR tiene como prop\u00f3sito fomentar una cultura de aprendizaje continuo dentro de la Asociaci\u00f3n y aportar al desarrollo de una ciudadan\u00eda informada. Su trabajo integra la educaci\u00f3n en temas de administraci\u00f3n p\u00fablica con el uso de las tecnolog\u00edas, promoviendo el acceso al conocimiento y el pensamiento cr\u00edtico que contribuyan al bienestar colectivo.",
    functionsLabel: "Funciones",
    slug: "educacion-tecnologia",
    functions: [
      {
        text: "Desarrollar contenidos educativos accesibles en diversos formatos y medios.",
      },
      {
        text: "Integrar herramientas tecnol\u00f3gicas innovadoras a los procesos educativos del Comit\u00e9, promoviendo su uso responsable, \u00e9tico y efectivo.",
      },
      {
        text: "Apoyar la misi\u00f3n de ADPUPR mediante actividades educativas.",
      },
    ],
    coordinator: {
      name: "Dr. Urayo\u00e1n Jord\u00e1n Salivia",
      bio: "Profesor de la Escuela Graduada de Administraci\u00f3n P\u00fablica (EGAP) de la Universidad de Puerto Rico, Recinto de R\u00edo Piedras. Posee un Doctorado en Administraci\u00f3n P\u00fablica de la Universidad de Baltimore y una Maestr\u00eda en Administraci\u00f3n P\u00fablica de la UPR R\u00edo Piedras. Fue el Presidente fundador de ADPUPR. Cuenta con una amplia trayectoria como acad\u00e9mico, administrador p\u00fablico y asesor parlamentario profesional. Su experiencia integra la docencia, el procedimiento parlamentario, la gobernanza organizacional y el fortalecimiento de entidades p\u00fablicas, profesionales y comunitarias. Como coordinador del Comit\u00e9 de Educaci\u00f3n y Tecnolog\u00eda de ADPUPR, impulsa iniciativas formativas orientadas al desarrollo de competencias pr\u00e1cticas para la gesti\u00f3n p\u00fablica, la deliberaci\u00f3n democr\u00e1tica y la toma de decisiones institucionales. Su aportaci\u00f3n fortalece la misi\u00f3n educativa de ADPUPR y su compromiso con una administraci\u00f3n p\u00fablica \u00e9tica, efectiva e innovadora.",
      photo: {
        id: 0,
        alt: "Retrato de Dr. Urayo\u00e1n Jord\u00e1n Salivia",
        url: "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/urayoan-305ea19e-e0e2-4e31-a8dc-6567867b49cd.png",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    },
  },
] satisfies RequiredDataFromCollectionSlug<"committees">[];

export const SEED_HEADER = {
  navItems: [
    {
      label: "Inicio",
      url: "/",
    },
    {
      label: "Nosotros",
      children: [
        {
          label: "Qui\u00e9nes somos",
          url: "/nosotros/quienes-somos",
        },
        {
          label: "Estructura organizacional",
          url: "/nosotros/estructura-organizacional",
        },
        {
          label: "Comit\u00e9s",
          url: "/nosotros/estructura-organizacional#comites",
        },
        {
          label: "Colaboradores",
          url: "/nosotros#colaboradores",
        },
        {
          label: "Historia de Fundaci\u00f3n",
          url: "/nosotros/historia-fundacion",
        },
      ],
    },
    {
      label: "Membres\u00eda",
      url: "/membresia",
    },
    {
      label: "Recursos",
      url: "/recursos",
    },
    {
      label: "Conferencia 2026",
      url: "/conferencia",
    },
    {
      label: "Cont\u00e1ctanos",
      url: "/contactanos",
    },
  ],
  cta: {
    label: "Hacerme miembro",
    url: "/membresia",
  },
} satisfies Omit<DataFromGlobalSlug<"header">, "id" | "createdAt" | "updatedAt">;

export const SEED_FOOTER = {
  description:
    "Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico \u2014 comprometida con la sana administraci\u00f3n p\u00fablica, la educaci\u00f3n c\u00edvica y la investigaci\u00f3n aplicada al servicio p\u00fablico.",
  columns: [
    {
      heading: "Asociaci\u00f3n",
      links: [
        {
          label: "Nosotros",
          url: "/nosotros/quienes-somos",
        },
        {
          label: "Misi\u00f3n y Visi\u00f3n",
          url: "/nosotros/quienes-somos",
        },
        {
          label: "Junta de Directores",
          url: "/nosotros/estructura-organizacional",
        },
        {
          label: "Comit\u00e9s de Trabajo",
          url: "/nosotros/estructura-organizacional#comites",
        },
      ],
    },
    {
      heading: "Recursos",
      links: [
        {
          label: "Publicaciones",
          url: "/recursos#publicaciones",
        },
        {
          label: "Biblioteca",
          url: "/recursos#biblioteca",
        },
        {
          label: "Membres\u00eda",
          url: "/membresia",
        },
      ],
    },
    {
      heading: "Comunidad",
      links: [
        {
          label: "Hacerme miembro",
          url: "/membresia",
        },
        {
          label: "Cont\u00e1ctanos",
          url: "/contactanos",
        },
      ],
    },
  ],
  copyright: "ADPUPR. Todos los derechos reservados.",
  location: "Puerto Rico \u00b7 Fundada el 8 de agosto de 2023",
} satisfies Omit<DataFromGlobalSlug<"footer">, "id" | "createdAt" | "updatedAt">;

export const SEED_SETTINGS = {
  organizationName: "Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico",
  siteTitle: "ADPUPR \u2014 Asociaci\u00f3n de Administraci\u00f3n P\u00fablica de Puerto Rico",
  siteDescription:
    "Promovemos la sana administraci\u00f3n p\u00fablica, la educaci\u00f3n c\u00edvica y la investigaci\u00f3n aplicada al servicio p\u00fablico en Puerto Rico.",
  emails: [
    {
      email: "info@adpupr.com",
    },
    {
      email: "asociacion.adpupr@gmail.com",
    },
  ],
  postalAddress: {
    street: "PO BOX 1269",
    city: "Trujillo Alto",
    region: "PR",
    postalCode: "00977",
  },
  social: [
    {
      platform: "facebook",
      url: "https://www.facebook.com/profile.php?id=61563728602523",
      handle: "ADPUPR",
    },
    {
      platform: "instagram",
      url: "https://www.instagram.com/adpupr/",
      handle: "@adpupr",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/asociaci%C3%B3n-de-administraci%C3%B3n-p%C3%BAblica-de-puerto-rico-adpupr-7b7290316/",
      handle: "Asociaci\u00f3n ADPUPR",
    },
    {
      platform: "youtube",
      url: "https://youtube.com/@adpupr?si=4aX7X-C7n9VSTPbY",
      handle: "@adpupr",
    },
  ],
} satisfies Omit<DataFromGlobalSlug<"site-settings">, "id" | "createdAt" | "updatedAt">;
