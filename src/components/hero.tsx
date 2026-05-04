import Link from "next/link"

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-primary px-6 pb-32 pt-24 text-white sm:pb-36 lg:pt-32"
    >
      {/* Concentric ring ornaments — top right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[200px] -top-[180px] h-[560px] w-[560px] rounded-full border-2"
        style={{ borderColor: "rgba(117, 189, 240, 0.35)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[100px] -top-[80px] h-[360px] w-[360px] rounded-full border-2"
        style={{ borderColor: "rgba(255, 210, 88, 0.55)" }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <p className="eyebrow eyebrow-on-dark">
          Asociaci&oacute;n de Administraci&oacute;n P&uacute;blica de Puerto Rico
        </p>

        <h1
          className="mt-4 max-w-[14ch] text-white"
          style={{
            fontFamily:
              "var(--font-be-vietnam-pro), 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(48px, 6.5vw, 84px)",
            lineHeight: 0.98,
            letterSpacing: "-0.025em",
          }}
        >
          De la opini&oacute;n
          <br />a la <em className="not-italic text-mustard">acci&oacute;n</em>.
        </h1>

        <p
          className="mt-6 max-w-[56ch] font-body text-[19px] leading-[1.55]"
          style={{ color: "var(--color-text-on-dark-muted)" }}
        >
          ADPUPR convoca a profesionales, acad&eacute;micos y estudiantes en
          torno al estudio, la pr&aacute;ctica y la mejora continua de la
          administraci&oacute;n p&uacute;blica en Puerto Rico.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href="/membresia"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-mustard px-6 py-3.5 font-heading text-[15px] font-semibold text-primary transition-colors hover:bg-mustard-600"
          >
            Hacerme miembro <span aria-hidden="true">&rarr;</span>
          </Link>
          <Link
            href="/nosotros"
            className="inline-flex items-center justify-center rounded-sm border border-white/70 px-6 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-primary"
          >
            Conocer la Asociaci&oacute;n
          </Link>
        </div>
      </div>
    </section>
  )
}
