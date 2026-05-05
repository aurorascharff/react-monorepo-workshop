import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity } from 'lucide-react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Klinikk – Health technology for modern hospitals',
  description:
    'Klinikk delivers journal systems and a healthcare platform for hospitals',
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
              className="flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              Klinikk
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
                className="flex items-center gap-2 text-lg font-bold tracking-tight"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Activity className="h-4 w-4" />
                </div>
                Klinikk
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
                <li>contact@klinikk.example</li>
                <li>+1 555 123 4567</li>
                <li>Remote-first</li>
              </ul>
            </div>
          </div>
          <div className="border-t">
            <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-muted-foreground">
              © 2026 Klinikk
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
