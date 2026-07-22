import Link from "next/link"

interface CtaBandProps {
  readonly id?: string
  readonly eyebrow?: string
}

export default function CtaBand({ id, eyebrow }: CtaBandProps) {
  return (
    <section id={id} className="relative overflow-hidden bg-mustard">
      <div className="container relative mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-12 py-20 md:grid-cols-[1.5fr_auto] md:gap-12 md:py-[72px]">
          <div>
            {eyebrow ? (
              <p
                className="eyebrow mb-3"
                style={{ color: "var(--color-primary-700)" }}
              >
                {eyebrow}
              </p>
            ) : null}
            <h2
              className="font-heading font-black text-primary"
              style={{
                fontSize: "clamp(28px, 3.4vw, 40px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                maxWidth: "24ch",
              }}
            >
              &Uacute;nete a la conversaci&oacute;n que da forma al servicio
              p&uacute;blico en Puerto Rico.
            </h2>
            <p
              className="mt-3.5 max-w-[50ch] font-body text-base"
              style={{ color: "var(--color-primary-700)" }}
            >
              $50 integrantes regulares &middot; $25 estudiantes. Voz y voto en
              Asambleas y acceso a foros, talleres y conferencias.
            </p>
          </div>
          <Link
            href="/membresia"
            className="inline-flex items-center gap-2 self-start rounded-sm bg-primary px-6 py-3.5 font-heading text-[15px] font-semibold text-white transition-colors hover:bg-primary-700 md:self-auto"
          >
            Solicitar membres&iacute;a <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
