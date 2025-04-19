import Image from "next/image"

export function AboutStory() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            <div className="aspect-[4/5] relative">
              <Image
                src="/images/p1-img1.jpg"
                alt="GAL Coffee & Kitchen Story"
                fill
                className="object-cover rounded-tl-[50%]"
              />
            </div>
            <div className="absolute -bottom-6 -right-10 w-48 h-48">
              <Image
                src="/logo-beige.jpg"
                alt="GAL Coffee & Kitchen Story"
                fill
                className="object-cover rounded-full"
              />
             
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-gal-green mb-6 tracking-wide">OUR STORY</h2>
            <div className="w-16 h-1 bg-gal-green/20 mb-8"></div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              GAL Coffee & Kitchen was founded in 2018 with a vision to redefine the coffee and dining experience. What
              began as a passion project by a group of culinary enthusiasts and coffee connoisseurs has evolved into a
              distinguished establishment known for its commitment to excellence.
            </p>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Our journey started with a simple belief: that exceptional coffee and food should be served in an
              environment that elevates the entire experience. We sought to create a space where every detail, from the
              sourcing of ingredients to the ambiance of our establishment, reflects our dedication to quality and
              sophistication.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Today, GAL stands as a testament to that vision, offering an exquisite blend of culinary artistry and
              premium coffee culture. We continue to evolve while staying true to our founding principles of quality,
              innovation, and exceptional service.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
