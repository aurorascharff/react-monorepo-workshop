import Link from 'next/link'
import {
  ArrowRight,
  HeartPulse,
  Smartphone,
  Network,
  BarChart3,
  ShieldCheck,
  Users,
} from 'lucide-react'
import {
  StatusBadge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@klinikk/ui'

const losninger = [
  {
    icon: HeartPulse,
    tittel: 'Arena',
    beskrivelse:
      'Komplett journalsystem for sykehus. Støtter alle kliniske arbeidsflyter fra innleggelse til utskrivning.',
    status: 'aktiv' as const,
  },
  {
    icon: Smartphone,
    tittel: 'Mobilitet',
    beskrivelse:
      'Journaltilgang på mobil og nettbrett for klinisk personell på farten.',
    status: 'utkast' as const,
  },
  {
    icon: Network,
    tittel: 'Integrasjon',
    beskrivelse:
      'API-plattform for integrasjon mot laboratoriesystemer, RIS/PACS og andre fagsystemer.',
    status: 'avsluttet' as const,
  },
]

const stats = [
  { value: '85%', label: 'av norske sykehus' },
  { value: '40 000+', label: 'aktive brukere' },
  { value: '600+', label: 'ansatte' },
  { value: '30+', label: 'år i drift' },
]

const features = [
  {
    icon: ShieldCheck,
    tittel: 'Sikkerhet i kjernen',
    beskrivelse:
      'Helseopplysninger håndteres etter strenge krav fra Datatilsynet og Helsedirektoratet.',
  },
  {
    icon: BarChart3,
    tittel: 'Kliniske data i sanntid',
    beskrivelse:
      'Beslutningsstøtte og rapporter basert på data fra hele sykehuset.',
  },
  {
    icon: Users,
    tittel: 'Bygget med klinikere',
    beskrivelse:
      'Designet sammen med leger, sykepleiere og helsesekretærer i daglig drift.',
  },
]

export default function Home() {
  return (
    <div>
      <section className="py-24 border-b">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-xs font-medium mb-6">
            Helseteknologi
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Helseteknologi for
            <br />
            norske sykehus
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Klinikk leverer journalsystem, mobil tilgang og integrasjonsplattform
            til sykehus over hele landet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/produkter"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Se produkter <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/kontakt"
              className="rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
            >
              Kontakt oss
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Våre løsninger
            </h2>
            <p className="mt-2 text-muted-foreground">
              Et samlet økosystem for moderne helsedrift.
            </p>
          </div>
          <Link
            href="/produkter"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Alle produkter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {losninger.map(({ icon: Icon, tittel, beskrivelse, status }) => (
            <Card key={tittel}>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground mb-2">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle>{tittel}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {beskrivelse}
                </p>
                <StatusBadge status={status} />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 border-t">
        <h2 className="text-3xl font-semibold tracking-tight mb-12">
          Hvorfor Klinikk?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(({ icon: Icon, tittel, beskrivelse }) => (
            <div key={tittel}>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{tittel}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {beskrivelse}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-t">
        <div className="rounded-2xl bg-primary text-primary-foreground p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Vil du vite mer?
            </h2>
            <p className="mt-2 text-primary-foreground/80 max-w-xl">
              Ta kontakt for en demo eller et uforpliktende møte.
            </p>
          </div>
          <Link
            href="/kontakt"
            className="inline-flex w-fit items-center gap-2 rounded-md bg-primary-foreground text-primary px-5 py-2.5 text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
          >
            Book en demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}

