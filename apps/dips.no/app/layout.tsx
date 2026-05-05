import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DIPS – Helseteknologi for norske sykehus',
  description: 'DIPS leverer journalsystem og helseplattform til norske sykehus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  )
}
