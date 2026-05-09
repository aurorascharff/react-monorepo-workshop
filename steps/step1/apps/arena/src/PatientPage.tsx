/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { Spinner } from '@medix/ui'
import { fetchPatients } from './lib/api'
import { JournalForm } from './features/journal/components/JournalForm'
import { JournalList } from './features/journal/components/JournalList'
import { PatientHeader } from './features/patients/components/PatientHeader'
import { PatientList } from './features/patients/components/PatientList'
import type { Patient } from './types'

export function PatientPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .finally(() => setIsLoadingPatients(false))
  }, [])

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  useEffect(() => {
    setSelectedPatient(patients.find((p) => p.id === selectedId) ?? null)
  }, [patients, selectedId])

  if (isLoadingPatients) return <Spinner />

  if (selectedPatient) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setSelectedId(null)}
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to patient list
        </button>

        <PatientHeader patient={selectedPatient} />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-semibold">Journal entries</h2>
            <JournalList patientId={selectedPatient.id} />
          </div>
          <div>
            <JournalForm patientId={selectedPatient.id} />
          </div>
        </div>
      </div>
    )
  }

  return <PatientList patients={patients} onSelect={setSelectedId} />
}
