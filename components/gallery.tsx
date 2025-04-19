import Image from "next/image";

export function Gallery() {
  const galleryImages = [
    "/images/food-1.png",
    "/images/h1-gallery-img4.jpg",
    "/images/people-1.png",
    "/images/food-2.png",
    "/images/menu3-parallax.jpg",
    "/images/interior-1.jpg",
    "/images/h5-gallery-img2.jpg",
    "/images/event-1.png",
    "/images/food-2.png",
  ];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gal-green mb-4 tracking-wide">
            GALLERY
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore the elegant ambiance and culinary artistry of GAL Coffee &
            Kitchen through our gallery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gal-green/0 group-hover:bg-gal-green/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-transparent group-hover:text-gal-beige transition-colors duration-300 text-lg font-light tracking-wider">
                  VIEW
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
