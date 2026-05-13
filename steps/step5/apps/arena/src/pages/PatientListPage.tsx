import { PatientList } from '@/features/patients/components/PatientList'

export function PatientListPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Patients</h1>
      <PatientList />
    </div>
  )
}
