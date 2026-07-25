import type { Metadata } from "next"
import { ExternalLink, Mail, MapPin } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Subhead from "@/components/subhead"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Cont\u00E1ctanos",
  description:
    "Conversa con la ADPUPR para colaborar, establecer alianzas, participar en eventos o conocer m\u00E1s sobre nuestro trabajo.",
  openGraph: {
    title: "Cont\u00E1ctanos | ADPUPR",
    description:
      "Escr\u00EDbenos y conoce los canales oficiales de la Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico.",
    url: "/contactanos",
  },
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    handle: "@adpupr",
    href: "https://www.instagram.com/adpupr?igsh=ZThoeDRncGYxcGhp",
  },
  {
    label: "Facebook",
    handle: "ADPUPR",
    href: "https://www.facebook.com/share/1Ec3PWb5LC/?mibextid=wwXIfr",
  },
  {
    label: "LinkedIn",
    handle: "Asociaci\u00F3n ADPUPR",
    href: "https://www.linkedin.com/in/asociaci%C3%B3n-de-administraci%C3%B3n-p%C3%BAblica-de-puerto-rico-adpupr-7b7290316?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    label: "YouTube",
    handle: "@adpupr",
    href: "https://youtube.com/@adpupr?si=4aX7X-C7n9VSTPbY",
  },
] as const

export default function ContactanosPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Subhead
          eyebrow="Contacto"
          title={"Las mejores iniciativas nacen de la colaboraci\u00F3n."}
          description={"Cada conversaci\u00F3n puede abrir una nueva manera de aportar a una administraci\u00F3n p\u00FAblica m\u00E1s efectiva, \u00E9tica e innovadora."}
        />

        <section className="section bg-bg px-6">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-20">
            <div>
              <span className="eyebrow mb-4 block">Conversemos</span>
              <h2 className="h-section max-w-[16ch] text-text">
                Tu inter&eacute;s tambi&eacute;n impulsa el servicio p&uacute;blico.
              </h2>
              <div className="mt-7 max-w-[66ch] space-y-5 font-body text-[17px] leading-relaxed text-text-muted">
                <p>
                  En la ADPUPR valoramos cada conversaci&oacute;n, cada idea y cada
                  persona interesada en aportar al desarrollo de una
                  administraci&oacute;n p&uacute;blica m&aacute;s efectiva, &eacute;tica e
                  innovadora.
                </p>
                <p>
                  Ya sea que quieras unirte a nuestras iniciativas, establecer
                  una alianza, participar en nuestros eventos o simplemente
                  conocer m&aacute;s sobre nuestro trabajo, estamos disponibles para
                  todo aquel que quiera sumar a la administraci&oacute;n p&uacute;blica
                  desde cualquier sector. Escr&iacute;benos o s&iacute;guenos en nuestras
                  redes sociales para mantenernos en contacto.
                </p>
              </div>

              <div className="mt-12">
                <ContactForm />
              </div>
            </div>

            <aside className="lg:border-l lg:border-border lg:pl-10" aria-label="Canales de contacto">
              <div className="lg:sticky lg:top-28">
                <span className="eyebrow mb-5 block">Canales directos</span>

                <div className="border-y border-border py-6">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-sky-50 text-primary">
                      <Mail className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-sm font-bold text-text">
                        Correo electr&oacute;nico
                      </h3>
                      <div className="mt-2 space-y-1 font-body text-sm">
                        <a className="block text-text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary" href="mailto:info@adpupr.com">
                          info@adpupr.com
                        </a>
                        <a className="block break-all text-text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary" href="mailto:asociacion.adpupr@gmail.com">
                          asociacion.adpupr@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-border py-6">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-sky-50 text-primary">
                      <MapPin className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-heading text-sm font-bold text-text">
                        Direcci&oacute;n postal
                      </h3>
                      <address className="mt-2 font-body text-sm not-italic leading-relaxed text-text-muted">
                        PO BOX 1269<br />
                        Trujillo Alto, PR 00977
                      </address>
                    </div>
                  </div>
                </div>

                <div className="pt-9">
                  <h3 className="font-heading text-lg font-extrabold text-text">
                    S&iacute;guenos
                  </h3>
                  <ul className="mt-4 divide-y divide-border border-y border-border">
                    {SOCIAL_LINKS.map((social) => (
                      <li key={social.label}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          <span>
                            <span className="block font-heading text-sm font-bold text-text transition-colors group-hover:text-primary">
                              {social.label}
                            </span>
                            <span className="mt-0.5 block font-body text-xs text-text-muted">
                              {social.handle}
                            </span>
                          </span>
                          <ExternalLink className="h-4 w-4 shrink-0 text-primary-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.7} aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
