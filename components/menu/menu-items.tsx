"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart/cart-provider"
import type { MenuItem } from "@/types/menu"
import { useToast } from "@/hooks/use-toast"

interface MenuItemsProps {
  items: MenuItem[]
}

export function MenuItems({ items }: MenuItemsProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: Number.parseFloat(item.price.replace("$", "")),
      image: item.image || "/images/food-1.png",
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8"
    >
      {items.map((menuItem, index) => (
        <motion.div
          key={menuItem.id}
          variants={item}
          className="fidalgo-menu-item"
          onMouseEnter={() => setHoveredItem(index)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 fidalgo-image-hover">
            <Image src={menuItem.image || "/images/food-1.png"} alt={menuItem.name} fill className="object-cover" />
          </div>
          <div className="fidalgo-menu-item-content ml-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="fidalgo-menu-item-title">{menuItem.name}</h3>
                {menuItem.badges && (
                  <div className="flex gap-2 mt-1">
                    {menuItem.badges.map((badge, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-sm font-normal text-gal-beige/70 border-gal-beige/30"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <span className="fidalgo-menu-item-price">{menuItem.price} TND</span>
            </div>
            <p className="fidalgo-menu-item-description">{menuItem.description}</p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredItem === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              <button
                onClick={() => handleAddToCart(menuItem)}
                className="fidalgo-button text-gal-beige text-sm py-2 px-4"
              >
                <ShoppingBag className="inline-block mr-2 h-4 w-4" />
                ADD TO CART
              </button>
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
