/* eslint-disable react-hooks/set-state-in-effect --
 * Modules 3 and 4 remove these effects entirely. Disabled on the starter so
 * `npm run lint` passes; remove this directive once those modules are done.
 */
import { useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Textarea,
  cn,
} from '@medix/ui'
import {
  fetchJournals,
  fetchPatients,
  createJournal,
  updateJournalStatus,
} from './lib/api'
import type { Journal, JournalStatus, Patient } from './types'

// TODO Module 1: Break this monolith into focused components.
// Suggested split (under `features/patients/` and `features/journal/`):
//   - PatientList    : search + filter + list rendering
//   - PatientCard    : one row in the list
//   - PatientHeader  : the selected-patient header card
//   - JournalList    : journal entries for the selected patient
//   - JournalEntry   : one entry + its status select
//   - JournalForm    : the "new entry" form
// Move the inline `STATUS_STYLES` map below into a `<StatusBadge>` in
// `@medix/ui` so medix.com can use it too.

type PatientPageProps = {
  onError: (error: Error) => void
}

export function PatientPage({ onError }: PatientPageProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(true)

  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>(
    'all',
  )

  const [selectedId, setSelectedId] = useState<string | null>(null)

  // TODO Module 4: Replace useEffect + fetch with `useQuery`.
  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .catch((err) => onError(err))
      .finally(() => setIsLoadingPatients(false))
  }, [onError])

  // TODO Module 3: This effect *syncs* `selectedPatient` with `selectedId`.
  // Don't store derived data in state — compute `selectedPatient` from
  // `patients` and `selectedId` directly during render.
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  useEffect(() => {
    setSelectedPatient(patients.find((p) => p.id === selectedId) ?? null)
  }, [patients, selectedId])

  // TODO Module 3: This filter logic is reused logic that should live in a hook.
  // Extract it to `usePatientFilter(patients)` returning
  // `{ search, setSearch, genderFilter, setGenderFilter, filteredPatients }`.
  // Bonus: debounce the search term (`useDebounce`) before filtering.
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase())
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  if (isLoadingPatients) return <Spinner />

  if (selectedPatient) {
    return (
      <PatientDetail
        patient={selectedPatient}
        onBack={() => setSelectedId(null)}
        onError={onError}
      />
    )
  }

  return (
    <div>
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
        <p className="text-sm text-muted-foreground">
          {filteredPatients.length} of {patients.length} patients
        </p>
      </header>

      <div className="mb-6 flex gap-3">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or diagnosis..."
          className="flex-1"
        />
        <Select
          value={genderFilter}
          onValueChange={(value) =>
            setGenderFilter(value as 'all' | 'male' | 'female')
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredPatients.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No patients found
        </p>
      ) : (
        <div className="grid gap-3">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              type="button"
              onClick={() => setSelectedId(patient.id)}
              className="block w-full text-left text-inherit no-underline"
            >
              <Card className="transition-shadow hover:shadow-md cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {calculateAge(patient.dateOfBirth)} years ·{' '}
                        {patient.gender === 'male' ? 'Male' : 'Female'}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ID: {patient.id}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {patient.diagnosis}
                  </p>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function calculateAge(dateOfBirth: string): number {
  const born = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - born.getFullYear()
  const month = today.getMonth() - born.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < born.getDate())) {
    age--
  }
  return age
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// --- Detail view ----------------------------------------------------------

function PatientDetail({
  patient,
  onBack,
  onError,
}: {
  patient: Patient
  onBack: () => void
  onError: (error: Error) => void
}) {
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // TODO Module 4: Replace with `useQuery({ queryKey: ['journals', patient.id], ... })`.
  // For Suspense-driven loading, also wrap this whole detail in <Suspense>
  // + a contextual <ErrorBoundary>.
  useEffect(() => {
    setIsLoading(true)
    fetchJournals(patient.id)
      .then((data) => setJournals(data))
      .catch((err) => onError(err))
      .finally(() => setIsLoading(false))
  }, [patient.id, onError])

  function handleStatusChange(journalId: string, status: JournalStatus) {
    // TODO Module 4: Switch to `useMutation` + `queryClient.invalidateQueries`.
    updateJournalStatus(journalId, status)
      .then(() => fetchJournals(patient.id).then(setJournals))
      .catch((err) => onError(err))
  }

  function handleCreated(journal: Journal) {
    setJournals((prev) => [journal, ...prev])
  }

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        ← Back to patient list
      </button>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {patient.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Born: {formatDate(patient.dateOfBirth)} ·{' '}
                {patient.gender === 'male' ? 'Male' : 'Female'}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs text-muted-foreground">Patient ID</p>
              <p className="font-mono text-sm font-medium">{patient.id}</p>
            </div>
          </div>
          <div className="mt-4">
            <Badge variant="secondary" className="text-sm">
              {patient.diagnosis}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Journal entries</h2>
          {isLoading ? (
            <Spinner />
          ) : journals.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No journal entries yet
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {journals.map((entry) => (
                <JournalEntry
                  key={entry.id}
                  entry={entry}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <JournalForm patientId={patient.id} onCreated={handleCreated} />
        </div>
      </div>
    </div>
  )
}

// --- Status styling -------------------------------------------------------
// TODO Module 1: Move this into `@medix/ui` as `<StatusBadge status={...} />`
// (the same component is referenced in apps/medix.com).
const STATUS_STYLES: Record<JournalStatus, string> = {
  active:
    'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
  closed: 'bg-muted text-muted-foreground border-transparent',
  draft:
    'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
}
const STATUS_LABEL: Record<JournalStatus, string> = {
  active: 'Active',
  closed: 'Closed',
  draft: 'Draft',
}

const statusOptions: { value: JournalStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
]

function JournalEntry({
  entry,
  onStatusChange,
}: {
  entry: Journal
  onStatusChange: (id: string, status: JournalStatus) => void
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold leading-none tracking-tight">
              {entry.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(entry.date)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={cn(
                'inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium',
                STATUS_STYLES[entry.status],
              )}
            >
              {STATUS_LABEL[entry.status]}
            </span>
            <Select
              value={entry.status}
              onValueChange={(value) =>
                onStatusChange(entry.id, value as JournalStatus)
              }
            >
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {entry.content}
        </p>
      </CardContent>
    </Card>
  )
}

// --- Form -----------------------------------------------------------------

function JournalForm({
  patientId,
  onCreated,
}: {
  patientId: string
  onCreated: (j: Journal) => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // TODO Module 5: Replace this uncontrolled form with React Hook Form + Zod.
  // - Define a Zod schema for { title, date, content } with minimum lengths.
  // - Show per-field errors.
  // - Disable submit while invalid or submitting.
  // - Use the `<DatePicker>` from `@medix/ui` via `<Controller>`.
  // - Surface server errors meaningfully.
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const title = String(formData.get('title') ?? '').trim()
    const date = String(formData.get('date') ?? '')
    const content = String(formData.get('content') ?? '').trim()

    if (!title || !date || !content) {
      setError('All fields are required.')
      return
    }

    setIsSubmitting(true)
    try {
      const journal = await createJournal(patientId, { title, date, content })
      onCreated(journal)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-lg font-semibold">New journal entry</h2>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="mb-4 space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Short description of the entry"
        />
      </div>

      <div className="mb-4 space-y-1">
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" />
      </div>

      <div className="mb-6 space-y-1">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          rows={5}
          placeholder="Clinical observations, interventions, and assessments..."
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save entry'}
      </Button>
    </form>
  )
}
