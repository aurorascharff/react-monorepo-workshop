import {
  Button,
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
import { useSearchParams } from 'react-router'
import { usePatientFilter } from '../hooks/usePatientFilter'
import type { GenderFilter } from '../hooks/usePatientFilter'
import { PatientCard } from './PatientCard'
import type { Patient } from '@/types'

type PatientListProps = {
  patients: Patient[]
}

export function PatientList({ patients }: PatientListProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''
  const genderFilter = parseGenderFilter(searchParams.get('gender'))
  const { filteredPatients, isFilteringPending } = usePatientFilter(patients, {
    search,
    genderFilter,
  })
  const hasFilters = search !== '' || genderFilter !== 'all'

  function updateFilters(next: {
    search?: string
    genderFilter?: GenderFilter
  }) {
    const params = new URLSearchParams(searchParams)
    const nextSearch = next.search ?? search
    const nextGenderFilter = next.genderFilter ?? genderFilter

    if (nextSearch) {
      params.set('search', nextSearch)
    } else {
      params.delete('search')
    }

    if (nextGenderFilter !== 'all') {
      params.set('gender', nextGenderFilter)
    } else {
      params.delete('gender')
    }

    setSearchParams(params, { replace: true })
  }

  function clearFilters() {
    setSearchParams({}, { replace: true })
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
            onChange={(e) => updateFilters({ search: e.target.value })}
            placeholder="Search by name or diagnosis..."
          />
        </div>
        <div className="flex flex-col gap-2 sm:w-40">
          <Label htmlFor="gender-filter">Gender</Label>
          <Select
            value={genderFilter}
            onValueChange={(value) =>
              updateFilters({ genderFilter: value as GenderFilter })
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
          {isFilteringPending
            ? 'Updating patient list...'
            : `${filteredPatients.length} patient${
                filteredPatients.length === 1 ? '' : 's'
              } shown`}
        </p>
        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            Clear filters
          </Button>
        )}
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

function parseGenderFilter(value: string | null): GenderFilter {
  if (value === 'male' || value === 'female') return value
  return 'all'
}
