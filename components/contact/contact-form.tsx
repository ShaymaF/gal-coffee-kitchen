'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react"
import { use, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from "next/dynamic";
const DynamicMap = dynamic(() => import('./Map'), { ssr: false });

export function ContactForm() {

  // useEffect(() => {
  //   const mapContainer = document.getElementById('map');
  //   if (mapContainer && mapContainer._leaflet_id != null) {
  //     mapContainer._leaflet_id = null;
  //   }
  
  //   const map = L.map('map').setView([48.8566, 2.3522], 13); // Paris
  
  //   L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  //     attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  //   }).addTo(map);
  
  //   // 👉 Create custom icon
  //   const customIcon = L.icon({
  //     iconUrl: '/logo-beige.jpg', // Path relative to /public
  //     iconSize: [30, 30], // Width, Height
  //     iconAnchor: [20, 40], // Point of the icon which will correspond to marker's location
  //     popupAnchor: [0, -40], // Position of the popup relative to the icon
  //   });
  
  //   // 👉 Use the custom icon
  //   L.marker([48.8566, 2.3522], { icon: customIcon })
  //     .addTo(map)
  //     .bindPopup('Nous sommes ici !');
  // }, []);
  

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-light text-gal-dark mb-6">GET IN TOUCH</h2>
            <p className="text-gray-600 mb-8">
              We value your feedback and inquiries. Fill out the form below, and our team will get back to you as soon
              as possible.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="border-gal-dark/20 focus-visible:ring-gal-dark bg-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="border-gal-dark/20 focus-visible:ring-gal-dark bg-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Subject of your message"
                  className="border-gal-dark/20 focus-visible:ring-gal-dark bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  className="min-h-[150px] border-gal-dark/20 focus-visible:ring-gal-dark bg-transparent"
                />
              </div>

              <Button className="bg-gal-dark text-gal-beige hover:bg-gal-dark/90 w-full sm:w-auto">SEND MESSAGE</Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-light text-gal-dark mb-6">CONTACT INFORMATION</h2>
            <p className="text-gray-600 mb-8">
              Visit us at our location or reach out through any of the contact methods below. We look forward to hearing
              from you.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <MapPin className="text-gal-dark mr-4 mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-gal-dark mb-1">Address</h3>
                  <p className="text-gray-600">71 Madison Ave, New York, NY 10016</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-gal-dark mr-4 mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-gal-dark mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (212) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-gal-dark mr-4 mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-gal-dark mb-1">Email</h3>
                  <p className="text-gray-600">info@galcoffee.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-gal-dark mr-4 mt-1" size={24} />
                <div>
                  <h3 className="font-medium text-gal-dark mb-1">Opening Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 7:00 AM - 10:00 PM</p>
                  <p className="text-gray-600">Saturday - Sunday: 8:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>

            <h3 className="font-medium text-gal-dark mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gal-dark text-gal-beige w-10 h-10 rounded-full flex items-center justify-center hover:bg-gal-dark/90 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-gal-dark text-gal-beige w-10 h-10 rounded-full flex items-center justify-center hover:bg-gal-dark/90 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gal-dark text-gal-beige w-10 h-10 rounded-full flex items-center justify-center hover:bg-gal-dark/90 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-light text-gal-dark mb-6 text-center">FIND US</h2>
          <div className="h-[400px] bg-gray-200 rounded-md">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Interactive Map Would Be Displayed Here
            </div>
          </div>
        </div> */}

        <div className="mt-16">
      <h2 className="text-2xl md:text-3xl font-light text-gal-dark mb-6 text-center">
        FIND US
      </h2>
      <DynamicMap />

    </div>

      </div>
    </section>
  )
}
