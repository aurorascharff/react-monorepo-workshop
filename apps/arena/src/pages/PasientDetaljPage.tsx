import { Suspense } from 'react'
import { useParams, Link } from 'react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { hentPasient } from '../lib/api'
import { PatientHeader } from '../features/patients/components/PatientHeader'
import { JournalList } from '../features/journal/components/JournalList'
import { JournalForm } from '../features/journal/components/JournalForm'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Spinner } from '../components/Spinner'

function PasientDetalj({ id }: { id: string }) {
  const { data: pasient } = useSuspenseQuery({
    queryKey: ['patient', id],
    queryFn: () => hentPasient(id),
  })

  return (
    <>
      <PatientHeader pasient={pasient} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Journaloppføringer</h2>
          <JournalList pasientId={id} />
        </div>
        <div>
          <JournalForm pasientId={id} />
        </div>
      </div>
    </>
  )
}

export function PasientDetaljPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) return null

  return (
    <div>
      <Link
        to="/pasienter"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Tilbake til pasientliste
      </Link>
      <ErrorBoundary
        fallback={(error) => (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            <p className="font-semibold">Kunne ikke laste pasient</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}
      >
        <Suspense fallback={<Spinner />}>
          <PasientDetalj id={id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
