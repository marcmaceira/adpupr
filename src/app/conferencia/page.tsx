import type { Metadata } from "next"
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Users,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const REGISTRATION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd3Nc0d9srM9AgoSQal0RWS__ARj53TacAYnNQ24VxXYYAbHA/viewform"

const THEMES = [
  {
    number: "01",
    title: "Gobernanza inteligente y humana",
    description:
      "Responde a uno de los mayores desaf\u00EDos de la administraci\u00F3n p\u00FAblica contempor\u00E1nea: c\u00F3mo aprovechar la inteligencia tecnol\u00F3gica sin perder la inteligencia humana. Reconoce que un gobierno moderno no solo debe ser m\u00E1s eficiente y digital, sino tambi\u00E9n m\u00E1s cercano, \u00E9tico, participativo y orientado al bienestar de las personas.",
  },
  {
    number: "02",
    title: "Reconstruir la confianza p\u00FAblica",
    description:
      "Reconstruir la confianza p\u00FAblica significa fortalecer la credibilidad y legitimidad de las instituciones mediante una gesti\u00F3n \u00E9tica, transparente, participativa y responsable, capaz de responder al inter\u00E9s p\u00FAblico y generar confianza ciudadana.",
  },
  {
    number: "03",
    title: "Capacidades del Estado y profesionalizaci\u00F3n",
    description:
      "Un Estado es tan fuerte como las capacidades de sus instituciones y de las personas que las integran. Las mejores leyes, pol\u00EDticas p\u00FAblicas o tecnolog\u00EDas tienen un impacto limitado si el servicio p\u00FAblico carece de las competencias, el liderazgo y las estructuras necesarias para implementarlas eficazmente.",
  },
  {
    number: "04",
    title: "Estado, sociedad y colaboraci\u00F3n p\u00FAblica",
    description:
      "Nuevas arquitecturas de gobernanza. Este eje promueve la reflexi\u00F3n sobre la colaboraci\u00F3n entre el Estado, la academia, el tercer sector, la empresa privada y la ciudadan\u00EDa como mecanismo para fortalecer la gobernanza democr\u00E1tica y la creaci\u00F3n de valor p\u00FAblico. Asimismo, aborda temas como la coproducci\u00F3n de valor p\u00FAblico, el cooperativismo, la gobernanza municipal y otros modelos de colaboraci\u00F3n intersectorial que contribuyan al desarrollo sostenible y al fortalecimiento de las instituciones p\u00FAblicas.",
  },
] as const

const PRICES = [
  {
    name: "Costo regular",
    price: "$180",
    note: "Para participantes no afiliados.",
    href: "https://www.paypal.com/ncp/payment/GCAUMGUNGTMBW",
    featured: false,
  },
  {
    name: "Costo preferencial",
    price: "$100",
    note: "Para miembros activos de ADPUPR.",
    href: "https://www.paypal.com/ncp/payment/362TTQUZLAK7G",
    featured: true,
  },
  {
    name: "Preferencial estudiantil",
    price: "$75",
    note: "Para miembros estudiantes activos de ADPUPR.",
    href: "https://www.paypal.com/ncp/payment/FAW7NTNWFWQXL",
    featured: false,
  },
] as const

export const metadata: Metadata = {
  title: "Conferencia 2026",
  description:
    "Conoce los detalles e inscr\u00EDbete en la 3ra Conferencia Anual de Administraci\u00F3n P\u00FAblica de la ADPUPR, el 2 de octubre de 2026.",
  openGraph: {
    title: "Conferencia 2026 | ADPUPR",
    description:
      "Estado, sociedad y colaboraci\u00F3n p\u00FAblica: nuevas arquitecturas de gobernanza.",
    url: "/conferencia",
  },
}

