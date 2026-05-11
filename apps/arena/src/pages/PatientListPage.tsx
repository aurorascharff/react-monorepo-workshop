import {
  PatientList,
  PatientListLoadingState,
} from '../features/patients/components/PatientList'
import { usePatients } from '../features/patients/hooks/usePatients'
import { ErrorState } from '../components/ErrorState'

export function PatientListPage() {
  const { data: patients, isLoading, error } = usePatients()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Patients</h1>
      <div className="flex flex-col gap-4">
        {isLoading && <PatientListLoadingState />}
        {error && (
          <ErrorState title="Failed to load patients" message={error.message} />
        )}
        {patients && <PatientList patients={patients} />}
      </div>
    </div>
  )
}
