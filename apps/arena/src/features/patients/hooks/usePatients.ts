import { useQuery } from '@tanstack/react-query'
import { fetchPatients } from '@/lib/api'

/**
 * Shared hook for the patient list query.
 * Used by DashboardPage, PatientListPage, and any other consumer
 * — results are cached and deduplicated by TanStack Query.
 */
export function usePatients() {
  return useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  })
}