export default function ConferenciaPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-primary px-6 py-16 text-white sm:py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-sky/30 sm:h-[440px] sm:w-[440px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-44 right-20 h-80 w-80 rounded-full border-2 border-mustard/40"
          />

          <div className="relative mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="eyebrow eyebrow-on-dark mb-5">Conferencia 2026</p>
              <h1 className="max-w-[15ch] font-heading text-[clamp(2.6rem,6vw,5.25rem)] font-black leading-[0.98] tracking-[-0.03em] text-white">
                3ra Conferencia Anual de Administraci&oacute;n P&uacute;blica
              </h1>
              <div className="mt-8 max-w-3xl border-l-4 border-mustard pl-5 sm:pl-7">
                <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-[0.13em] text-sky">
                  Tema central
                </p>
                <p className="font-heading text-xl font-bold leading-snug text-white sm:text-2xl">
                  Estado, sociedad y colaboraci&oacute;n p&uacute;blica: nuevas
                  arquitecturas de gobernanza
                </p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
              <div className="flex items-baseline gap-4 lg:block">
                <span className="font-heading text-7xl font-black leading-none text-mustard sm:text-8xl">
                  02
                </span>
                <div className="font-heading text-xl font-bold uppercase leading-tight tracking-[0.08em] text-white lg:mt-2">
                  Octubre
                  <br />
                  2026
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-text-on-dark-muted">
                Viernes &middot; Hato Rey, Puerto Rico
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="grid overflow-hidden rounded-lg border border-border bg-bg shadow-[var(--shadow-card)] md:grid-cols-3">
              <EventDetail icon={<CalendarDays />} label="Fecha">
                Viernes, 2 de octubre de 2026
              </EventDetail>
              <EventDetail icon={<Clock3 />} label="Horario">
                7:30 a.m. &ndash; 5:00 p.m.
              </EventDetail>
              <EventDetail icon={<MapPin />} label="Lugar">
                Sal&oacute;n Teatro Ing. Salvador V. Caro, sede de Hato Rey del
                CIAPR
              </EventDetail>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="eyebrow mb-3">Una jornada para conectar</p>
                <h2 className="h-section max-w-[12ch] text-primary">
                  Ideas para un mejor servicio p&uacute;blico.
                </h2>
              </div>
              <div className="flex gap-5 border-t border-border pt-7 lg:mt-1">
                <Users
                  className="mt-1 h-7 w-7 shrink-0 text-sky-600"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="mb-3 font-heading text-lg font-bold text-primary">
                    Asiste para participar en:
                  </h3>
                  <p className="text-lg leading-relaxed text-text-muted">
                    Una conferencia magistral, paneles acad&eacute;micos,
                    discusiones multisectoriales, networking y experiencias de
                    profesionales de la pr&aacute;ctica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-bg px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 grid gap-5 md:grid-cols-2 md:items-end">
              <div>
                <p className="eyebrow mb-3">Programa de contenido</p>
                <h2 className="h-section text-primary">Ejes tem&aacute;ticos</h2>
              </div>
              <p className="max-w-[52ch] text-text-muted md:justify-self-end">
                Funcionar&aacute;n como hilos conductores en las actividades
                preconferencia.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-2">
              {THEMES.map((theme) => (
                <article
                  key={theme.number}
                  className="group bg-surface p-7 transition-colors hover:bg-sky-50 sm:p-9"
                >
                  <div className="mb-8 flex items-center gap-4">
                    <span className="font-heading text-sm font-bold tracking-[0.12em] text-primary-300">
                      EJE {theme.number}
                    </span>
                    <span className="h-px flex-1 bg-border" aria-hidden="true" />
                  </div>
                  <h3 className="mb-4 max-w-[25ch] font-heading text-2xl font-bold leading-tight text-primary">
                    {theme.title}
                  </h3>
                  <p className="text-[15px] leading-[1.75] text-text-muted">
                    <strong className="font-semibold text-primary">Enfoque: </strong>
                    {theme.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary-900 px-6 py-16 text-white sm:py-20">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow eyebrow-on-dark mb-3">Reserva tu espacio</p>
              <h2 className="max-w-[18ch] font-heading text-3xl font-black leading-tight text-white sm:text-4xl">
                S&eacute; parte de la conversaci&oacute;n sobre el futuro de la
                gobernanza.
              </h2>
            </div>
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-mustard px-6 py-4 font-heading text-sm font-bold text-primary transition-colors hover:bg-mustard-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mustard"
            >
              Completar inscripci&oacute;n
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="bg-surface px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-2xl">
              <p className="eyebrow mb-3">Inscripci&oacute;n</p>
              <h2 className="h-section mb-4 text-primary">Selecciona tu tarifa.</h2>
              <p className="text-text-muted">
                Completa primero el formulario de inscripci&oacute;n y luego
                realiza el pago correspondiente a tu categor&iacute;a.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {PRICES.map((price) => (
                <article
                  key={price.name}
                  className={`relative flex flex-col rounded-lg border bg-surface p-7 shadow-[var(--shadow-card)] sm:p-8 ${
                    price.featured
                      ? "border-primary ring-1 ring-primary"
                      : "border-border"
                  }`}
                >
                  {price.featured ? (
                    <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 font-heading text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                      Miembros
                    </span>
                  ) : null}
                  <h3 className="font-heading text-base font-bold text-primary">
                    {price.name}
                  </h3>
                  <p className="my-5 font-heading text-5xl font-black tracking-[-0.03em] text-primary">
                    {price.price}
                  </p>
                  <p className="mb-8 flex gap-2 text-sm text-text-muted">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                    {price.note}
                  </p>
                  <a
                    href={price.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 font-heading text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      price.featured
                        ? "bg-primary text-white hover:bg-primary-700"
                        : "border border-primary text-primary hover:bg-sky-50"
                    }`}
                  >
                    Pagar con PayPal
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>

            <p className="mt-7 text-sm text-text-faint">
              Las tarifas preferenciales aplican exclusivamente a miembros
              activos de ADPUPR.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function EventDetail({
  icon,
  label,
  children,
}: Readonly<{
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}>) {
  return (
    <div className="flex gap-4 border-b border-border p-6 last:border-b-0 md:border-b-0 md:border-r md:p-7 md:last:border-r-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-primary [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.75]">
        {icon}
      </span>
      <div>
        <p className="mb-1 font-heading text-[11px] font-bold uppercase tracking-[0.12em] text-text-muted">
          {label}
        </p>
        <p className="text-sm font-semibold leading-relaxed text-primary">
          {children}
        </p>
      </div>
    </div>
  )
}
