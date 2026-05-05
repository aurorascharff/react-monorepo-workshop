import { useQuery } from '@tanstack/react-query'
import { hentPasienter } from '../lib/api'
import { PatientList } from './features/patients/components/PatientList'
import { Spinner } from './components/Spinner'
import { ErrorBoundary } from './components/ErrorBoundary'

export function PasientListePage() {
  const { data: pasienter, isLoading, error } = useQuery({
    queryKey: ['patients'],
    queryFn: hentPasienter,
  })

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Pasientliste</h1>
      <ErrorBoundary>
        {isLoading && <Spinner />}
        {error && (
          <div className="rounded-md bg-red-50 p-4 text-red-800">
            Kunne ikke hente pasienter: {error.message}
          </div>
        )}
        {pasienter && <PatientList pasienter={pasienter} />}
      </ErrorBoundary>
    </div>
  )
}
