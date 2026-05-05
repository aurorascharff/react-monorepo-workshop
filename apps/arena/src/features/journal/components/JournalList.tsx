import { useQuery } from '@tanstack/react-query'
import { hentJournaler } from '../../../lib/api'
import { JournalEntry } from './JournalEntry'
import { Spinner } from '../../../components/Spinner'
import { ErrorBoundary } from '../../../components/ErrorBoundary'

type JournalListProps = {
  pasientId: string
}

export function JournalList({ pasientId }: JournalListProps) {
  const {
    data: journaler,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['journals', pasientId],
    queryFn: () => hentJournaler(pasientId),
  })

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
        Kunne ikke laste journaler: {error.message}
      </div>
    )
  }

  if (!journaler || journaler.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        Ingen journaloppføringer ennå
      </p>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-3">
        {journaler.map((oppforing) => (
          <JournalEntry
            key={oppforing.id}
            oppforing={oppforing}
            pasientId={pasientId}
          />
        ))}
      </div>
    </ErrorBoundary>
  )
}
