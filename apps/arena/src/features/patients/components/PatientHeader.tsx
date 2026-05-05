import { Card, CardContent, Badge } from '@klinikk/ui'
import type { Pasient } from '../../../types'

type PatientHeaderProps = {
  pasient: Pasient
}

export function PatientHeader({ pasient }: PatientHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{pasient.navn}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Født: {formaterDato(pasient.fodselsdato)} ·{' '}
              {pasient.kjonn === 'mann' ? 'Mann' : 'Kvinne'}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Pasient-ID</p>
            <p className="font-mono text-sm font-medium">{pasient.id}</p>
          </div>
        </div>
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm">
            {pasient.diagnose}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function formaterDato(dato: string): string {
  return new Date(dato).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
