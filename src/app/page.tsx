import Header from "@/components/header"
import Hero from "@/components/hero"
import Stats from "@/components/stats"
import About from "@/components/about"
import ConferenceCta from "@/components/conference-cta"
import LatestVideo from "@/components/latest-video"
import EngagementCtas from "@/components/engagement-ctas"
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
        <LatestVideo />
        <EngagementCtas />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
