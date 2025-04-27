"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MenuPDFGenerator } from "./menu-pdf-generator"
import { useEffect, useState } from "react"
interface MenuItem {
  _id: string
  name: string
  category: string
  description: string | null
  price: {
    price: string
    isPromo: boolean
    pricePromo: number
  }
  picture: {
    path: string
  } | null
}

interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}
export function MenuHero() {
    const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([])
   useEffect(() => {
      const fetchMenu = async () => {
        try {

          const response = await fetch("https://api.talabbox.tn/restaurants/65c1f732ddbdac0036e8dca5")
  
          if (!response.ok) {
            throw new Error(`Failed to fetch menu: ${response.status}`)
          }
  
          const data = await response.json()
  
          const categorizedMenu: Record<string, { name: string; items: MenuItem[] }> = {}
  
          // Group menu items by category
          data.restaurant.plates.forEach((plate: any) => {
            const categoryId = plate.typePlate?._id || "uncategorized"
            const categoryName = plate.typePlate?.title || "Autres"
  
            if (!categorizedMenu[categoryId]) {
              categorizedMenu[categoryId] = { name: categoryName, items: [] }
            }
  
            categorizedMenu[categoryId].items?.push({
              _id: plate._id,
              name: plate.name,
              category: categoryName,
              description: plate.description === "null" ? null : plate.description,
              price: {
                price: plate.price?.price || "0",
                isPromo: plate.price?.isPromo || false,
                pricePromo: plate.price?.pricePromo || 0,
              },
              picture: plate.picture,
            })
          })
  
          // Convert to array and sort categories alphabetically
          const menuCategoriesArray = Object.entries(categorizedMenu)
            .map(([id, { name, items }]) => ({
              id,
              name,
              items: items.sort((a, b) => a.name.localeCompare(b.name)),
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
  
          setMenuCategories(menuCategoriesArray)
  
     
        } catch (error) {
          console.error("Error fetching menu:", error)
        }
      }
  
      fetchMenu()
    }, [])
  
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
        <MenuPDFGenerator menuCategories={menuCategories} className="mx-auto my-4 md:mx-0 place-self-center" />

      </motion.div>
    </section>
  )
}
