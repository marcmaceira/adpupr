import Header from "@/components/header"
import Hero from "@/components/hero"
import Stats from "@/components/stats"
import About from "@/components/about"
import Committees from "@/components/committees"
import Directors from "@/components/directors"
import Newsletters from "@/components/newsletters"
import ConferenceCta from "@/components/conference-cta"
import CtaBand from "@/components/cta-band"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <ConferenceCta />
        <Committees />
        <Directors />
        <Newsletters />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
