import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"

export function AboutTeam() {
  const team = [
    {
      name: "Sophia Laurent",
      role: "Executive Chef",
      bio: "With over 15 years of experience in fine dining, Sophia brings her passion for innovative cuisine to GAL.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Marcus Chen",
      role: "Head Barista",
      bio: "A certified coffee expert, Marcus has traveled the world studying coffee cultivation and preparation techniques.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "Olivia Thompson",
      role: "Pastry Chef",
      bio: "Trained in Paris, Olivia creates exquisite desserts that perfectly balance tradition and innovation.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      name: "James Wilson",
      role: "General Manager",
      bio: "With a background in luxury hospitality, James ensures every guest receives an exceptional experience.",
      image: "/placeholder.svg?height=400&width=400",
      social: {
        instagram: "#",
        linkedin: "#",
      },
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gal-green mb-4 tracking-wide">OUR TEAM</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Meet the passionate professionals behind GAL Coffee & Kitchen, dedicated to creating exceptional experiences
            for our guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-md mb-4 aspect-square">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gal-green/0 group-hover:bg-gal-green/60 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-4">
                    <a
                      href={member.social.instagram}
                      className="text-gal-beige hover:text-white transition-colors"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <Instagram size={24} />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="text-gal-beige hover:text-white transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gal-green">{member.name}</h3>
              <p className="text-gal-green/70 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
