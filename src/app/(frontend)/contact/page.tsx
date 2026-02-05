import ContactForm from '@/app/(frontend)/components/ContactForm'
import { Mail, MapPin, Phone } from 'lucide-react'
import { getContactInfo } from '../services/api'
import { formatAddress } from '@/utils/addressHelper';

export default async function Contact() {
  const contactInfo = await getContactInfo()

  const items = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo?.email || 'Not available',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactInfo?.phone || 'Not available',
    },
    {
      icon: MapPin,
      label: 'Office',
      value: formatAddress(contactInfo?.address) || 'Not available',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 text-center">
          <span className="inline-block mb-4 text-xs sm:text-sm tracking-widest uppercase text-muted-foreground">
            Contact
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 text-balance">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Have questions or feedback? We would love to hear from you. Fill out the form below and we will get back to you promptly.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {items.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-card border border-border p-6 sm:p-8 rounded-xl text-center hover:border-muted-foreground/30 transition-all duration-300"
            >
              <div className="bg-secondary w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="text-accent" size={24} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">{label}</h3>
              <p className="text-muted-foreground text-sm sm:text-base">{value}</p>
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="bg-card border border-border p-6 sm:p-8 md:p-12 rounded-xl">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-8 text-center">
            Send Us a Message
          </h2>
          <ContactForm />
        </div>
      </section>
    </div>
  )
}
