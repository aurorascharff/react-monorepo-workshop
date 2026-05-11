import {
  PatientList,
  PatientListSkeleton,
} from '@/features/patients/components/PatientList'
import { usePatients } from '@/features/patients/hooks/usePatients'
import { ErrorState } from '@/components/ErrorState'

export function PatientListPage() {
  const { data: patients, isLoading, error } = usePatients()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Patients</h1>
      <div className="flex flex-col gap-4">
        {isLoading && <PatientListSkeleton />}
        {error && (
          <ErrorState
            title="Patient list is unavailable"
            message="We could not load the patient list right now. Try refreshing the page."
            error={error}
            logContext="Patient list query failed"
          />
        )}
        {patients && <PatientList patients={patients} />}
      </div>
    </div>
  )
}
