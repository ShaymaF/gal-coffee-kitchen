import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Menu } from "@/components/menu-preview"
import { Testimonials } from "@/components/testimonials"
import { Gallery } from "@/components/gallery"
import { Contact } from "@/components/contact"
import { ConnectWithUs } from "@/components/connect-with-us"
import { Footer } from "@/components/footer"
import { BookTableButton } from "@/components/book-table-button"
import { TopButton } from "@/components/top-button"
export default function Home() {
  return (
    <main className="min-h-screen bg-gal-dark">
      <Header />
      <Hero />
      <About />
      <Menu />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
      <BookTableButton />
      <TopButton />
    </main>
  )
}
