import { useState } from 'react'
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@medix/ui'
import { PatientCard } from './PatientCard'
import type { Patient } from '../../../types'

type PatientListProps = {
  patients: Patient[]
}

export function PatientList({ patients }: PatientListProps) {
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>(
    'all',
  )

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase())
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  return (
    <div>
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
        <p className="text-sm text-muted-foreground">
          {filteredPatients.length} of {patients.length} patients
        </p>
      </header>

      <div className="mb-6 flex gap-3">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or diagnosis..."
          className="flex-1"
        />
        <Select
          value={genderFilter}
          onValueChange={(value) =>
            setGenderFilter(value as 'all' | 'male' | 'female')
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredPatients.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No patients found
        </p>
      ) : (
        <div className="grid gap-3">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  )
}
