import { Link } from 'react-router'
import type { Pasient } from '../../../types'

type PatientCardProps = {
  pasient: Pasient
}

export function PatientCard({ pasient }: PatientCardProps) {
  const alder = beregnAlder(pasient.fodselsdato)

  return (
    <Link
      to={`/pasienter/${pasient.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{pasient.navn}</h3>
          <p className="text-sm text-gray-500">
            {alder} år · {pasient.kjonn === 'mann' ? 'Mann' : 'Kvinne'}
          </p>
        </div>
        <span className="text-xs text-gray-400">ID: {pasient.id}</span>
      </div>
      <p className="mt-2 text-sm text-gray-700">{pasient.diagnose}</p>
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
