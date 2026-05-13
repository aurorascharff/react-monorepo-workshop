import {
  Input,
  Label,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@medix/ui'
import { usePatients } from '../hooks/usePatients'
import { usePatientFilter } from '../hooks/usePatientFilter'
import { PatientCard } from './PatientCard'
import { ErrorState } from '@/components/ErrorState'

export function PatientList() {
  const { data: patients, isLoading, error } = usePatients()
  const { search, setSearch, genderFilter, setGenderFilter, filteredPatients } =
    usePatientFilter(patients ?? [])

  if (isLoading) return <PatientListSkeleton />

  if (error) {
    return (
      <ErrorState
        title="Patient list is unavailable"
        message="We could not load the patient list right now. Try refreshing the page."
        error={error}
        logContext="Patient list query failed"
      />
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          <Label htmlFor="patient-search">Search patients</Label>
          <Input
            id="patient-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or diagnosis..."
          />
        </div>
        <div className="flex flex-col gap-2 sm:w-40">
          <Label htmlFor="gender-filter">Gender</Label>
          <Select
            value={genderFilter}
            onValueChange={(value) =>
              setGenderFilter(value as 'all' | 'male' | 'female')
            }
          >
            <SelectTrigger id="gender-filter">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4 flex min-h-9 items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {filteredPatients.length} patient
          {filteredPatients.length === 1 ? '' : 's'} shown
        </p>
      </div>

      {filteredPatients.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No patients found
        </p>
      ) : (
        <div className="grid gap-3">
          {filteredPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      )}
    </div>
  )
}

export function PatientListSkeleton() {
  return (
    <section role="status" aria-label="Loading patients" className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2 sm:w-40">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="grid gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between gap-4 p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-56" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
