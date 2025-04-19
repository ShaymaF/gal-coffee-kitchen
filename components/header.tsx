"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"
import { motion } from "framer-motion"
import { BookTableButton } from "@/components/book-table-button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["HOME", "MENU", "ABOUT", "GALLERY", "CONTACT"]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-gal-dark py-2 shadow-md" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex-1 flex justify-start">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item}
                href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
                className="text-gal-beige hover:text-white text-sm tracking-widest transition-colors font-sans"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex-1 flex justify-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Image
              src="/images/logo-beige.png"
              alt="GAL Coffee & Kitchen"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </motion.div>
        </Link>

        <div className="flex-1 flex justify-end items-center">
          {/* Desktop Navigation - Right Side */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.slice(3).map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gal-beige hover:text-white text-sm tracking-widest transition-colors font-sans"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Book a Table Button */}
       

          <BookTableButton
  trigger={
    <Button className="hidden md:inline-flex bg-gal-beige text-gal-dark hover:bg-gal-beige/90 rounded-full px-6 shadow-lg ml-8">
      BOOK A TABLE
    </Button>
  }
/>


         
          {/* Cart Button */}
          <Link href="/cart" className="ml-6 text-gal-beige hover:text-white relative">
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gal-beige text-gal-dark text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gal-beige ml-6" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-gal-dark flex flex-col items-center justify-center"
        >
          <nav className="flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item === "HOME" ? "" : item.toLowerCase()}`}
                className="text-gal-beige hover:text-white text-xl tracking-widest transition-colors font-sans"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            {/* <Button
              variant="outline"
              className="mt-4 border-gal-beige text-gal-beige hover:bg-gal-beige hover:text-gal-dark"
            >
              BOOK A TABLE
            </Button> */}
            <BookTableButton
  trigger={
    <Button className="mt-4 bg-gal-beige text-gal-dark hover:bg-gal-beige/90 rounded-full shadow-lg">
      BOOK A TABLE
    </Button>
  }
/>
            <Link
              href="/cart"
              className="text-gal-beige hover:text-white flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <ShoppingBag size={20} />
              <span>CART ({cartItemCount})</span>
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
