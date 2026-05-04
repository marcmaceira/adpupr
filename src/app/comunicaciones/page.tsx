import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Subhead from "@/components/subhead"
import BoletinesList from "@/components/boletines-list"

export const metadata: Metadata = {
  title: "Comunicaciones | ADPUPR",
  description:
    "Boletines temáticos, comunicados institucionales y posicionamientos sobre administración pública en Puerto Rico.",
}

export default function ComunicacionesPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Subhead
          eyebrow="Comunicaciones"
          title="Boletines y publicaciones."
          description="La ADPUPR publica boletines temáticos, comunicados institucionales y posicionamientos sobre temas de administración pública en Puerto Rico."
        />
        <BoletinesList />
      </main>
      <Footer />
    </>
  )
}
