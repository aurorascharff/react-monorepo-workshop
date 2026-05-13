import { useJournals } from '../hooks/useJournals'
import { JournalEntry } from './JournalEntry'
import { Card, CardContent, Skeleton } from '@medix/ui'
import { ErrorState } from '@/components/ErrorState'

type JournalListProps = {
  patientId: string
}

export function JournalList({ patientId }: JournalListProps) {
  const { data: entries, isLoading, error } = useJournals(patientId)

  if (isLoading) return <JournalListSkeleton />

  if (error) {
    return (
      <ErrorState
        title="Journal entries are unavailable"
        message="We could not load the journal entries for this patient. Try refreshing the page."
        error={error}
        logContext="Journal entries query failed"
      />
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
    <div className="flex flex-col gap-3">
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} patientId={patientId} />
      ))}
    </div>
  )
}

export function JournalListSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading journal entries"
      className="flex flex-col gap-3"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-9 w-36" />
            </div>
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
