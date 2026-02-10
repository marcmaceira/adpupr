import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Objectives from "@/components/objectives"
import Committees from "@/components/committees"
import ConferenceCta from "@/components/conference-cta"
import Newsletters from "@/components/newsletters"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Objectives />
        <Committees />
        <ConferenceCta />
        <Newsletters />
      </main>
      <Footer />
    </>
  )
}
