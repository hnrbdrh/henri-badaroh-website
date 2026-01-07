import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
