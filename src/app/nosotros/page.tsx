import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Subhead from "@/components/subhead"
import About from "@/components/about"
import Objectives from "@/components/objectives"
import Committees from "@/components/committees"
import Directors from "@/components/directors"
import CtaBand from "@/components/cta-band"

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Misión, visión, objetivos, comités de trabajo y junta de directores de la Asociación de Administración Pública de Puerto Rico.",
  openGraph: {
    title: "Nosotros | ADPUPR",
    description:
      "Misión, visión, objetivos, comités de trabajo y junta de directores de la Asociación de Administración Pública de Puerto Rico.",
    url: "/nosotros",
  },
}

export default function NosotrosPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Subhead
          eyebrow="Quiénes somos"
          title="Una agrupación al servicio del bien público."
          description="La ADPUPR promueve análisis críticos y soluciones basadas en evidencia para los desafíos contemporáneos del servicio público, desde una óptica interdisciplinaria."
        />
        <About />
        <Objectives />
        <Committees />
        <Directors variant="full" />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
