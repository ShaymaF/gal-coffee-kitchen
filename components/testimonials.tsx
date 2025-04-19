"use client"

import { Quote } from "lucide-react"
import { motion } from "framer-motion"

export function Testimonials() {
  const testimonials = [
    {
      quote: "GAL offers the most exquisite coffee experience I've ever had. The attention to detail is remarkable.",
      author: "Emma Thompson",
      title: "Food Critic",
    },
    {
      quote: "A perfect blend of sophistication and comfort. The cuisine is exceptional and the coffee is world-class.",
      author: "Michael Chen",
      title: "Culinary Expert",
    },
    {
      quote: "Every visit to GAL is a memorable journey through flavors and ambiance. Simply outstanding.",
      author: "Sophia Rodriguez",
      title: "Lifestyle Blogger",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gal-dark text-gal-beige">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light mb-4 tracking-wide font-serif">WHAT PEOPLE SAY</h2>
          <div className="w-16 h-0.5 bg-gal-beige/30 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gal-beige/20 p-8"
            >
              <Quote className="text-gal-beige/40 mb-4" size={32} />
              <p className="italic mb-6 text-gal-beige/90 font-serif">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium font-sans">{testimonial.author}</p>
                <p className="text-gal-beige/70 text-sm font-sans">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
