import { Link } from 'react-router'
import { Card, CardContent } from '@klinikk/ui'
import type { Pasient } from '../../../types'

type PatientCardProps = {
  pasient: Pasient
}

export function PatientCard({ pasient }: PatientCardProps) {
  const alder = beregnAlder(pasient.fodselsdato)

  return (
    <Link to={`/pasienter/${pasient.id}`} className="block text-inherit no-underline">
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{pasient.navn}</h3>
              <p className="text-sm text-muted-foreground">
                {alder} år · {pasient.kjonn === 'mann' ? 'Mann' : 'Kvinne'}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">ID: {pasient.id}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{pasient.diagnose}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function beregnAlder(fodselsdato: string): number {
  const fodt = new Date(fodselsdato)
  const idag = new Date()
  let alder = idag.getFullYear() - fodt.getFullYear()
  const maned = idag.getMonth() - fodt.getMonth()
  if (maned < 0 || (maned === 0 && idag.getDate() < fodt.getDate())) {
    alder--
  }
  return alder
}
