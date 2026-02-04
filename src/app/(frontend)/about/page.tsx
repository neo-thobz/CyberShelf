import { Users, Target, Award } from 'lucide-react'

export default function About() {
  return (
    <main className="relative overflow-hidden">
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <span className="inline-block mb-4 text-sm tracking-widest uppercase text-gray-300">
            About Us
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Building Content That Matters
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            ContentHub is a modern publishing platform focused on clarity, quality,
            and technology-driven storytelling.
          </p>
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Our Story
          </h2>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              Founded in 2024, ContentHub began with a simple idea: create a space
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
              Today, ContentHub leverages a modern, headless architecture to ensure
              performance, scalability, and accessibility. Our focus remains the
              same — delivering content people can trust, on a platform built to
              last.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-10 md:grid-cols-3">
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
              className="group rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition"
            >
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 text-white">
                <Icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
