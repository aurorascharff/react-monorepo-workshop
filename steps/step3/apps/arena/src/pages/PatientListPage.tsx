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

  if (isLoading) return <Spinner />

  return <PatientList patients={patients} />
}
