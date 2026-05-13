import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createJournal } from '@/lib/api'
import { logError } from '@/lib/logger'
import type { Journal } from '@/types'

type NewJournalData = {
  title: string
  date: string
  content: string
}

type CreateJournalContext = {
  previousEntries: Journal[] | undefined
  optimisticId: string
  submittedData: NewJournalData
}

export function useCreateJournal(patientId: string) {
  const queryClient = useQueryClient()
  const journalsKey = ['journals', patientId] as const

  return useMutation<Journal, Error, NewJournalData, CreateJournalContext>({
    mutationFn: (data) => createJournal(patientId, data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: journalsKey })

      const previousEntries = queryClient.getQueryData<Journal[]>(journalsKey)
      const optimisticId = `optimistic-${Date.now()}`

      queryClient.setQueryData<Journal[]>(journalsKey, (entries) =>
        sortJournalsByDate([
          {
            id: optimisticId,
            patientId,
            title: data.title,
            date: data.date,
            content: data.content,
            status: 'draft',
          },
          ...(entries ?? []),
        ]),
      )

      return { previousEntries, optimisticId, submittedData: data }
    },
    onError: (error, _data, context) => {
      logError(error, 'Create journal mutation failed')
      if (context) {
        queryClient.setQueryData<Journal[]>(
          journalsKey,
          context.previousEntries ?? [],
        )
      }
    },
    onSuccess: (createdEntry, _data, context) => {
      queryClient.setQueryData<Journal[]>(journalsKey, (entries) => {
        if (!entries) return [createdEntry]
        return sortJournalsByDate(
          entries.map((entry) =>
            entry.id === context?.optimisticId ? createdEntry : entry,
          ),
        )
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: journalsKey })
    },
  })
}

function sortJournalsByDate(entries: Journal[]) {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date))
}
