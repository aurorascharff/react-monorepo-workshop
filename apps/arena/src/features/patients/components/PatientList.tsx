import { usePatientFilter } from '../hooks/usePatientFilter'
import { PatientCard } from './PatientCard'
import type { Pasient } from '../../../types'

type PatientListProps = {
  pasienter: Pasient[]
}

export function PatientList({ pasienter }: PatientListProps) {
  const { sok, setSok, kjonnFilter, setKjonnFilter, filtrertePasienter } =
    usePatientFilter(pasienter)

  return (
    <div>
      <div className="mb-6 flex gap-3">
        <input
          type="text"
          value={sok}
          onChange={(e) => setSok(e.target.value)}
          placeholder="Søk etter navn eller diagnose..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={kjonnFilter}
          onChange={(e) =>
            setKjonnFilter(e.target.value as 'alle' | 'mann' | 'kvinne')
          }
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="alle">Alle</option>
          <option value="mann">Mann</option>
          <option value="kvinne">Kvinne</option>
        </select>
      </div>

      {filtrertePasienter.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Ingen pasienter funnet
        </p>
      ) : (
        <div className="grid gap-3">
          {filtrertePasienter.map((pasient) => (
            <PatientCard key={pasient.id} pasient={pasient} />
          ))}
        </div>
      )}
    </div>
  )
}
