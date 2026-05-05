import { useState } from 'react'
import type { Patient } from '../../../types'

export function usePatientFilter(patients: Patient[]) {
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

  return { search, setSearch, genderFilter, setGenderFilter, filteredPatients }
}
