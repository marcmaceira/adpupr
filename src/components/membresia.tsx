import { ArrowRight, Check } from "lucide-react"

const MEMBERSHIP_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSed-nAU7aA8_D4DQ7HjD0byLe3B8b_0zY0WEL-Riy1nKgbVbg/viewform"

const ATH_MOVIL_URL =
  "https://pagos.athmovilapp.com/qrCodePayment.html?133d0fe53fe0aee5f76f045eeebc2197e51d7aec08444832522d3dda729305c0"

const BENEFITS = [
  "Acceder y participar en foros, talleres, conferencias y conversatorios a costos exclusivos, con pre-reservaciones.",
  "Unirte a los equipos de los comit\u00E9s de trabajo de tu inter\u00E9s.",
  "Formar parte de una red profesional con acad\u00E9micos, investigadores, estudiantes y profesionales del servicio p\u00FAblico.",
  "Contribuir al an\u00E1lisis, la investigaci\u00F3n y el debate p\u00FAblico informado en Puerto Rico.",
  "Tener voz y voto en las Asambleas de ADPUPR.",
  "Fortalecer tu desarrollo profesional y ampliar tus oportunidades de aprendizaje y colaboraci\u00F3n.",
] as const

const PAYPAL_OPTIONS = [
  {
    name: `Membres\u00EDa regular`,
    price: "$50",
    href: "https://www.paypal.com/ncp/payment/K3YBF8EGL7CDA",
  },
  {
    name: `Membres\u00EDa de estudiante`,
    price: "$25",
    href: "https://www.paypal.com/ncp/payment/MESA9TVUCWGL6",
  },
] as const

const externalLinkClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 font-heading text-sm font-bold text-white transition-colors hover:bg-primary-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"

export default function Membresia() {
  return (
    <section id="membresia" className="bg-surface-2 px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="border-b border-border pb-16 lg:py-20">
          <p className="eyebrow mb-3.5">Beneficios de la membres&iacute;a</p>
          <h2 className="h-section text-text">Lo que incluye tu membres&iacute;a.</h2>

          <ul className="mt-9">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="grid grid-cols-[28px_1fr] items-start gap-4 border-b border-border py-4 font-body text-[15px] leading-[1.65] text-text last:border-b-0 sm:grid-cols-[32px_1fr] sm:gap-5 sm:text-[17px]"
              >
                <span
                  className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-mustard text-primary sm:h-8 sm:w-8"
                  aria-hidden="true"
                >
                  <Check size={17} strokeWidth={3} />
                </span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-12 pt-16 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20 lg:pt-20">
          <div>
            <p className="eyebrow mb-3.5">Paso 1 &middot; Pre-registro</p>
            <h2 className="font-heading text-[30px] font-black leading-[1.1] tracking-[-0.02em] text-text sm:text-[36px]">
              Completa el formulario de membres&iacute;a.
            </h2>
            <p className="mt-5 max-w-[48ch] font-body text-[16px] leading-[1.7] text-text-muted">
              Si solicitas ingreso por primera vez, completa el formulario para
              quedar prerregistrado como integrante de la ADPUPR. El formulario
              y el pago son procesos separados.
            </p>
            <a
              href={MEMBERSHIP_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${externalLinkClasses} mt-7`}
            >
              Completar formulario de membres&iacute;a
              <ArrowRight size={14} strokeWidth={3} aria-hidden="true" />
            </a>

            <div className="mt-8 border-l-4 border-mustard bg-mustard-200 p-5">
              <p className="font-heading text-sm font-bold text-primary">
                Confirmaci&oacute;n de membres&iacute;a
              </p>
              <p className="mt-1.5 font-body text-sm leading-[1.6] text-text-muted">
                La membres&iacute;a se activa una vez que la ADPUPR verifica y
                aprueba el pago.
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-3.5">Paso 2 &middot; Pago</p>
            <h2 className="font-heading text-[30px] font-black leading-[1.1] tracking-[-0.02em] text-text sm:text-[36px]">
              Selecciona un m&eacute;todo de pago.
            </h2>

            <div className="mt-7 space-y-4">
              <article className="card p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-primary">
                      ATH M&oacute;vil
                    </h3>
                    <p className="mt-1 font-body text-sm text-text-muted">
                      Paga por negocio a <strong>ADPUPR</strong>.
                    </p>
                  </div>
                  <a
                    href={ATH_MOVIL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={externalLinkClasses}
                  >
                    Pagar con ATH M&oacute;vil
                    <ArrowRight size={14} strokeWidth={3} aria-hidden="true" />
                  </a>
                </div>
              </article>

              <article className="card p-6 sm:p-7">
                <h3 className="font-heading text-xl font-extrabold text-primary">
                  PayPal
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {PAYPAL_OPTIONS.map((option) => (
                    <a
                      key={option.name}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-16 items-center justify-between gap-4 rounded-sm border border-primary px-4 py-3 font-heading text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      <span>{option.name}</span>
                      <span className="whitespace-nowrap">{option.price}</span>
                    </a>
                  ))}
                </div>
              </article>

              <article className="card p-6 sm:p-7">
                <h3 className="font-heading text-xl font-extrabold text-primary">
                  Cheque o giro
                </h3>
                <p className="mt-2 font-body text-sm leading-[1.65] text-text-muted">
                  Emite el cheque o giro a nombre de la &ldquo;Asociaci&oacute;n de
                  Administraci&oacute;n P&uacute;blica de Puerto Rico&rdquo; y env&iacute;alo por
                  correo postal a:
                </p>
                <address className="mt-4 border-l-2 border-sky pl-4 font-body text-sm not-italic leading-[1.6] text-text">
                  PO BOX 1269
                  <br />
                  Trujillo Alto, PR 00977
                </address>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
