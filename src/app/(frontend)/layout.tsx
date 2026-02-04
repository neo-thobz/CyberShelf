import React from 'react'
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
        <main>{children}</main>
      </body>
    </html>
  )
}
