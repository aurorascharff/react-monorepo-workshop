import type { Patient, Journal, JournalStatus } from '@/types'

const BASE_URL = 'http://localhost:3001'

export async function fetchPatients(): Promise<Patient[]> {
  const res = await fetch(`${BASE_URL}/patients`)
  if (!res.ok) throw new Error('Failed to fetch patients')
  return res.json()
}

export async function fetchPatient(id: string): Promise<Patient> {
  const res = await fetch(`${BASE_URL}/patients/${id}`)
  if (!res.ok) throw new Error('Failed to fetch patient')
  return res.json()
}

export async function fetchJournals(patientId: string): Promise<Journal[]> {
  const res = await fetch(`${BASE_URL}/journals/patient/${patientId}`)
  if (!res.ok) throw new Error('Failed to fetch journal entries')
  return res.json()
}

export type NewJournal = {
  title: string
  date: string
  content: string
}

export async function createJournal(
  patientId: string,
  data: NewJournal,
): Promise<Journal> {
  const res = await fetch(`${BASE_URL}/journals/patient/${patientId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(
      (err as { error?: string }).error ?? 'Failed to create journal entry',
    )
  }
  return res.json()
}

export async function updateJournalStatus(
  journalId: string,
  status: JournalStatus,
): Promise<Journal> {
  const res = await fetch(`${BASE_URL}/journals/${journalId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update status')
  return res.json()
}
