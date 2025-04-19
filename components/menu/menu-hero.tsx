"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function MenuHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gal-dark overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/menu-img1.jpg"
          alt="GAL Coffee & Kitchen Menu"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-light text-gal-beige tracking-wider mb-6 font-serif">OUR MENU</h1>
        <div className="w-24 h-0.5 bg-gal-beige/30 mx-auto mb-8"></div>
        <p className="text-gal-beige/80 max-w-2xl mx-auto text-lg font-sans">
          Discover our carefully curated selection of premium coffee and exquisite dishes, crafted with the finest
          ingredients to provide an unforgettable culinary experience.
        </p>
      </motion.div>
    </section>
  )
}
