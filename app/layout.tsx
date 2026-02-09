import type { Metadata } from 'next'
import './globals.css'
import Screensaver from '@/components/Screensaver'
import StyleTester from '@/components/StyleTester'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Henri BADARÖH',
  description: 'Portfolio of Henri Badaröh, Brazilian visual artist and writer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Screensaver />
        <StyleTester />
        <Analytics />
      </body>
    </html>
  )
}
