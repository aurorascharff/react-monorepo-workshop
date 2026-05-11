import { useQuery } from '@tanstack/react-query'
import { fetchPatients } from '../../../lib/api'

export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  })
}
