import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity } from 'lucide-react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Klinikk – Helseteknologi for norske sykehus',
  description:
    'Klinikk leverer journalsystem og helseplattform til norske sykehus',
}

const navLinks = [
  { href: '/produkter', label: 'Produkter' },
  { href: '/kunder', label: 'Kunder' },
  { href: '/om-oss', label: 'Om oss' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb">
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
                Helseteknologi for norske sykehus.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Selskapet</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/om-oss"
                    className="hover:text-foreground transition-colors"
                  >
                    Om oss
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kontakt"
                    className="hover:text-foreground transition-colors"
                  >
                    Kontakt
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Løsninger</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/produkter"
                    className="hover:text-foreground transition-colors"
                  >
                    Produkter
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kunder"
                    className="hover:text-foreground transition-colors"
                  >
                    Kunder
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Kontakt</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>kontakt@klinikk.no</li>
                <li>+47 12 34 56 78</li>
                <li>Oslo, Norge</li>
              </ul>
            </div>
          </div>
          <div className="border-t">
            <div className="mx-auto max-w-7xl px-6 py-4 text-sm text-muted-foreground">
              © 2026 Klinikk AS
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

