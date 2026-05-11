/* eslint-disable react-hooks/set-state-in-effect */
import { type ReactEventHandler, useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Spinner,
  Textarea,
} from '@medix/ui'
import {
  fetchJournals,
  fetchPatients,
  createJournal,
  updateJournalStatus,
} from './lib/api'
import type { Journal, JournalStatus, Patient } from './types'

type PatientPageProps = {
  selectedId: string | null
  onSelectPatient: (id: string) => void
  onBack: () => void
}

export function PatientPage({
  selectedId,
  onSelectPatient,
  onBack,
}: PatientPageProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoadingPatients, setIsLoadingPatients] = useState(true)

  const [search, setSearch] = useState('')
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>(
    'all',
  )

  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .finally(() => setIsLoadingPatients(false))
  }, [])

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  useEffect(() => {
    setSelectedPatient(patients.find((p) => p.id === selectedId) ?? null)
  }, [patients, selectedId])

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase())
    const matchesGender = genderFilter === 'all' || p.gender === genderFilter
    return matchesSearch && matchesGender
  })

  if (isLoadingPatients) return <Spinner />

  if (selectedPatient) {
    return <PatientDetail patient={selectedPatient} onBack={onBack} />
  }

  return (
    <div>
      <header className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
        <p className="text-sm text-muted-foreground">
          {filteredPatients.length} of {patients.length} patients
        </p>
      </header>

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
          <select
            id="gender-filter"
            className="h-9 rounded-md border bg-background px-3 text-sm"
            value={genderFilter}
            onChange={(event) =>
              setGenderFilter(event.target.value as 'all' | 'male' | 'female')
            }
          >
            <option value="all">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
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
              onClick={() => onSelectPatient(patient.id)}
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
}: {
  patient: Patient
  onBack: () => void
}) {
  const [journals, setJournals] = useState<Journal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetchJournals(patient.id)
      .then((data) => setJournals(data))
      .finally(() => setIsLoading(false))
  }, [patient.id])

  function handleStatusChange(journalId: string, status: JournalStatus) {
    updateJournalStatus(journalId, status).then(() =>
      fetchJournals(patient.id).then(setJournals),
    )
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
            <select
              className="h-9 w-36 rounded-md border bg-background px-3 text-sm font-medium"
              aria-label={`Change status for ${entry.title}`}
              value={entry.status}
              onChange={(event) =>
                onStatusChange(entry.id, event.target.value as JournalStatus)
              }
            >
              {statusOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
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

  const handleSubmit: ReactEventHandler<HTMLFormElement> = async (event) => {
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
    <section>
      <h2 className="mb-4 text-lg font-semibold">New journal entry</h2>

      <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6">
        {error && (
          <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mb-4 space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Short description of the entry"
          />
        </div>

        <div className="mb-4 space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" />
        </div>

        <div className="mb-6 space-y-2">
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
    </section>
  )
}
