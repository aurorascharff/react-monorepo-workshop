import { PatientList } from '../features/patients/components/PatientList'
import { Spinner } from '@medix/ui'
import { usePatients } from '../features/patients/hooks/usePatients'

export function PatientListPage() {
  const { data: patients, isLoading, error } = usePatients()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Patients</h1>
      <div className="flex flex-col gap-4">
        {isLoading && <Spinner />}
        {error && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
            Failed to fetch patients: {error.message}
          </div>
        )}
        {patients && <PatientList patients={patients} />}
      </div>
    </div>
  )
}
