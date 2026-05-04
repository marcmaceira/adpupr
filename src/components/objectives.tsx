const OBJETIVOS = [
  "Agrupar a personas interesadas en promover los valores de una sana Administración Pública en Puerto Rico.",
  "Promover la educación, la difusión del conocimiento y el estudio de la disciplina mediante cursos, foros, conferencias y conversatorios.",
  "Establecer redes y conexiones de comunicación entre integrantes de la Asociación.",
  "Tener una participación colectiva activa en los asuntos públicos y en la gobernanza de Puerto Rico.",
  "Cualquier otro objetivo establecido por la Asamblea de Integrantes.",
] as const

export default function Objectives() {
  return (
    <section
      id="objetivos"
      className="px-6 py-28 md:py-[112px]"
      style={{ background: "var(--color-surface-2)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 max-w-[760px]">
          <p className="eyebrow mb-3.5">Objetivos</p>
          <h2 className="h-section text-text">
            Cinco compromisos institucionales.
          </h2>
        </div>

        <div
          className="grid grid-cols-1 overflow-hidden rounded-lg border border-border md:grid-cols-2"
          style={{
            background: "var(--color-border)",
            gap: "1px",
          }}
        >
          {OBJETIVOS.map((text, i) => {
            const isLast = i === OBJETIVOS.length - 1
            return (
              <div
                key={text}
                className={`grid items-start gap-6 bg-white p-9 transition-colors hover:bg-sky-50 ${
                  isLast ? "md:col-span-2" : ""
                }`}
                style={{ gridTemplateColumns: "64px 1fr" }}
              >
                <div
                  className="font-heading font-black text-mustard"
                  style={{
                    fontSize: 40,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="font-body text-[15.5px] leading-[1.6] text-text">
                  {text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
