import Link from 'next/link'

export default async function Footer() {
  const links = [
    { href: '/articles', label: 'ARTICLES' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <footer className="border-t bg-muted" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div
                className="w-8 h-8 border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: 'var(--color-cyber)', backgroundColor: 'rgba(0,229,204,0.08)' }}
              >
                <span className="font-mono text-xs font-bold tracking-tighter"
                  style={{ color: 'var(--color-cyber)' }}>
                  CS
                </span>
              </div>
              <span className="font-mono text-sm tracking-widest font-bold text-foreground uppercase">
                CYBER_SHELF
              </span>
            </Link>
            <p className="font-mono text-xs text-muted-foreground max-w-xs leading-relaxed tracking-wide">
              // Your source for quality content on technology, business, and design.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6 sm:gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ borderColor: 'var(--color-border)' }}>
          <p className="font-mono text-xs text-muted-foreground tracking-widest">
            &copy; {new Date().getFullYear()} CYBER_SHELF — ALL RIGHTS RESERVED
          </p>
          <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--color-cyber)' }}>
            // EOF
          </span>
        </div>
      </div>
    </footer>
  )
}
