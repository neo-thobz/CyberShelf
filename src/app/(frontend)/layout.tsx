import React from 'react'

import Navigation from '@/app/(frontend)/components/Navigation'
import Footer from '@/app/(frontend)/components/Footer'
import './globals.css'

export const metadata = {
  title: 'Cyber Shelf - Your Source for Quality Content',
  description: 'Explore articles on technology, business and design.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
