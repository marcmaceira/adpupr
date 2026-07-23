import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Subhead from "@/components/subhead"
import Membresia from "@/components/membresia"
import MembershipPlan from "@/components/membership-plan"

export const metadata: Metadata = {
  title: "Membresía",
  description:
    "Únete a la ADPUPR. Accede a beneficios exclusivos, eventos, formación y una red de profesionales comprometidos con el servicio público en Puerto Rico.",
  openGraph: {
    title: "Membresía | ADPUPR",
    description:
      "Únete a la ADPUPR. Beneficios, tarifas y métodos de pago para integrantes regulares y estudiantes.",
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
