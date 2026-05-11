import { Suspense } from 'react'
import { useParams, Link } from 'react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Card, CardContent, Skeleton } from '@medix/ui'
import { fetchPatient } from '../lib/api'
import { PatientHeader } from '../features/patients/components/PatientHeader'
import {
  JournalList,
  JournalListLoadingState,
} from '../features/journal/components/JournalList'
import { JournalForm } from '../features/journal/components/JournalForm'
import { ErrorBoundary } from '../components/ErrorBoundary'

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
        title="Patient details are unavailable"
        message="We could not load this patient right now. Go back to the patient list or try refreshing the page."
        logContext="Patient detail query failed"
      >
        <Suspense fallback={<PatientDetailLoadingState />}>
          <PatientDetailContent id={id} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

function PatientDetailContent({ id }: { id: string }) {
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

export function PatientDetailLoadingState() {
  return (
    <section
      role="status"
      aria-label="Loading patient detail"
      className="space-y-6"
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="mt-4 h-7 w-36 rounded-full" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <Skeleton className="mb-4 h-6 w-40" />
          <JournalListLoadingState />
        </div>
        <div>
          <Skeleton className="mb-4 h-6 w-44" />
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-32 w-full" />
              </div>
              <Skeleton className="h-10 w-28" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
