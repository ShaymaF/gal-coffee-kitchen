"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function GalleryGrid() {
  const [filter, setFilter] = useState("all")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: "all", label: "ALL" },
    { id: "interior", label: "INTERIOR" },
    { id: "food", label: "FOOD" },
    { id: "coffee", label: "COFFEE" },
    { id: "events", label: "EVENTS" },
  ]

  const galleryImages = [
    {
      src: "/images/food-1.png",
      alt: "Steak dish",
      category: "food",
    },
    {
      src: "/images/h1-gallery-img4.jpg",
      alt: "Coffee",
      category: "coffee",
    },
    {
      src: "/images/interior-1.jpg",
      alt: "Interior design",
      category: "interior",
    },
    {
      src: "/images/event-1.png",
      alt: "Event setup",
      category: "events",
    },
    {
      src: "/images/food-2.png",
      alt: "Food dish",
      category: "food",
    },
    {
      src: "/images/h5-gallery-img2.jpg",
      alt: "Coffee preparation",
      category: "coffee",
    },
    {
      src: "/images/menu3-parallax.jpg",
      alt: "Gallery image",
      category: "interior",
    },
    {
      src: "/images/people-1.png",
      alt: "People dining",
      category: "events",
    },
  ]

  const filteredImages = filter === "all" ? galleryImages : galleryImages.filter((img) => img.category === filter)

  return (
    <section className="py-16 md:py-24 bg-gal-dark" ref={containerRef}>
      <div className="fidalgo-container">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-2 py-1 font-sans text-sm tracking-wider border-b-2 transition-colors duration-300 ${
                  filter === category.id
                    ? "text-gal-beige border-gal-beige"
                    : "text-gal-beige/60 border-transparent hover:text-gal-beige"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${filter}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-square overflow-hidden cursor-pointer fidalgo-image-hover"
                onClick={() => setSelectedImage(image.src)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                <div className="absolute inset-0 bg-gal-dark/0 hover:bg-gal-dark/50 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-transparent group-hover:text-gal-beige transition-colors duration-500 text-lg font-light tracking-wider font-serif">
                    VIEW
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 text-white bg-black/50 hover:bg-black/70"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] w-full"
                >
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Gallery image"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
