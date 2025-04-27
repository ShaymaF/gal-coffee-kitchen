import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GalleryHero } from "@/components/gallery/gallery-hero"
import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { BookTableButton } from "@/components/book-table-button"
import { TopButton } from "@/components/top-button"

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-gal-dark">
      <Header />
      <GalleryHero />
      <GalleryGrid />
      <Footer />
      <TopButton />
    </main>
  )
}
