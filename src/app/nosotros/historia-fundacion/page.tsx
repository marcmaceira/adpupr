import type { Metadata } from "next"
import { DirectorCard, type Director } from "@/components/directors"
import Footer from "@/components/footer"
import Header from "@/components/header"

const ACHIEVEMENTS = [
  "Constituy\u00F3 y organiz\u00F3 la ADPUPR, estableciendo su estructura de gobernanza, reglamentaci\u00F3n y procesos institucionales.",
  "Celebr\u00F3 las primeras conferencias anuales de la Asociaci\u00F3n, sentando las bases del principal espacio de encuentro acad\u00E9mico y profesional de la ADPUPR.",
  "Impuls\u00F3 la presencia institucional de la Asociaci\u00F3n, mediante el desarrollo de la p\u00E1gina web oficial y el lanzamiento del bolet\u00EDn informativo.",
  "Fortaleci\u00F3 la sostenibilidad administrativa y financiera, gestionando el cumplimiento de los requisitos legales, las membres\u00EDas y las obligaciones institucionales.",
  "Promovi\u00F3 el crecimiento organizacional, impulsando nuevos comit\u00E9s de trabajo, publicaciones acad\u00E9micas y proyectos para asegurar la continuidad de la Asociaci\u00F3n.",
] as const

const FOUNDING_BOARD: readonly Director[] = [
  {
    name: "Urayo\u00E1n Jord\u00E1n Salivia",
    role: "Presidente",
    image:
      "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/urayoan-305ea19e-e0e2-4e31-a8dc-6567867b49cd.png",
  },
  {
    name: "Liz. J. Ortiz Laureano",
    role: "Vicepresidenta",
    image:
      "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/liz-68f1ad00-d563-4d6a-b9f6-58e974a11a24.png",
  },
  {
    name: "D\u00E9borah R. Rom\u00E1n Cort\u00E9s",
    role: "Secretaria",
    image:
      "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/debora-60cc4ded-688e-466f-8d5c-2e78b022aa38.png",
  },
  {
    name: "Jonnathan Garc\u00EDa Rosado",
    role: "Director de Tesorer\u00EDa",
    image:
      "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/jonnathan-6aca08c9-7520-41d2-800c-fa3e435093c0.png",
  },
  {
    name: "Rosalie Ayala Col\u00F3n",
    role: "Directora de Relaciones P\u00FAblicas",
    image:
      "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/rosalie-6bc1df39-30e0-4c76-bd31-ab4570bad221.png",
  },
  {
    name: "Alexis G\u00F3mez Rivera",
    role: "Vocal",
    image:
      "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/alexis-f9f50ad9-3b17-4fe9-b85c-4cb1cd7111ab.png",
  },
  {
    name: "Jonuel Negr\u00F3n",
    role: "Vocal",
    image:
      "https://2yohsk2xwqevfocw.public.blob.vercel-storage.com/jonuel-negron-12649ace-f27c-4fab-af6a-a5cc253c78fd.png",
  },
] as const

const MILESTONES = [
  { value: "2023", label: "A\u00F1o de fundaci\u00F3n" },
  { value: "2", label: "Conferencias organizadas" },
  { value: "1", label: "Bolet\u00EDn institucional creado" },
  { value: "7", label: "Miembros de la Junta Fundadora" },
] as const

export const metadata: Metadata = {
  title: "Historia de Fundaci\u00F3n",
  description:
    "Conoce la gesti\u00F3n, la Junta Fundadora y los principales hitos que dieron origen a la Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico.",
  openGraph: {
    title: "Historia de Fundaci\u00F3n | ADPUPR",
    description:
      "Conoce la gesti\u00F3n, la Junta Fundadora y los principales hitos que dieron origen a la Asociaci\u00F3n de Administraci\u00F3n P\u00FAblica de Puerto Rico.",
    url: "/nosotros/historia-fundacion",
  },
}

export default function HistoriaFundacionPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden bg-primary px-6 py-20 text-white md:py-28">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-28 h-96 w-96 rounded-full border border-sky/30"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 right-[18%] h-72 w-72 rounded-full bg-sky/10"
          />
          <div className="relative mx-auto max-w-[1200px]">
            <p className="eyebrow eyebrow-on-dark mb-4">Nuestra historia</p>
            <h1 className="max-w-[900px] font-heading text-[clamp(44px,7vw,82px)] font-black leading-[0.96] tracking-[-0.035em] text-white">
              Historia de Fundaci&oacute;n
            </h1>
            <p className="mt-7 max-w-[760px] font-body text-lg leading-[1.75] text-text-on-dark-muted md:text-xl">
              Durante el per&iacute;odo 2023&ndash;2025, la Junta Fundadora
              estableci&oacute; las bases institucionales que dieron origen y
              proyecci&oacute;n a la Asociaci&oacute;n de Administraci&oacute;n
              P&uacute;blica de Puerto Rico.
            </p>
          </div>
        </section>

        <section className="bg-surface-2 px-6 py-20 md:py-28">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 max-w-[700px]">
              <p className="eyebrow mb-3.5">Liderazgo inaugural</p>
              <h2 className="h-section text-text">Junta Fundadora</h2>
              <p className="lede mt-5">
                Siete profesionales asumieron la responsabilidad de convertir
                una visi&oacute;n compartida en una instituci&oacute;n con bases
                firmes.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {FOUNDING_BOARD.map((member, index) => (
                <DirectorCard
                  key={member.name}
                  director={member}
                  seed={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-primary px-6 py-20 text-white md:py-24">
          <div
            aria-hidden="true"
            className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-2 border-mustard/30"
          />
          <div className="relative mx-auto max-w-[1200px]">
            <div className="mb-12 border-b border-white/20 pb-8">
              <p className="eyebrow eyebrow-on-dark mb-3.5">Legado institucional</p>
              <h2 className="h-section text-white">Hitos de la Gesti&oacute;n Fundadora</h2>
            </div>

            <dl className="grid gap-px overflow-hidden rounded-lg bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
              {MILESTONES.map((milestone) => (
                <div key={milestone.label} className="bg-primary-700 p-7 md:p-8">
                  <dt className="font-body text-sm leading-snug text-text-on-dark-muted">
                    {milestone.label}
                  </dt>
                  <dd className="mt-4 font-heading text-5xl font-black tracking-[-0.04em] text-mustard md:text-6xl">
                    {milestone.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-bg px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-20">
            <div>
              <p className="eyebrow mb-3.5">2023&ndash;2025</p>
              <h2 className="h-section text-text">La gesti&oacute;n fundadora</h2>
              <div className="mt-8 h-1 w-16 bg-mustard" aria-hidden="true" />
            </div>

            <ol className="border-t border-border-strong">
              {ACHIEVEMENTS.map((achievement, index) => (
                <li
                  key={achievement}
                  className="grid gap-3 border-b border-border-strong py-7 sm:grid-cols-[58px_minmax(0,1fr)] sm:gap-6 md:py-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-heading text-2xl font-black text-primary-300"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[820px] font-body text-base leading-[1.75] text-text-muted md:text-[17px]">
                    {achievement}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
