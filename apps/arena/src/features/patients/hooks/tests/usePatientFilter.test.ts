import { renderHook } from '@testing-library/react'
import type { Patient } from '@/types'
import { usePatientFilter } from '../usePatientFilter'

const patients: Patient[] = [
  {
    id: '1',
    name: 'Alice Andersen',
    dateOfBirth: '1990-01-01',
    gender: 'female',
    diagnosis: 'Asthma',
  },
  {
    id: '2',
    name: 'Bob Berg',
    dateOfBirth: '1985-05-12',
    gender: 'male',
    diagnosis: 'Hypertension',
  },
  {
    id: '3',
    name: 'Carla Carlsen',
    dateOfBirth: '1978-09-22',
    gender: 'female',
    diagnosis: 'Diabetes',
  },
]

describe('usePatientFilter', () => {
  it('returns all patients when no filters are applied', () => {
    const { result } = renderHook(() =>
      usePatientFilter(patients, { search: '', genderFilter: 'all' }),
    )
    expect(result.current.filteredPatients).toHaveLength(3)
  })

  it('filters by gender', () => {
    const { result } = renderHook(() =>
      usePatientFilter(patients, { search: '', genderFilter: 'male' }),
    )

    expect(result.current.filteredPatients).toHaveLength(1)
    expect(result.current.filteredPatients[0].name).toBe('Bob Berg')
  })

  it('filters by debounced search across name and diagnosis', () => {
    const { result } = renderHook(() =>
      usePatientFilter(patients, { search: 'diabetes', genderFilter: 'all' }),
    )

    expect(result.current.filteredPatients).toHaveLength(1)
    expect(result.current.filteredPatients[0].name).toBe('Carla Carlsen')
  })

  it('combines search and gender filters', () => {
    const { result } = renderHook(() =>
      usePatientFilter(patients, { search: 'a', genderFilter: 'female' }),
    )

    expect(result.current.filteredPatients.map((p) => p.name)).toEqual([
      'Alice Andersen',
      'Carla Carlsen',
    ])
  })
})
