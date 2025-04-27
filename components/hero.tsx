"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { BookTableButton } from "./book-table-button"
import { useRouter } from "next/navigation"

export function Hero() {
    const router = useRouter()
  
  return (
    <section className="relative h-screen bg-gal-dark overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home-cover.jpg"
          alt="GAL Coffee & Kitchen"
          fill
          priority
          className="object-cover opacity-30"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Image src="/images/logo-beige.png" alt="GAL Coffee & Kitchen" width={200} height={100} className="mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-gal-beige tracking-wider mb-6 font-serif"
        >
          REFINED TASTE <br /> EXCEPTIONAL EXPERIENCE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gal-beige/80 max-w-2xl mx-auto mb-10 text-lg md:text-xl font-sans"
        >
          More than just a café, GAL sets a new benchmark in hospitality, combining exceptional cuisine, world-class
          coffee, and impeccable service.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <BookTableButton
        trigger={
       <button className="fidalgo-button text-gal-beige">BOOK A TABLE</button>
       }
       />

          <button className="fidalgo-button text-gal-beige" onClick={() =>  router.push('/menu')}>EXPLORE MENU</button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gal-beige/70 text-sm tracking-widest mb-2 font-sans"
        onClick={
          () => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        >SCROLL</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-px h-8 bg-gal-beige/50"
        ></motion.div>
      </motion.div>
    </section>
  )
}
