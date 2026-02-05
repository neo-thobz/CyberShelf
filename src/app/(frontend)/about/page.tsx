import { Users, Target, Award } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-center">
          <span className="inline-block mb-4 text-xs sm:text-sm tracking-widest uppercase text-muted-foreground">
            About Us
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 text-balance">
            Building Content That Matters
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Cyber Shelf is a modern publishing platform focused on clarity, quality,
            and technology-driven storytelling.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-8">
          Our Story
        </h2>

        <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
          <p>
            Founded in 2024, Cyber Shelf began with a simple idea: create a space
            where quality content and modern technology work seamlessly together.
            We saw a gap for platforms that valued both thoughtful editorial
            standards and strong technical foundations.
          </p>

          <p>
            What started as a small group of passionate writers and developers has
            grown into a collaborative ecosystem of contributors and readers.
            Each article published reflects our commitment to clarity, accuracy,
            and relevance.
          </p>

          <p>
            Today, Cyber Shelf leverages a modern, headless architecture to ensure
            performance, scalability, and accessibility. Our focus remains the
            same — delivering content people can trust, on a platform built to
            last.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: 'Our Team',
                text: 'A multidisciplinary team of writers, designers, and engineers collaborating to deliver exceptional digital experiences.',
              },
              {
                icon: Target,
                title: 'Our Mission',
                text: 'To empower readers with reliable, well-researched content that supports better decisions and deeper understanding.',
              },
              {
                icon: Award,
                title: 'Our Values',
                text: 'We prioritise quality, integrity, and continuous improvement in both our content and our technology.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group bg-card border border-border rounded-xl p-6 sm:p-8 hover:border-muted-foreground/30 transition-all duration-300"
              >
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary text-foreground">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
