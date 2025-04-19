"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function ConnectWithUs() {
  // Sample images for the connect section
  const connectImages = [
    {
      src: "/placeholder.svg?height=400&width=400",
      alt: "Steak dish with garnish",
      shape: "rounded-full",
    },
    {
      src: "/placeholder.svg?height=400&width=400",
      alt: "Person enjoying coffee",
      shape: "rounded-md",
    },
    {
      src: "/placeholder.svg?height=400&width=400",
      alt: "Champagne toast",
      shape: "rounded-full",
    },
    {
      src: "/placeholder.svg?height=400&width=400",
      alt: "Coffee art",
      shape: "rounded-md",
    },
    {
      src: "/placeholder.svg?height=400&width=400",
      alt: "Dessert plate",
      shape: "rounded-full",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gal-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-light text-center mb-16 text-gal-beige font-serif"
        >
          CONNECT WITH US
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {connectImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${index % 2 === 0 ? "w-56 h-56 md:w-64 md:h-64" : "w-48 h-48"} overflow-hidden ${
                image.shape
              }`}
            >
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-gal-beige/70 mt-16 font-sans text-sm tracking-wider"
        >
          INSPIRED BY YOU, ALWAYS_#RESTAURANTE
        </motion.p>
      </div>
    </section>
  )
}
