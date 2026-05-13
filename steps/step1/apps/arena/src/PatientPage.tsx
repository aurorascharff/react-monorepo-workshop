import { useEffect, useState } from 'react'
import { Spinner } from '@medix/ui'
import { fetchJournals, fetchPatients, updateJournalStatus } from './lib/api'
import { ErrorBoundary } from './components/ErrorBoundary'
import { JournalForm } from './features/journal/components/JournalForm'
import { JournalList } from './features/journal/components/JournalList'
import { PatientHeader } from './features/patients/components/PatientHeader'
import { PatientList } from './features/patients/components/PatientList'
import type { Journal, JournalStatus, Patient } from './types'

type PatientPageProps = {
  selectedId: string | null
  onSelectPatient: (id: string) => void
  onBack: () => void
}

export function PatientPage({
  selectedId,
  onSelectPatient,
  onBack,
}: PatientPageProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(true)

  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .finally(() => setIsLoadingPatients(false))
  }, [])

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedPatient(patients.find((p) => p.id === selectedId) ?? null)
  }, [patients, selectedId])

  if (isLoadingPatients) return <Spinner />

  if (selectedPatient) {
    return (
      <ErrorBoundary
        title="Patient details are unavailable"
        message="We could not show this patient right now. Go back to the patient list or refresh the page."
        logContext="Patient detail boundary"
      >
        <PatientDetail patient={selectedPatient} onBack={onBack} />
      </ErrorBoundary>
    )
  }

  return <PatientList patients={patients} onSelect={onSelectPatient} />
}

function PatientDetail({
  patient,
  onBack,
}: {
  patient: Patient
  onBack: () => void
}) {
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoadingJournals, setIsLoadingJournals] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoadingJournals(true)
    fetchJournals(patient.id)
      .then((data) => setJournals(data))
      .finally(() => setIsLoadingJournals(false))
  }, [patient.id])

  function handleStatusChange(journalId: string, status: JournalStatus) {
    updateJournalStatus(journalId, status).then(() =>
      setJournals((entries) =>
        entries.map((j) => (j.id === journalId ? { ...j, status } : j)),
      ),
    )
  }

  function handleCreated(journal: Journal) {
    setJournals((entries) => [journal, ...entries])
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to patient list
      </button>

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
          <JournalForm patientId={patient.id} onCreated={handleCreated} />
        </div>
      </div>
    </div>
  )
}
