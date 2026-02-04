import ContactForm from '@/app/(frontend)/components/ContactForm'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: Mail,
            label: 'Email',
            value: 'contact@contenthub.com',
          },
          {
            icon: Phone,
            label: 'Phone',
            value: '+1 (555) 123-4567',
          },
          {
            icon: MapPin,
            label: 'Office',
            value: '123 Content Street, Digital City',
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-white p-8 rounded-xl shadow-md text-center hover:shadow-lg transition"
          >
            <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className="text-primary-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">{label}</h3>
            <p className="text-gray-600">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-8 md:p-12 rounded-xl shadow-md">
        <h2 className="text-3xl font-display font-bold mb-6 text-center">
          Send Us a Message
        </h2>
        <ContactForm />
      </div>
    </main>
  )
}
