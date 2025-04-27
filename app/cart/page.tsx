"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartItems } from "@/components/cart/cart-items"
import { CartSummary } from "@/components/cart/cart-summary"
import { BookTableButton } from "@/components/book-table-button"
import { useCart } from "@/components/cart/cart-provider"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

export default function CartPage() {
  const { cartItems } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery")

  return (
    <main className="min-h-screen bg-gal-dark">
      <Header />
      <section className="pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="fidalgo-container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-light text-gal-beige tracking-wider mb-6 text-center font-serif"
          >
            YOUR CART
          </motion.h1>
          <div className="fidalgo-divider"></div>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2">
                <CartItems />
              </div>
              <div>
                <CartSummary deliveryMethod={deliveryMethod} />
              </div>
            </div>
          ) : (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12 border border-gal-beige/20 rounded-sm mt-12"
          >
            <div className="mb-8 relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#E7CFAB"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
                <circle cx="9" cy="13" r="1" />
                <circle cx="15" cy="13" r="1" />
              </svg>
            </div>
            <p className="text-gal-beige mb-8 text-lg">Your cart is currently empty.</p>
            <Link href="/menu">
              <button className="fidalgo-button text-gal-beige">
                <ArrowLeft className="mr-2 h-4 w-4 inline-block" />
                RETURN TO MENU
              </button>
            </Link>
          </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
