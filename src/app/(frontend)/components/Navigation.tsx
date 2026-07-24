'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const navItems = [
    { href: '/articles', label: 'ARTICLES' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
              style={{ borderColor: 'var(--color-cyber)', backgroundColor: 'rgba(0,229,204,0.12)' }}>
              <span className="font-mono text-xs sm:text-sm font-bold tracking-tighter"
                style={{ color: 'var(--color-cyber)' }}>
                CS
              </span>
            </div>
            <span className="font-mono text-base sm:text-lg tracking-widest font-bold text-white uppercase">
              CYBER_SHELF
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-xs lg:text-sm tracking-widest text-white/70 hover:text-white transition-colors duration-200 uppercase"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Search + Theme + Mobile menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search bar — desktop */}
            <div className="hidden md:flex items-center border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-1.5 gap-2 min-w-[160px]">
              <Search size={13} className="text-white/40 flex-shrink-0" />
              <input
                type="text"
                placeholder="search..."
                className="bg-transparent text-white/70 text-xs font-mono tracking-wider placeholder:text-white/30 outline-none w-full"
              />
            </div>

            <ThemeToggle />

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Toggle search"
            >
              <Search size={18} />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div className="flex items-center border border-white/20 bg-white/5 backdrop-blur-sm px-3 py-2 gap-2">
              <Search size={13} className="text-white/40 flex-shrink-0" />
              <input
                type="text"
                placeholder="search..."
                className="bg-transparent text-white/70 text-sm font-mono tracking-wider placeholder:text-white/30 outline-none w-full"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile nav menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-sm tracking-widest text-white/60 hover:text-white py-3 border-b border-white/5 last:border-0 transition-colors uppercase"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
