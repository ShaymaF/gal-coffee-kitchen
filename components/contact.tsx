import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Contact() {
  return (
<section className="py-20 md:py-32 bg-[#00443F]">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-light text-[#E7CFAB] mb-4 tracking-wide">CONTACT US</h2>
      <p className="text-[#E7CFAB]/70 max-w-2xl mx-auto">
        We'd love to hear from you. Reach out for reservations, inquiries, or to provide feedback on your
        experience.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact Form */}
      <div>
        <h3 className="text-xl font-light text-[#E7CFAB] mb-6">SEND US A MESSAGE</h3>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input placeholder="Name" className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]" />
            <Input placeholder="Email" type="email" className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]" />
          </div>
          <Input placeholder="Subject" className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB]" />
          <Textarea
            placeholder="Your message"
            className="bg-transparent text-[#E7CFAB] placeholder:text-[#E7CFAB]/50 border-[#E7CFAB]/30 focus-visible:ring-[#E7CFAB] min-h-[150px]"
          />
          <Button className="bg-[#E7CFAB] text-[#00443F] hover:bg-[#E7CFAB]/90 w-full sm:w-auto">
            SEND MESSAGE
          </Button>
        </form>
      </div>

      {/* Contact Info */}
      <div>
        <h3 className="text-xl font-light text-[#E7CFAB] mb-6">INFORMATION</h3>
        <div className="space-y-6 text-[#E7CFAB]/90">
          <div className="flex items-start">
            <MapPin className="text-[#E7CFAB] mr-4 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-[#E7CFAB]">Address</h4>
              <p>71 Madison Ave, New York, NY 10016</p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="text-[#E7CFAB] mr-4 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-[#E7CFAB]">Phone</h4>
              <p>+1 (212) 456-7890</p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="text-[#E7CFAB] mr-4 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-[#E7CFAB]">Email</h4>
              <p>info@galcoffee.com</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="text-[#E7CFAB] mr-4 mt-1" size={20} />
            <div>
              <h4 className="font-medium text-[#E7CFAB]">Opening Hours</h4>
              <p>Monday - Friday: 7:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 8:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        {/* <div className="mt-8 h-64 bg-[#E7CFAB]/10 rounded-md border border-[#E7CFAB]/20">
          <div className="w-full h-full flex items-center justify-center text-[#E7CFAB]/50">Map Location</div>
        </div> */}
      </div>
    </div>
  </div>
</section>

  )
}
