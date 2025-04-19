import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutStory } from "@/components/about/about-story"
import { AboutValues } from "@/components/about/about-values"
import { AboutTeam } from "@/components/about/about-team"
import { AboutTestimonials } from "@/components/about/about-testimonials"
import { BookTableButton } from "@/components/book-table-button"
import { TopButton } from "@/components/top-button"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gal-dark">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      {/* <AboutTeam /> */}
      <AboutTestimonials />
      <Footer />
      <BookTableButton />
      <TopButton />
    </main>
  )
}
