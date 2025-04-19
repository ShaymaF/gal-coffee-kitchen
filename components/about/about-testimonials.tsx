import { Quote } from "lucide-react"

export function AboutTestimonials() {
  const testimonials = [
    {
      quote:
        "GAL Coffee & Kitchen has redefined what I expect from a dining experience. The attention to detail in both the food and the ambiance is unparalleled.",
      author: "Emma Thompson",
      title: "Food Critic, Culinary Magazine",
    },
    {
      quote:
        "As someone who appreciates fine coffee, I can confidently say that GAL serves some of the best espresso I've ever tasted. Their commitment to quality is evident in every cup.",
      author: "Michael Chen",
      title: "Coffee Connoisseur",
    },
    {
      quote:
        "The team at GAL has created something truly special. It's more than just a restaurant; it's a destination that offers a complete sensory experience.",
      author: "Sophia Rodriguez",
      title: "Lifestyle Blogger",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gal-green text-gal-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">WHAT PEOPLE SAY</h2>
          <div className="w-16 h-1 bg-gal-beige/30 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border border-gal-beige/20 p-8 rounded-sm">
              <Quote className="text-gal-beige/40 mb-4" size={32} />
              <p className="italic mb-6 text-gal-beige/90">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-gal-beige/70 text-sm">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
