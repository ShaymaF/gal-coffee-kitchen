import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenuHero } from "@/components/menu/menu-hero"
import { MenuCategories } from "@/components/menu/menu-categories"
import { BookTableButton } from "@/components/book-table-button"
import { TopButton } from "@/components/top-button"

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-gal-dark">
      <Header />
      <MenuHero />
      <MenuCategories />
      <Footer />
      <BookTableButton />
      <TopButton />
    </main>
  )
}
