"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"
import { motion, AnimatePresence } from "framer-motion"

export function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {cartItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 border-b border-gal-beige/10 pb-6"
          >
            <div className="w-20 h-20 relative rounded-sm overflow-hidden flex-shrink-0">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="text-gal-beige font-medium font-serif">{item.name}</h3>
                <span className="text-gal-beige">TND {item.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-end mt-4">
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gal-beige/70 hover:text-gal-beige hover:bg-transparent"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-8 text-center text-gal-beige">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gal-beige/70 hover:text-gal-beige hover:bg-transparent"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gal-beige/70 hover:text-gal-beige hover:bg-transparent"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
