import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { BookTableButton } from "@/components/book-table-button"
import { TopButton } from "@/components/top-button"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gal-dark">
      <Header />
      <ContactHero />
      <ContactForm />
      <Footer />
      <TopButton />
    </main>
  )
}
