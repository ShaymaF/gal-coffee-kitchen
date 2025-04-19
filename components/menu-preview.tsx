"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export function Menu() {
  const menuCategories = [
    {
      title: "CHEF'S",
      subtitle: "ONLY THE FINEST FOOD & GREAT SERVICE",
      description: "Premium selections crafted with exceptional ingredients and culinary expertise",
      image: "/images/food-1.png",
    },
    {
      title: "COFFEE",
      subtitle: "PREMIUM COFFEE SELECTION",
      description: "Expertly roasted beans and artisanal brewing methods",
      image: "/images/h1-gallery-img4.jpg",
    },
    {
      title: "DESSERTS",
      subtitle: "SWEET CREATIONS",
      description: "Indulge in our delectable sweet creations",
      image: "/images/food-2.png",
    },
    {
      title: "EVENTS",
      subtitle: "BOOK YOUR EVENT",
      description: "Create memorable occasions in our elegant space",
      image: "/images/event-1.png",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gal-dark relative">
      <div className="fidalgo-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="fidalgo-section-title">OUR MENU</h2>
          <div className="fidalgo-divider"></div>
          <p className="text-gal-beige/80 max-w-2xl mx-auto font-sans">
            Discover our carefully curated selection of premium coffee and exquisite dishes, crafted with the finest
            ingredients to provide an unforgettable culinary experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {menuCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden fidalgo-image-hover"
            >
              <div className="relative h-96 overflow-hidden">
                <Image src={category.image || "/placeholder.svg"} alt={category.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gal-dark/50 flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-5xl font-light text-gal-beige mb-2 font-serif">{category.title}</h3>
                  <div className="fidalgo-divider"></div>
                  <h4 className="text-xl font-light text-gal-beige mb-4 font-serif">{category.subtitle}</h4>
                  <p className="text-gal-beige/80 mb-6 font-sans">{category.description}</p>
                  <Link href="/menu">
                    <button className="fidalgo-button text-gal-beige">EXPLORE MENU</button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
