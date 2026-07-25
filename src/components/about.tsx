import Link from "next/link"

export default function About() {
  return (
    <section id="nosotros" className="bg-bg px-6 py-24 md:py-[112px]">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <div>
          <p className="eyebrow mb-3.5">Qui&eacute;nes somos</p>
          <h2 className="h-section max-w-[15ch] text-text">
            Una comunidad que convierte conocimiento en acci&oacute;n.
          </h2>
        </div>

        <div className="border-l-4 border-mustard pl-6 sm:pl-8">
          <p className="font-body text-[18px] leading-[1.7] text-text-muted">
            La ADPUPR re&uacute;ne a profesionales, acad&eacute;micos y estudiantes
            para analizar los retos del servicio p&uacute;blico, compartir
            conocimiento y promover soluciones que fortalezcan la
            administraci&oacute;n p&uacute;blica en Puerto Rico.
          </p>
          <Link
            href="/nosotros/quienes-somos"
            className="mt-7 inline-flex items-center gap-2 font-heading text-sm font-bold text-primary underline decoration-sky-200 decoration-2 underline-offset-4 transition-colors hover:text-primary-700"
          >
            Conoce nuestra trayectoria <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
