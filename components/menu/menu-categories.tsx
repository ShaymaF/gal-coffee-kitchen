"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MenuItems } from "@/components/menu/menu-items"
import { coffeeMenu, breakfastMenu, lunchMenu, dinnerMenu, dessertsMenu } from "@/data/menu-data"

export function MenuCategories() {
  const [activeTab, setActiveTab] = useState("coffee")

  const categories = [
    { id: "coffee", label: "COFFEE" },
    { id: "breakfast", label: "BREAKFAST" },
    { id: "lunch", label: "LUNCH" },
    { id: "dinner", label: "DINNER" },
    { id: "desserts", label: "DESSERTS" },
  ]

  const menuData = {
    coffee: {
      title: "COFFEE",
      description:
        "Our coffee is sourced from the finest beans around the world, roasted to perfection, and prepared with meticulous attention to detail.",
      items: coffeeMenu,
    },
    breakfast: {
      title: "BREAKFAST",
      description:
        "Start your day with our gourmet breakfast options, featuring fresh ingredients and creative culinary combinations.",
      items: breakfastMenu,
    },
    lunch: {
      title: "LUNCH",
      description:
        "Our lunch menu offers a perfect balance of light and satisfying options, ideal for a midday culinary experience.",
      items: lunchMenu,
    },
    dinner: {
      title: "DINNER",
      description:
        "Experience the pinnacle of our culinary artistry with our dinner selections, featuring premium ingredients and sophisticated flavors.",
      items: dinnerMenu,
    },
    desserts: {
      title: "DESSERTS",
      description:
        "Indulge in our exquisite dessert creations, crafted by our pastry chefs to provide the perfect sweet finale to your dining experience.",
      items: dessertsMenu,
    },
  }

  const currentMenu = menuData[activeTab as keyof typeof menuData]

  return (
    <section className="py-16 md:py-24 bg-gal-dark">
      <div className="fidalgo-container">
        {/* Category Title */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="fidalgo-section-title">◆ {currentMenu.title} ◆</h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-2">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-2 py-1 font-sans text-sm tracking-wider border-b-2 transition-colors duration-300 ${
                  activeTab === category.id
                    ? "text-gal-beige border-gal-beige"
                    : "text-gal-beige/60 border-transparent hover:text-gal-beige"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <MenuItems items={currentMenu.items} />

        <div className="mt-16 text-center">
          <p className="text-gal-beige/60 mb-6 font-sans">
            Please inform your server of any allergies or dietary restrictions. We are happy to accommodate special
            requests when possible.
          </p>
          <button className="fidalgo-button text-gal-beige">DOWNLOAD FULL MENU (PDF)</button>
        </div>
      </div>
    </section>
  )
}
