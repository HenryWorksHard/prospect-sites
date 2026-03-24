import type { Metadata } from 'next'
import './globals.css'

// Business data - easily customizable per deployment
const businessData = {
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Pett Plumbing and Gas Adelaide',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '0477 894 446',
  location: process.env.NEXT_PUBLIC_BUSINESS_LOCATION || 'Adelaide, SA',
  tagline: process.env.NEXT_PUBLIC_BUSINESS_TAGLINE || 'Professional Plumbing Services',
}

export const metadata: Metadata = {
  title: `${businessData.name} | Licensed Plumber ${businessData.location}`,
  description: `${businessData.name} provides professional plumbing and gas services in ${businessData.location}. Call ${businessData.phone} for fast, reliable service.`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  )
}
