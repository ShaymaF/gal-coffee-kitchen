"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function About() {
  return (
    <section className="py-20 md:py-32 bg-gal-dark">
      <div className="fidalgo-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="fidalgo-section-title text-left">CUISINE</h2>
            <h3 className="text-2xl md:text-3xl font-light text-gal-beige mb-6 tracking-wide font-serif">
              OUR GOALS <br /> & HISTORY
            </h3>
            <div className="fidalgo-divider ml-0"></div>

            <p className="text-gal-beige/80 mb-6 leading-relaxed font-sans">
              GAL is a luxury café and restaurant redefining sophistication and taste. Designed to reflect international
              luxury standards, it offers an exquisite blend of culinary artistry and premium coffee culture.
            </p>

            <p className="text-gal-beige/80 mb-8 leading-relaxed font-sans">
              With its refined ambiance and meticulous attention to detail, GAL aims to be the ultimate destination for
              those seeking an elevated dining and coffee experience.
            </p>

            <button className="fidalgo-button text-gal-beige">READ MORE</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative"
          >
            <div className="aspect-square relative fidalgo-image-hover">
              <Image src="/images/interior-1.jpg" alt="GAL Coffee & Kitchen Interior" fill className="object-cover" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 w-48 h-48 overflow-hidden rounded-md fidalgo-image-hover"
            >
              <Image src="/logo-beige.jpg" alt="Coffee" fill className="object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
