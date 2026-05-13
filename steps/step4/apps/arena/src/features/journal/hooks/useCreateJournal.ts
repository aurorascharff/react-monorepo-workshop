import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createJournal } from '@/lib/api'
import { logError } from '@/lib/logger'

type NewJournalData = {
  title: string
  date: string
  content: string
}

export function useCreateJournal(patientId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: NewJournalData) => createJournal(patientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals', patientId] })
    },
    onError: (error) => {
      logError(error, 'Create journal mutation failed')
    },
  })
}
