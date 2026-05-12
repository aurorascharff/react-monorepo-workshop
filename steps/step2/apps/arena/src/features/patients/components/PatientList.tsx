import { useEffect, useState } from 'react'
import {
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@medix/ui'
import { PatientCard } from './PatientCard'
import type { Patient } from '@/types'

type PatientListProps = {
  patients: Patient[]
}

export function PatientList({ patients }: PatientListProps) {
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>(
    'all',
  )

  const [filteredPatients, setFilteredPatients] = useState(patients)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredPatients(
      patients.filter((p) => {
        const matchesSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.diagnosis.toLowerCase().includes(search.toLowerCase())
        const matchesGender =
          genderFilter === 'all' || p.gender === genderFilter
        return matchesSearch && matchesGender
      }),
    )
  }, [patients, search, genderFilter])

  return (
    <div>
      <p className="mb-4 text-sm text-muted-foreground">
        {filteredPatients.length} of {patients.length} patients
      </p>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="patient-search">Search patients</Label>
          <Input
            id="patient-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or diagnosis..."
          />
        </div>
        <div className="flex flex-col gap-2 sm:w-40">
          <Label htmlFor="gender-filter">Gender</Label>
          <Select
            value={genderFilter}
            onValueChange={(value) =>
              setGenderFilter(value as 'all' | 'male' | 'female')
            }
          >
            <SelectTrigger id="gender-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
