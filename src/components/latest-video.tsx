import { ExternalLink } from "lucide-react"

const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@ADPUPR"
const LATEST_VIDEO_ID = "jhXQO0PB0PY"

export default function LatestVideo() {
  return (
    <section className="bg-surface px-6 py-24 md:py-[112px]">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-3.5">Desde nuestro canal</p>
          <h2 className="h-section max-w-[12ch] text-text">
            Conversaciones sobre el servicio p&uacute;blico.
          </h2>
          <p className="mt-5 max-w-[46ch] font-body text-[17px] leading-[1.65] text-text-muted">
            Mira el video m&aacute;s reciente de la ADPUPR y visita nuestro canal
            para conocer m&aacute;s di&aacute;logos, entrevistas y actividades.
          </p>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-sm border border-primary px-5 py-3 font-heading text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Visitar canal de YouTube
            <ExternalLink className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-primary shadow-[var(--shadow-card)]">
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube-nocookie.com/embed/${LATEST_VIDEO_ID}`}
            title="Video m&aacute;s reciente de la ADPUPR en YouTube"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
