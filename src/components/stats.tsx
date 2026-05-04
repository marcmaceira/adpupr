interface Stat {
  readonly num: string
  readonly suffix?: string
  readonly label: string
}

const STATS: readonly Stat[] = [
  { num: "3", suffix: "años", label: "Trayectoria institucional" },
  { num: "100", suffix: "+", label: "Miembros activos" },
  { num: "4", label: "Comités de trabajo" },
] as const

export default function Stats() {
  return (
    <section className="border-y border-border bg-sky-50 px-6 py-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <div
              className="flex items-baseline gap-1 font-heading font-black text-primary"
              style={{
                fontSize: "clamp(48px, 6vw, 68px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              <span>{stat.num}</span>
              {stat.suffix && (
                <span
                  className="text-mustard-600"
                  style={{ fontSize: "0.55em" }}
                >
                  {stat.suffix}
                </span>
              )}
            </div>
            <div
              className="mt-2.5 font-heading text-[13px] font-semibold uppercase"
              style={{
                color: "var(--color-primary-300)",
                letterSpacing: "0.1em",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
