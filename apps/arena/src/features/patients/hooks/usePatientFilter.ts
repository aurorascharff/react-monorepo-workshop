import type { Patient } from '../../../types'
import { useDebounce } from '../../../hooks/useDebounce'

export type GenderFilter = 'all' | 'male' | 'female'

type PatientFilters = {
  search: string
  genderFilter: GenderFilter
}

export function usePatientFilter(
  patients: Patient[],
  { search, genderFilter }: PatientFilters,
) {
  const debouncedSearch = useDebounce(search, 300)

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(debouncedSearch.toLowerCase())
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  return { filteredPatients, isFilteringPending: search !== debouncedSearch }
}
