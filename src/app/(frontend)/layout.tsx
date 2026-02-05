import React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'

import Navigation from '@/app/(frontend)/components/Navigation'
import Footer from '@/app/(frontend)/components/Footer'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata = {
  title: 'Cyber Shelf - Your Source for Quality Content',
  description: 'Explore articles on technology, business and design.',
}

export const viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
