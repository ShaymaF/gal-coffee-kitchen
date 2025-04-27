"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart/cart-provider"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, A11y } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { MenuPDFGenerator } from "./menu-pdf-generator"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

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

export function MenuCategories() {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("https://api.talabbox.tn/restaurants/65c1f732ddbdac0036e8dca5")

        if (!response.ok) {
          throw new Error(`Failed to fetch menu: ${response.status}`)
        }

        const data = await response.json()

        const categorizedMenu: Record<string, { name: string; items: MenuItem[] }> = {}

        // Group menu items by category
        data.restaurant.plates.forEach((plate: any) => {
          console.log('plate', plate);
          
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
            picture: plate.picture?.path,
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

        if (menuCategoriesArray.length > 0) {
          setActiveCategory(menuCategoriesArray[0].id)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching menu:", error)
        setError("Impossible de charger le menu. Veuillez réessayer.")
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [])

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: Number.parseFloat(item.price.price),
      image: item.picture ? `https://api.talabbox.tn/${item.picture}` : "/logo-beige.jpg",
      quantity: 1,
    })

    toast({
      title: "Ajouté au panier",
      description: `${item.name} a été ajouté à votre panier.`,
      duration: 3000,
    })
  }

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-16 h-16 border-4 border-gal-beige/20 border-t-gal-beige rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gal-beige/80">Chargement du menu...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="text-gal-beige/80 mb-4">{error}</div>
        <button onClick={() => window.location.reload()} className="fidalgo-button text-gal-beige">
          Réessayer
        </button>
      </div>
    )
  }

  const currentCategory = menuCategories.find((category) => category.id === activeCategory)

  return (
    <section className="py-16 md:py-24 bg-gal-dark">
      <div className="fidalgo-container">
        {/* <div className="flex flex-col md:flex-row justify-between items-center mb-8"> */}
        <div className="flex flex-col justify-center items-center text-center mb-8">

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left mb-6 md:mb-0"
            >
              <h2 className="fidalgo-section-title">◆ {currentCategory?.name || "Menu"} ◆</h2>
            </motion.div>
          </AnimatePresence>

          {/* PDF Download Button */}
        </div>

        {/* Category Navigation */}
        <div className="relative mb-12">
          <div className="flex items-center">
            <button
              onClick={handlePrev}
              className={`absolute left-0 z-10 w-10 h-10 flex items-center justify-center text-gal-beige bg-gal-dark/80 rounded-full transition-opacity ${isBeginning ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-gal-beige/20"}`}
              disabled={isBeginning}
              aria-label="Previous category"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="w-full overflow-hidden px-12">
              <Swiper
                modules={[Navigation, Pagination, A11y]}
                slidesPerView="auto"
                spaceBetween={24}
                centeredSlides={false}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                  setIsBeginning(swiper.isBeginning)
                  setIsEnd(swiper.isEnd)
                }}
                onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning)
                  setIsEnd(swiper.isEnd)
                }}
                className="categories-swiper"
              >
                {menuCategories.map((category) => (
                  <SwiperSlide key={category.id} className="!w-auto">
                    <button
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 font-serif text-lg tracking-wider border-b-2 transition-all duration-300 whitespace-nowrap ${
                        activeCategory === category.id
                          ? "text-gal-beige border-gal-beige font-medium scale-105"
                          : "text-gal-beige/60 border-transparent hover:text-gal-beige"
                      }`}
                    >
                      {category.name.toUpperCase()}
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              onClick={handleNext}
              className={`absolute right-0 z-10 w-10 h-10 flex items-center justify-center text-gal-beige bg-gal-dark/80 rounded-full transition-opacity ${isEnd ? "opacity-30 cursor-not-allowed" : "opacity-100 hover:bg-gal-beige/20"}`}
              disabled={isEnd}
              aria-label="Next category"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + "_items"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8"
          >
            {currentCategory?.items?.map((item, index) => (
              <motion.div
                key={item._id + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="fidalgo-menu-item group"
                onMouseEnter={() => setHoveredItem(item._id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
              
                <div className="w-20 h-20 relative rounded-tr-xl rounded-bl-xl overflow-hidden flex-shrink-0 fidalgo-image-hover">
                  <Image
                    src={item.picture ? `https://api.talabbox.tn/${item.picture}` : "/logo-beige.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="fidalgo-menu-item-content ml-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="fidalgo-menu-item-title group-hover:text-gal-beige transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>
                    <span className="fidalgo-menu-item-price">
                      {item.price.isPromo ? (
                        <>
                          <span className="line-through text-gal-beige/50 mr-2">${item.price.price} TND</span>
                          <span className="text-gal-beige font-medium">${item.price.pricePromo.toFixed(2)} TND</span>
                        </>
                      ) : (
                        `${item.price.price} TND`
                      )}
                    </span>
                  </div>
                  {item.description && <p className="fidalgo-menu-item-description">{item.description}</p>}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item._id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3"
                  >
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex ml-auto fidalgo-button text-gal-beige text-xs py-2 px-4 hover:bg-gal-beige hover:text-gal-dark transition-all duration-300"
                    >
                      <ShoppingBag className="inline-block mr-2 h-4 w-4" />
                      AJOUTER AU PANIER
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 text-center">
          <p className="text-gal-beige/60 mb-6 font-sans">
            Veuillez informer votre serveur de toute allergie ou restriction alimentaire.
            <br/>
             Nous sommes heureux de
            répondre à vos demandes spéciales dans la mesure du possible.
          </p>

          {/* Mobile PDF Download Button */}
          <div className="md:hidden mt-8">
            <MenuPDFGenerator menuCategories={menuCategories} />
          </div>
        </div>
      </div>
    </section>
  )
}
