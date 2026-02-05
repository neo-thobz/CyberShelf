'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    marketingConsent: false,
    termsAccepted: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: '',
          marketingConsent: false,
          termsAccepted: false,
        })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  const inputClasses = "w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
  const labelClasses = "block text-sm font-medium text-foreground mb-2"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="firstName" className={labelClasses}>
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className={inputClasses}
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClasses}>
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className={inputClasses}
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClasses}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClasses}
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={`${inputClasses} resize-none`}
          placeholder="How can we help you?"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="marketingConsent"
            checked={formData.marketingConsent}
            onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-border bg-secondary text-accent focus:ring-accent focus:ring-offset-0"
          />
          <label htmlFor="marketingConsent" className="text-sm text-muted-foreground">
            I consent to receiving marketing communications
          </label>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="termsAccepted"
            required
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-border bg-secondary text-accent focus:ring-accent focus:ring-offset-0"
          />
          <label htmlFor="termsAccepted" className="text-sm text-muted-foreground">
            I accept the Terms & Conditions *
          </label>
        </div>
      </div>

      {status === 'success' && (
        <div className="bg-success/10 border border-success/30 text-success px-4 py-3 rounded-lg text-sm">
          Thank you! Your message has been submitted successfully.
        </div>
      )}

      {status === 'error' && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">
          Something went wrong. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-foreground text-background py-3 px-6 rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
