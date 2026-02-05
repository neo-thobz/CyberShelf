import Link from 'next/link'

export default async function Footer() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link 
              href="/" 
              className="text-xl font-semibold text-foreground tracking-tight hover:text-accent transition-colors"
            >
              Cyber Shelf
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Your source for quality content on technology, business, and design.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Cyber Shelf. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground/60">
              Built with modern technology
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
