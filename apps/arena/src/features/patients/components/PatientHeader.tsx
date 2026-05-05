import type { Pasient } from '../../../types'

type PatientHeaderProps = {
  pasient: Pasient
}

export function PatientHeader({ pasient }: PatientHeaderProps) {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{pasient.navn}</h1>
          <p className="mt-1 text-gray-500">
            Født: {formaterDato(pasient.fodselsdato)} ·{' '}
            {pasient.kjonn === 'mann' ? 'Mann' : 'Kvinne'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Pasient-ID</p>
          <p className="font-mono text-sm font-medium text-gray-700">
            {pasient.id}
          </p>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-blue-50 px-4 py-2">
        <p className="text-sm font-medium text-blue-900">{pasient.diagnose}</p>
      </div>
    </div>
  )
}

function formaterDato(dato: string): string {
  return new Date(dato).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
