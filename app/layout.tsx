import type { Metadata } from 'next'
import './globals.css'
import Screensaver from '@/components/Screensaver'

export const metadata: Metadata = {
  title: 'Henri Badaroh - Brazilian Visual Artist and Writer',
  description: 'Portfolio of Henri Badaroh, Brazilian visual artist and writer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Screensaver />
      </body>
    </html>
  )
}
