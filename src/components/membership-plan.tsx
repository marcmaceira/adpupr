interface SponsorshipLevel {
  readonly name: string
  readonly price: string
  readonly benefits: readonly string[]
}

const SPONSORSHIP_LEVELS: readonly SponsorshipLevel[] = [
  {
    name: "Bronce",
    price: "$250",
    benefits: [
      "Logo en la p\u00E1gina web del congreso",
      "Una publicaci\u00F3n en redes sociales",
      "Agradecimiento durante la apertura",
    ],
  },
  {
    name: "Plata",
    price: "$500",
    benefits: [
      "Todo lo incluido en Bronce",
      "Logo en banners y programa impreso",
      "Tres publicaciones en redes sociales",
      "Dos boletos con 25% de descuento al congreso",
    ],
  },
  {
    name: "Oro",
    price: "$1,000",
    benefits: [
      "Todo lo incluido en Plata",
      "Logo prominente en materiales impresos y digitales",
      "Diez minutos para presentar la organizaci\u00F3n en el congreso",
      "Cuatro boletos con 30% de descuento",
      "Espacio de exhibici\u00F3n",
    ],
  },
  {
    name: "Platino",
    price: "$2,500",
    benefits: [
      "Todo lo incluido en Oro",
      "Logo en todos los banners y en el fondo de la pantalla principal",
      "Quince minutos de presentaci\u00F3n en sesi\u00F3n plenaria",
      "Cuatro boletos con 40% de descuento",
      "Espacio de exhibici\u00F3n",
      "Menci\u00F3n en comunicados de prensa",
    ],
  },
] as const

export default function MembershipPlan() {
  return (
    <section className="bg-surface px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 border-b border-border pb-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:pb-20">
          <div>
            <p className="eyebrow mb-3.5">Una comunidad que aporta</p>
            <h2 className="h-section max-w-[12ch] text-text">
              Crecer y servir, en comunidad.
            </h2>
          </div>
          <div className="space-y-5 font-body text-[16px] leading-[1.75] text-text-muted md:text-[17px]">
            <p>
              Pertenecer a la Asociaci&oacute;n de Administraci&oacute;n
              P&uacute;blica de Puerto Rico (ADPUPR) brinda la oportunidad de
              integrarse a una red de profesionales, acad&eacute;micos,
              estudiantes y personas interesadas en fortalecer la
              administraci&oacute;n y el servicio p&uacute;blico puertorrique&ntilde;o.
              Esta comunidad facilita el intercambio de conocimientos y
              experiencias entre personas que se desempe&ntilde;an en el gobierno,
              la academia, organizaciones comunitarias y otros sectores
              relacionados con la gesti&oacute;n p&uacute;blica.
            </p>
            <p>
              Nuestra membres&iacute;a tambi&eacute;n promueve el desarrollo
              profesional mediante talleres, conferencias, conversatorios,
              publicaciones y otras actividades educativas sobre temas
              pertinentes para la administraci&oacute;n p&uacute;blica
              puertorrique&ntilde;a. Asimismo, sus miembros pueden beneficiarse de
              tarifas preferenciales en determinadas actividades, mantenerse
              informados sobre iniciativas de la Asociaci&oacute;n y ampliar su
              red de contactos profesionales.
            </p>
            <p>
              Adem&aacute;s, la ADPUPR ofrece espacios para participar en
              comit&eacute;s de trabajo, asambleas y proyectos institucionales,
              permitiendo que sus integrantes aporten sus conocimientos,
              desarrollen destrezas de liderazgo y colaboren en el
              an&aacute;lisis de los asuntos p&uacute;blicos. Ser parte de la
              Asociaci&oacute;n no solo representa una oportunidad de crecimiento
              profesional, sino tambi&eacute;n una forma de contribuir al
              desarrollo de una administraci&oacute;n p&uacute;blica m&aacute;s
              &eacute;tica, eficiente, transparente y comprometida con las
              necesidades de Puerto Rico.
            </p>
          </div>
        </div>

        <div className="mt-16 overflow-hidden rounded-lg bg-primary px-6 py-10 sm:px-10 lg:mt-20 lg:px-12 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14">
            <div>
              <p className="eyebrow eyebrow-on-dark mb-3.5">Apoya nuestra misi&oacute;n</p>
              <h2 className="font-heading text-[32px] font-black leading-[1.08] tracking-[-0.02em] text-white sm:text-[40px]">
                Niveles de patrocinio.
              </h2>
              <p className="mt-5 max-w-[34ch] font-body text-[15px] leading-[1.65] text-text-on-dark-muted">
                Vincula tu organizaci&oacute;n con una comunidad comprometida con
                el fortalecimiento de la administraci&oacute;n p&uacute;blica en
                Puerto Rico.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-md bg-white/15 sm:grid-cols-2">
              {SPONSORSHIP_LEVELS.map((level, index) => (
                <article
                  key={level.name}
                  className={`bg-primary-700 p-6 sm:p-7 ${index === 3 ? "sm:bg-primary-900" : ""}`}
                >
                  <div className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-4">
                    <h3 className="font-heading text-xl font-extrabold text-white">
                      {level.name}
                    </h3>
                    <p className="font-heading text-xl font-black text-mustard">
                      {level.price}
                    </p>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {level.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="grid grid-cols-[8px_1fr] gap-3 font-body text-[13px] leading-[1.55] text-text-on-dark-muted"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
