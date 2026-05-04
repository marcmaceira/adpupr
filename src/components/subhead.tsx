interface SubheadProps {
  readonly eyebrow: string
  readonly title: string
  readonly description?: string
}

export default function Subhead({ eyebrow, title, description }: SubheadProps) {
  return (
    <section
      className="relative overflow-hidden px-6 pb-20 pt-24"
      style={{ background: "var(--color-primary)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[80px] -right-[80px] h-[240px] w-[240px] rounded-full border-2"
        style={{ borderColor: "rgba(255, 210, 88, 0.4)" }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        <span
          className="eyebrow block"
          style={{ color: "var(--color-sky)", marginBottom: 14 }}
        >
          {eyebrow}
        </span>
        <h1
          className="font-heading font-black text-white"
          style={{
            fontSize: "clamp(40px, 5.5vw, 64px)",
            letterSpacing: "-0.025em",
            lineHeight: 1,
            maxWidth: "18ch",
            marginBottom: description ? 20 : 0,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="font-body"
            style={{
              fontSize: 18,
              color: "var(--color-text-on-dark-muted)",
              maxWidth: "60ch",
              lineHeight: 1.55,
            }}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
