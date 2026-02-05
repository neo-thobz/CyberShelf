'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { useState, useRef, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, mounted } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const options = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ]

  // Show a placeholder during hydration to prevent layout shift
  if (!mounted) {
    return (
      <div className="p-2 rounded-lg w-9 h-9">
        <span className="sr-only">Loading theme toggle</span>
      </div>
    )
  }

  const currentIcon = resolvedTheme === 'dark' ? Moon : Sun

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Toggle theme"
      >
        <currentIcon size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-card border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setTheme(option.value)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                theme === option.value
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              <option.icon size={16} />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
