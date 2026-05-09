import { useJournals } from '../hooks/useJournals'
import { JournalEntry } from './JournalEntry'
import { Spinner } from '@medix/ui'
import { ErrorBoundary } from '../../../components/ErrorBoundary'

type JournalListProps = {
  patientId: string
}

export function JournalList({ patientId }: JournalListProps) {
  const { data: entries, isLoading, error } = useJournals(patientId)

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
        Failed to load journal entries: {error.message}
      </div>
    )
  }

  if (!entries || entries.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No journal entries yet
      </p>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <JournalEntry
            key={entry.id}
            entry={entry}
            patientId={patientId}
          />
        ))}
      </div>
    </ErrorBoundary>
  )
}
