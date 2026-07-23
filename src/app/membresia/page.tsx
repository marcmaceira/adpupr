import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Subhead from "@/components/subhead"
import Membresia from "@/components/membresia"
import MembershipPlan from "@/components/membership-plan"

export const metadata: Metadata = {
  title: "Membres\u00EDa",
  description:
    "Conoce las tarifas, completa el formulario y selecciona tu m\u00E9todo de pago para solicitar membres\u00EDa en la ADPUPR.",
  openGraph: {
    title: "Membres\u00EDa | ADPUPR",
    description:
      "Tarifas, formulario y m\u00E9todos de pago para integrantes regulares y estudiantes de la ADPUPR.",
    url: "/membresia",
  },
}

export default function MembresiaPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Subhead
          eyebrow="Únete a la Asociación"
          title="De la opinión a la acción."
          description="Ser miembro de ADPUPR te conecta con personas comprometidas con una administración pública ética, moderna y basada en datos."
        />
        <Membresia />
        <MembershipPlan />
      </main>
      <Footer />
    </>
  )
}
