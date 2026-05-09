/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Spinner } from '@medix/ui'
import { JournalForm } from '../features/journal/components/JournalForm'
import { JournalList } from '../features/journal/components/JournalList'
import { PatientHeader } from '../features/patients/components/PatientHeader'
import { fetchPatient } from '../lib/api'
import type { Patient } from '../types'

export function PatientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    setIsLoading(true)
    fetchPatient(id)
      .then((data) => setPatient(data))
      .finally(() => setIsLoading(false))
  }, [id])

  if (!id) return null

  return (
    <div>
      <Link
        to="/patients"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to patient list
      </Link>

      {isLoading && <Spinner />}
      {patient && (
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
      )}
    </div>
  )
}
