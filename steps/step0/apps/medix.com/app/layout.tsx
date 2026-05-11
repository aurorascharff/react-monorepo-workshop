import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity } from 'lucide-react'
import './globals.css'

const siteUrl = 'https://medix.example'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Medix — Health technology for modern hospitals',
    template: '%s | Medix',
  },
  description:
    'Medix delivers clinical journal systems and a modern healthcare platform that helps hospitals spend less time on documentation and more time with patients.',
  keywords: [
    'healthcare',
    'EHR',
    'electronic health record',
    'clinical journal',
    'hospital software',
  ],
  authors: [{ name: 'Medix' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Medix',
    title: 'Medix — Health technology for modern hospitals',
    description:
      'Medix delivers clinical journal systems and a modern healthcare platform that helps hospitals spend less time on documentation and more time with patients.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medix — Health technology for modern hospitals',
    description:
      'Medix delivers clinical journal systems and a modern healthcare platform that helps hospitals spend less time on documentation and more time with patients.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/customers', label: 'Customers' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <header className="border-b bg-background/80 backdrop-blur sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-foreground transition-colors hover:text-foreground/80"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <div className="text-lg font-bold leading-5">Medix</div>
              </div>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-6 flex-1">{children}</main>
        <footer className="border-t bg-muted/30 mt-16">
          <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 md:grid-cols-4">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2.5 text-foreground transition-colors hover:text-foreground/80"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Activity className="h-3.5 w-3.5" />
                </div>
                <div className="flex min-w-0 flex-col justify-center">
                  <div className="text-base font-bold leading-4">Medix</div>
                </div>
              </Link>
              <p className="mt-3 text-sm text-muted-foreground">
                Health technology for modern hospitals.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Solutions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/products"
                    className="hover:text-foreground transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customers"
                    className="hover:text-foreground transition-colors"
                  >
                    Customers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>contact@medix.example</li>
                <li>+1 555 123 4567</li>
                <li>Remote-first</li>
              </ul>
            </div>
          </div>
          <div className="border-t">
            <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-muted-foreground">
              © 2026 Medix
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
