import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@klinikk/ui'
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
        <Input
          type="text"
          value={sok}
          onChange={(e) => setSok(e.target.value)}
          placeholder="Søk etter navn eller diagnose..."
          className="flex-1"
        />
        <Select
          value={kjonnFilter}
          onValueChange={(value) =>
            setKjonnFilter(value as 'alle' | 'mann' | 'kvinne')
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle</SelectItem>
            <SelectItem value="mann">Mann</SelectItem>
            <SelectItem value="kvinne">Kvinne</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtrertePasienter.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Ingen pasienter funnet</p>
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
