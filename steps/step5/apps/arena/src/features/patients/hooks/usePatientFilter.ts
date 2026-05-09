import { useState } from 'react'
import type { Patient } from '../../../types'
import { useDebounce } from '../../../hooks/useDebounce'

export function usePatientFilter(patients: Patient[]) {
  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>(
    'all',
  )

  const debouncedSearch = useDebounce(search, 300)

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(debouncedSearch.toLowerCase())
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  return { search, setSearch, genderFilter, setGenderFilter, filteredPatients }
}
