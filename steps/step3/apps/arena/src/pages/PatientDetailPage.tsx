import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Spinner } from '@medix/ui'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { JournalForm } from '@/features/journal/components/JournalForm'
import { JournalList } from '@/features/journal/components/JournalList'
import { PatientHeader } from '@/features/patients/components/PatientHeader'
import { fetchJournals, fetchPatient, updateJournalStatus } from '@/lib/api'
import type { Journal, JournalStatus, Patient } from '@/types'

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingJournals, setIsLoadingJournals] = useState(true)

  useEffect(() => {
    if (!id) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    fetchPatient(id)
      .then((data) => setPatient(data))
      .finally(() => setIsLoading(false))
  }, [id])

  useEffect(() => {
    if (!id) return

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoadingJournals(true)
    fetchJournals(id)
      .then((data) => setJournals(data))
      .finally(() => setIsLoadingJournals(false))
  }, [id])

  if (!id) return null

  function handleStatusChange(journalId: string, status: JournalStatus) {
    if (!id) return

    updateJournalStatus(journalId, status).then(() =>
      fetchJournals(id).then(setJournals),
    )
  }

  function handleCreated(journal: Journal) {
    setJournals((prev) => [journal, ...prev])
  }

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
        message="We could not show this patient right now. Go back to the patient list or refresh the page."
        logContext="Patient detail boundary"
      >
        {isLoading && <Spinner />}
        {patient && (
          <>
            <PatientHeader patient={patient} />
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <h2 className="mb-4 text-lg font-semibold">Journal entries</h2>
                <JournalList
                  journals={journals}
                  isLoading={isLoadingJournals}
                  onStatusChange={handleStatusChange}
                />
              </div>
              <div>
                <JournalForm
                  key={id}
                  patientId={id}
                  onCreated={handleCreated}
                />
              </div>
            </div>
          </>
        )}
      </ErrorBoundary>
    </div>
  )
}
