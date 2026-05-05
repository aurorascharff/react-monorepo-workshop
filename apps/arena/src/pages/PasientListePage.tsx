import { useQuery } from '@tanstack/react-query'
import { hentPasienter } from '../lib/api'
import { PatientList } from '../features/patients/components/PatientList'
import { Spinner } from '../components/Spinner'

export function PasientListePage() {
  const {
    data: pasienter,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['patients'],
    queryFn: hentPasienter,
  })

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Pasientliste</h1>
      <div className="flex flex-col gap-4">
        {isLoading && <Spinner />}
        {error && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive text-sm">
            Kunne ikke hente pasienter: {error.message}
          </div>
        )}
        {pasienter && <PatientList pasienter={pasienter} />}
      </div>
    </div>
  )
}
