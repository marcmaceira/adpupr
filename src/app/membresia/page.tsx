import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Subhead from "@/components/subhead"
import Membresia from "@/components/membresia"

export const metadata: Metadata = {
  title: "Membresía | ADPUPR",
  description:
    "Únete a la ADPUPR. Beneficios, tarifas y métodos de pago para integrantes regulares y estudiantes.",
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
      </main>
      <Footer />
    </>
  )
}
