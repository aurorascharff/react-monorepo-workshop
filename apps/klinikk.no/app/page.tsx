import Link from 'next/link'
import { StatusBadge, Card, CardContent, CardHeader, CardTitle } from '@klinikk/ui'

export default function Home() {
  return (
    <div>
      <section className="py-24 border-b">
        <h1 className="text-5xl font-bold tracking-tight">
          Helseteknologi for
          <br />
          norske sykehus
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
          Klinikk leverer journalsystem, mobil tilgang og integrasjonsplattform til
          sykehus over hele landet.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/produkter"
            className="rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Se produkter
          </Link>
          <Link
            href="/om-oss"
            className="rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
          >
            Om oss
          </Link>
        </div>
      </section>

      <section className="py-16">
        <h2 className="mb-8 text-2xl font-semibold">Våre løsninger</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Arena</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Komplett journalsystem for sykehus. Støtter alle kliniske
                arbeidsflyter fra innleggelse til utskrivning.
              </p>
              <StatusBadge status="aktiv" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobilitet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Journaltilgang på mobil og nettbrett for klinisk personell på
                farten.
              </p>
              <StatusBadge status="utkast" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrasjon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                API-plattform for integrasjon mot laboratoriesystemer, RIS/PACS
                og andre fagsystemer.
              </p>
              <StatusBadge status="avsluttet" />
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t py-8 text-sm text-muted-foreground">
        © 2026 Klinikk AS
      </footer>
    </div>
  )
}

