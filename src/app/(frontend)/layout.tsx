import React from 'react'
import { Share_Tech, Share_Tech_Mono } from 'next/font/google'

import Navigation from '@/app/(frontend)/components/Navigation'
import Footer from '@/app/(frontend)/components/Footer'
import { ThemeProvider } from '@/app/(frontend)/components/ThemeProvider'
import './globals.css'

const shareTech = Share_Tech({ subsets: ['latin'], weight: '400', variable: '--font-share-tech' })
const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], weight: '400', variable: '--font-share-tech-mono' })

export const metadata = {
  title: 'Cyber Shelf - Your Source for Quality Content',
  description: 'Explore articles on technology, business and design.',
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${shareTech.variable} ${shareTechMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <Navigation />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
