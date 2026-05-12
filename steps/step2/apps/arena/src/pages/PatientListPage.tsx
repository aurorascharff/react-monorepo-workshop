import { useEffect, useState } from 'react'
import { Spinner } from '@medix/ui'
import { PatientList } from '@/features/patients/components/PatientList'
import { fetchPatients } from '@/lib/api'
import type { Patient } from '@/types'

export function PatientListPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Patients</h1>
      {isLoading ? <Spinner /> : <PatientList patients={patients} />}
    </div>
  )
}
