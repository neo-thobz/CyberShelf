'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface CarouselImage {
  id: string
  title: string
  image: {
    url: string
    alt: string
  }
  caption?: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full [&_.swiper-button-next]:text-foreground [&_.swiper-button-prev]:text-foreground [&_.swiper-pagination-bullet]:bg-foreground/40 [&_.swiper-pagination-bullet-active]:bg-foreground"
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full h-full">
              <Image
                src={item.image.url}
                alt={item.image.alt}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12">
                  <div className="max-w-7xl mx-auto">
                    <h2 className="text-foreground text-xl sm:text-2xl md:text-4xl font-semibold max-w-2xl text-balance">
                      {item.caption}
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
