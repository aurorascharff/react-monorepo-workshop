import { Suspense } from 'react'
import { useParams, Link } from 'react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchPatient } from '../lib/api'
import { PatientHeader } from '../features/patients/components/PatientHeader'
import { JournalList } from '../features/journal/components/JournalList'
import { JournalForm } from '../features/journal/components/JournalForm'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Spinner } from '@medix/ui'

function PatientDetail({ id }: { id: string }) {
  const { data: patient } = useSuspenseQuery({
    queryKey: ['patient', id],
    queryFn: () => fetchPatient(id),
  })

  return (
    <>
      <PatientHeader patient={patient} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Journal entries</h2>
          <JournalList patientId={id} />
        </div>
        <div>
          <JournalForm patientId={id} />
        </div>
      </div>
    </>
  )
}

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) return null

  return (
    <div>
      <Link
        to="/patients"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to patient list
      </Link>
      <ErrorBoundary
        fallback={(error) => (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            <p className="font-semibold">Failed to load patient</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}
      >
        <Suspense fallback={<Spinner />}>
          <PatientDetail id={id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
