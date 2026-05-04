export default function About() {
  return (
    <section id="mision" className="bg-bg px-6 py-28 md:py-[112px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-[760px]">
          <p className="eyebrow mb-3.5">Qui&eacute;nes somos</p>
          <h2 className="h-section text-text">
            Una agrupaci&oacute;n al servicio
            <br className="hidden md:block" /> del bien p&uacute;blico.
          </h2>
          <p className="lede mt-5">
            La ADPUPR promueve an&aacute;lisis cr&iacute;ticos y soluciones
            basadas en evidencia para los desaf&iacute;os contempor&aacute;neos
            del servicio p&uacute;blico, desde una &oacute;ptica
            interdisciplinaria.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Misión card — light */}
          <article className="relative overflow-hidden rounded-lg border border-border bg-surface p-9">
            <svg
              className="pointer-events-none absolute -right-5 -top-5 h-[140px] w-[140px] text-primary opacity-[0.07]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <div className="relative">
              <p className="eyebrow mb-3">Misi&oacute;n</p>
              <h3
                className="font-heading text-[28px] font-extrabold text-primary"
                style={{ letterSpacing: "-0.015em", lineHeight: 1.15 }}
              >
                Promover y fortalecer la sana administraci&oacute;n
                p&uacute;blica.
              </h3>
              <p className="mt-4 font-body text-[15.5px] leading-[1.7] text-text-muted">
                Nos comprometemos a impulsar la educaci&oacute;n, la
                investigaci&oacute;n, la innovaci&oacute;n y la
                participaci&oacute;n en la toma de decisiones
                p&uacute;blicas en Puerto Rico.
              </p>
            </div>
          </article>

          {/* Visión card — navy */}
          <article
            className="relative overflow-hidden rounded-lg border p-9 text-white"
            style={{
              background: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            }}
          >
            <svg
              className="pointer-events-none absolute -right-5 -top-5 h-[140px] w-[140px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              style={{ color: "var(--color-sky)", opacity: 0.25 }}
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            </svg>
            <div className="relative">
              <p
                className="eyebrow mb-3"
                style={{ color: "var(--color-sky)" }}
              >
                Visi&oacute;n
              </p>
              <h3
                className="font-heading text-[28px] font-extrabold text-white"
                style={{ letterSpacing: "-0.015em", lineHeight: 1.15 }}
              >
                Ser referente l&iacute;der en una administraci&oacute;n
                p&uacute;blica eficaz y &eacute;tica.
              </h3>
              <p
                className="mt-4 font-body text-[15.5px] leading-[1.7]"
                style={{ color: "var(--color-text-on-dark-muted)" }}
              >
                Aspiramos a ser catalizador de cambios positivos en la toma de
                decisiones, contribuyendo al desarrollo sostenible, la equidad
                y la transparencia en Puerto Rico. Vemos un futuro en el que
                nuestra asociaci&oacute;n sea reconocida por su compromiso con
                la excelencia en la administraci&oacute;n p&uacute;blica y su
                impacto en la sociedad puertorrique&ntilde;a.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
