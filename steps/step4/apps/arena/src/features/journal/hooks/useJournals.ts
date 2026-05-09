import { useQuery } from '@tanstack/react-query'
import { fetchJournals } from '../../../lib/api'

export function useJournals(patientId: string) {
  return useQuery({
    queryKey: ['journals', patientId],
    queryFn: () => fetchJournals(patientId),
  })
}
