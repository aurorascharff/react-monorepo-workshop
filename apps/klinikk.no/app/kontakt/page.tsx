import { Card, CardContent, CardHeader, CardTitle } from '@klinikk/ui'
import { Mail, Phone, MapPin, Building2 } from 'lucide-react'

const kontorer = [
  {
    navn: 'Oslo',
    adresse: 'Gullhaug Torg 5, 0484 Oslo',
    avdeling: 'Hovedkontor',
  },
  {
    navn: 'Bodø',
    adresse: 'Sjøgata 15, 8006 Bodø',
    avdeling: 'Utvikling',
  },
  {
    navn: 'Trondheim',
    adresse: 'Beddingen 8, 7042 Trondheim',
    avdeling: 'Salg og support',
  },
]

const kontaktPunkter = [
  {
    icon: Mail,
    label: 'E-post',
    verdi: 'kontakt@klinikk.no',
  },
  {
    icon: Phone,
    label: 'Telefon',
    verdi: '+47 12 34 56 78',
  },
  {
    icon: Building2,
    label: 'Organisasjonsnummer',
    verdi: '999 999 999',
  },
]

export default function KontaktPage() {
  return (
    <div className="py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Kontakt</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        Vi hjelper deg gjerne – enten du vil ha en demo, har spørsmål om
        produktene eller trenger teknisk support.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-16">
        {kontaktPunkter.map(({ icon: Icon, label, verdi }) => (
          <Card key={label}>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground mb-2">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-base text-muted-foreground font-medium">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{verdi}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold tracking-tight mb-6">Kontorer</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {kontorer.map((kontor) => (
          <Card key={kontor.navn}>
            <CardHeader>
              <CardTitle>{kontor.navn}</CardTitle>
              <p className="text-sm text-muted-foreground">{kontor.avdeling}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                {kontor.adresse}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
