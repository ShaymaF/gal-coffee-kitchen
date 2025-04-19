"use client"

import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gal-dark">
      <Header />

      <section className="pt-40 pb-20 md:pt-48 md:pb-32">
        <div className="fidalgo-container">
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Image src="/images/logo-beige.png" alt="GAL Coffee & Kitchen" width={180} height={90} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-6xl md:text-8xl font-light text-gal-beige mb-6 font-serif"
            >
              404
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <div className="fidalgo-divider"></div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl md:text-3xl font-light text-gal-beige mb-6 font-serif"
            >
              PAGE NOT FOUND
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gal-beige/80 max-w-lg mx-auto mb-10 font-sans"
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/">
                <button className="fidalgo-button text-gal-beige">RETURN TO HOME</button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
