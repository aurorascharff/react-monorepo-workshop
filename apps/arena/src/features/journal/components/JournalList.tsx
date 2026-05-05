import { useQuery } from '@tanstack/react-query'
import { hentJournaler } from '../../../lib/api'
import { JournalEntry } from './JournalEntry'
import { Spinner } from '../../../components/Spinner'
import { ErrorBoundary } from '../../../components/ErrorBoundary'

type JournalListProps = {
  pasientId: string
}

export function JournalList({ pasientId }: JournalListProps) {
  const { data: journaler, isLoading, error } = useQuery({
    queryKey: ['journals', pasientId],
    queryFn: () => hentJournaler(pasientId),
  })

  if (isLoading) return <Spinner />

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-800">
        Kunne ikke laste journaler: {error.message}
      </div>
    )
  }

  if (!journaler || journaler.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        Ingen journaloppføringer ennå
      </p>
    )
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-4">
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
