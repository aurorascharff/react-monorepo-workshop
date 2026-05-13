import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateJournalStatus } from '@/lib/api'
import { logError } from '@/lib/logger'
import type { JournalStatus } from '@/types'

export function useUpdateJournalStatus(entryId: string, patientId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (status: JournalStatus) => updateJournalStatus(entryId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals', patientId] })
    },
    onError: (error) => {
      logError(error, 'Journal status mutation failed')
    },
  })
}
