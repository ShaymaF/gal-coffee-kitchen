import Image from "next/image"

export function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gal-green overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/menu2-img7.jpg"
          alt="GAL Coffee & Kitchen Contact"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-light text-gal-beige tracking-wider mb-6">CONTACT US</h1>
        <div className="w-24 h-1 bg-gal-beige/30 mx-auto mb-8"></div>
        <p className="text-gal-beige/80 max-w-2xl mx-auto text-lg">
          We'd love to hear from you. Reach out for reservations, inquiries, or to provide feedback on your experience.
        </p>
      </div>
    </section>
  )
}
