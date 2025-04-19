'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

export function Footer() {
  const galleryImages = [
    { src: '/images/food-1.png', alt: 'Steak dish' },
    { src: '/images/h1-gallery-img4.jpg', alt: 'Coffee' },
    { src: '/images/people-1.png', alt: 'People dining' },
    { src: '/images/food-2.png', alt: 'Food dish' },
    { src: '/images/menu3-parallax.jpg', alt: 'Coffee preparation' },
    { src: '/images/interior-1.jpg', alt: 'Interior design' },
    { src: '/images/h5-gallery-img2.jpg', alt: 'Gallery image' },
    { src: '/images/event-1.png', alt: 'Event setup' },
  ];

  return (
    <footer className="bg-gal-dark text-gal-beige">
      <div className="container mx-auto px-4">
        {/* Connect With Us Section */}
        <section className="py-16 md:py-24 border-b border-gal-beige/10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-center mb-16 font-serif"
          >
            CONNECT WITH US
          </motion.h2>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Autoplay]}
            autoplay={true}
            allowTouchMove={true}
            grabCursor={true}
            speed={2000} // Smooth transition speed
            loop={true}
            slidesPerView={4}
            spaceBetween={5}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            pagination={true}
            navigation={true}
            className="px-6"
          >
{galleryImages.map((image, index) => {
  const shapeVariants = [
    'rounded-[50%_50%_0px_0px]', 
    'rounded-[0px_0px_50%_50%]', 
    'rounded-[50%_0px_50%_0px]', 
    'rounded-[0px_50%_0px_50%]', 
    'rounded-[40px]',           
  ];

  // 👇 pick shape based on index
  const shape =
    index === Math.floor(galleryImages.length / 2) // Center one
      ? 'rounded-none w-[240px] h-[360px]'         // vertical rectangle
      : `${shapeVariants[index % shapeVariants.length]} w-[280px] h-[320px]`;

  return (
    <SwiperSlide key={index}>
      <div
        className={`relative overflow-hidden m-auto group ${shape} transition-shadow duration-300 shadow-lg hover:shadow-xl`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 300vw, (min-width: 768px) 200vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110 object-center"
        />
      </div>
    </SwiperSlide>
  );
})}



          </Swiper>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center text-gal-beige/70 mt-16 font-sans text-sm tracking-wider"
          >
            INSPIRED BY YOU, ALWAYS_#RESTAURANTE
          </motion.p>
        </section>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-6 font-serif">CONTACT US</h3>
            <div className="space-y-2 font-sans text-gal-beige/80">
              <p>T. +1 (212) 456-7890</p>
              <p>M. info@galcoffee.com</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium mb-6 font-serif">ADDRESS</h3>
            <div className="space-y-2 font-sans text-gal-beige/80">
              <p>71 Madison Ave</p>
              <p>New York, NY 10016</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-medium mb-6 font-serif">OPENING HOURS</h3>
            <div className="space-y-2 font-sans text-gal-beige/80">
              <p>Everyday : From 7:00 AM To 10:00 PM</p>
              <p>Kitchen Closes At 9:30 PM</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gal-beige/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link href="#" className="text-gal-beige/70 hover:text-gal-beige transition-colors text-sm font-sans">
                PINTEREST
              </Link>
              <span className="text-gal-beige/30">◆</span>
              <Link href="#" className="text-gal-beige/70 hover:text-gal-beige transition-colors text-sm font-sans">
                FACEBOOK
              </Link>
              <span className="text-gal-beige/30">◆</span>
              <Link href="#" className="text-gal-beige/70 hover:text-gal-beige transition-colors text-sm font-sans">
                INSTAGRAM
              </Link>
            </div>

            <div className="mb-4 md:mb-0">
              <Image src="/images/logo-beige.png" alt="GAL Coffee & Kitchen" width={120} height={60} />
            </div>

            <div className="text-gal-beige/60 text-sm font-sans">
              <p>© {new Date().getFullYear()} GAL COFFEE & KITCHEN. ALL RIGHTS RESERVED</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
