import { StatusBadge, Card, CardContent, CardHeader, CardTitle } from '@klinikk/ui'

const produkter = [
  {
    navn: 'Arena',
    beskrivelse:
      'Komplett journalsystem for sykehus. Støtter alle kliniske arbeidsflyter fra innleggelse til utskrivning.',
    status: 'aktiv' as const,
  },
  {
    navn: 'Mobilitet',
    beskrivelse:
      'Journaltilgang på mobil og nettbrett for klinisk personell på farten.',
    status: 'utkast' as const,
  },
  {
    navn: 'Integrasjon',
    beskrivelse:
      'API-plattform for integrasjon mot laboratoriesystemer, RIS/PACS og andre fagsystemer.',
    status: 'avsluttet' as const,
  },
  {
    navn: 'Analyse',
    beskrivelse:
      'Beslutningsstøtte og rapporter basert på kliniske data fra hele sykehuset.',
    status: 'aktiv' as const,
  },
]

export default function ProdukterPage() {
  return (
    <div className="py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Produkter</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        Et samlet økosystem for moderne helsedrift — fra journalføring til
        beslutningsstøtte.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {produkter.map((produkt) => (
          <Card key={produkt.navn}>
            <CardHeader>
              <CardTitle>{produkt.navn}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {produkt.beskrivelse}
              </p>
              <StatusBadge status={produkt.status} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
