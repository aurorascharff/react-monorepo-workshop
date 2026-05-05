import { Card, CardContent, CardHeader, CardTitle } from '@klinikk/ui'
import { Building2, MapPin } from 'lucide-react'

const kunder = [
  {
    navn: 'Oslo Universitetssykehus',
    region: 'Helse Sør-Øst',
    sitat:
      'Klinikk har endret hvordan vi jobber med pasientforløp. Klinikere bruker mindre tid på dokumentasjon og mer tid på pasientene.',
    rolle: 'Avdelingsleder',
  },
  {
    navn: 'St. Olavs Hospital',
    region: 'Helse Midt-Norge',
    sitat:
      'Integrasjonsplattformen lar oss koble sammen lab, radiologi og journal sømløst – uten egne integrasjonsprosjekter.',
    rolle: 'IT-direktør',
  },
  {
    navn: 'Universitetssykehuset Nord-Norge',
    region: 'Helse Nord',
    sitat:
      'Mobil tilgang har vært avgjørende for våre ambulante team. Journalen er der pasienten er.',
    rolle: 'Klinikksjef',
  },
  {
    navn: 'Haukeland Universitetssjukehus',
    region: 'Helse Vest',
    sitat:
      'Beslutningsstøtten gir oss tryggere kliniske avgjørelser, særlig på vakt og i akuttsituasjoner.',
    rolle: 'Overlege',
  },
]

export default function KunderPage() {
  return (
    <div className="py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Kunder</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
        Klinikk er i bruk på sykehus i alle fire helseregioner – fra Tromsø
        i nord til Kristiansand i sør.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-16">
        {kunder.map((kunde) => (
          <Card key={kunde.navn}>
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground mb-2">
                <Building2 className="h-5 w-5" />
              </div>
              <CardTitle>{kunde.navn}</CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" /> {kunde.region}
              </p>
            </CardHeader>
            <CardContent>
              <blockquote className="text-sm leading-relaxed border-l-2 border-primary pl-4 italic">
                {kunde.sitat}
              </blockquote>
              <p className="mt-3 text-sm text-muted-foreground">
                — {kunde.rolle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
