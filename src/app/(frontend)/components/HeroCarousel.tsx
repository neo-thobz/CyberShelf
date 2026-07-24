'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselImage {
  id: string
  title: string
  image: {
    url: string
    alt: string
  }
  caption?: string
  articleSlug?: string
}

interface HeroCarouselProps {
  images: CarouselImage[]
}

export default function HeroCarousel({ images }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((index: number) => {
    if (animating || index === current) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 500)
  }, [animating, current])

  const prev = useCallback(() => {
    goTo(current === 0 ? images.length - 1 : current - 1)
  }, [current, images.length, goTo])

  const next = useCallback(() => {
    goTo(current === images.length - 1 ? 0 : current + 1)
  }, [current, images.length, goTo])

  // Auto-advance
  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(next, 6000)
    return () => clearInterval(interval)
  }, [next, images.length])

  if (!images.length) return null

  const slide = images[current]
  const padded = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="relative w-full h-screen min-h-[560px] max-h-[900px] overflow-hidden bg-[#0d0f14]">
      {/* Background image */}
      {images.map((img, i) => (
        <div
          key={img.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={img.image.url}
            alt={img.image.alt}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Dark overlay — heavier at left for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f14]/90 via-[#0d0f14]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14]/60 via-transparent to-[#0d0f14]/30" />
        </div>
      ))}

      {/* Corner brackets */}
      <div className="absolute bottom-10 left-6 sm:left-10 w-8 h-8 border-l-2 border-b-2 pointer-events-none"
        style={{ borderColor: 'var(--color-accent)' }} />
      <div className="absolute bottom-10 right-20 sm:right-28 w-8 h-8 border-r-2 border-b-2 pointer-events-none"
        style={{ borderColor: 'var(--color-accent)' }} />

      {/* Left arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-all duration-200"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Main content */}
      <div className="relative z-10 flex items-center h-full px-6 sm:px-12 lg:px-16">
        <div className="max-w-2xl">
          {/* File-path label */}
          <p className="font-mono text-xs sm:text-sm tracking-widest mb-5 sm:mb-6"
            style={{ color: 'var(--color-cyber)' }}>
            // {slide.title?.toLowerCase().replace(/\s+/g, '_')}.txt
          </p>

          {/* Heading */}
          <h1
            className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 sm:mb-6 text-balance transition-opacity duration-500"
            style={{ opacity: animating ? 0 : 1 }}
          >
            {slide.title}
          </h1>

          {/* Caption / excerpt */}
          {slide.caption && (
            <p
              className="font-mono text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 leading-relaxed transition-opacity duration-500"
              style={{ color: 'var(--color-accent)', opacity: animating ? 0 : 1 }}
            >
              {slide.caption}
            </p>
          )}

          {/* CTA + counter */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href={slide.articleSlug ? `/articles/${slide.articleSlug}` : '/articles'}
              className="inline-block font-mono text-sm sm:text-base tracking-widest uppercase font-bold text-white px-6 sm:px-8 py-3 sm:py-4 transition-all duration-200 hover:brightness-110"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              READ MORE
            </Link>
            <span className="font-mono text-sm text-white/40 tracking-widest">
              {padded(current + 1)} / {padded(images.length)}
            </span>
          </div>
        </div>
      </div>

      {/* Right filmstrip thumbnails */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 pr-0 hidden sm:flex">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative w-16 h-12 lg:w-20 lg:h-14 overflow-hidden transition-all duration-200 flex-shrink-0"
            style={{
              border: i === current ? '2px solid var(--color-accent)' : '2px solid transparent',
              opacity: i === current ? 1 : 0.5,
            }}
          >
            <Image
              src={img.image.url}
              alt={img.image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Bottom dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === current ? '2rem' : '0.4rem',
              height: '0.25rem',
              backgroundColor: i === current ? 'var(--color-accent)' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
