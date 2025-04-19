import { Coffee, Award, Users, Heart } from "lucide-react"

export function AboutValues() {
  const values = [
    {
      icon: <Coffee className="h-10 w-10 text-gal-green" />,
      title: "Quality",
      description:
        "We source only the finest ingredients and coffee beans, ensuring every item we serve meets our exacting standards.",
    },
    {
      icon: <Award className="h-10 w-10 text-gal-green" />,
      title: "Excellence",
      description:
        "From our culinary creations to our service, we strive for excellence in every aspect of the GAL experience.",
    },
    {
      icon: <Users className="h-10 w-10 text-gal-green" />,
      title: "Community",
      description:
        "We believe in creating meaningful connections with our guests and supporting the communities we serve.",
    },
    {
      icon: <Heart className="h-10 w-10 text-gal-green" />,
      title: "Passion",
      description:
        "Our team brings genuine passion to their craft, whether brewing the perfect espresso or creating culinary masterpieces.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gal-beige/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gal-green mb-4 tracking-wide">OUR VALUES</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            These core principles guide everything we do at GAL Coffee & Kitchen, from the way we source our ingredients
            to how we interact with our guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-md shadow-sm flex flex-col items-center text-center">
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-medium text-gal-green mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
