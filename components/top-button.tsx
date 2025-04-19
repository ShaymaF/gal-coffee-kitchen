"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function TopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 flex items-center justify-center border border-gal-beige/30 text-gal-beige hover:bg-gal-beige hover:text-gal-dark transition-colors text-xs font-sans"
          aria-label="Scroll to top"
        >
          TOP
        </motion.button>
      )}
    </AnimatePresence>
  )
}
