import { useDeferredValue } from 'react'
import type { Patient } from '../../../types'

export type GenderFilter = 'all' | 'male' | 'female'

type PatientFilters = {
  search: string
  genderFilter: GenderFilter
}

export function usePatientFilter(
  patients: Patient[],
  { search, genderFilter }: PatientFilters,
) {
  const deferredSearch = useDeferredValue(search)

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(deferredSearch.toLowerCase())
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  return { filteredPatients, isFilteringPending: search !== deferredSearch }
}
