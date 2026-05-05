import type { JournalStatus } from '@klinikk/ui'
import type { Pasient, JournalOppforing } from '../types'

const BASE_URL = 'http://localhost:3001'

export async function hentPasienter(): Promise<Pasient[]> {
  const res = await fetch(`${BASE_URL}/patients`)
  if (!res.ok) throw new Error('Kunne ikke hente pasienter')
  return res.json()
}

export async function hentPasient(id: string): Promise<Pasient> {
  const res = await fetch(`${BASE_URL}/patients/${id}`)
  if (!res.ok) throw new Error('Kunne ikke hente pasient')
  return res.json()
}

export async function hentJournaler(
  pasientId: string,
): Promise<JournalOppforing[]> {
  const res = await fetch(`${BASE_URL}/journals/pasient/${pasientId}`)
  if (!res.ok) throw new Error('Kunne ikke hente journaler')
  return res.json()
}

export type NyJournal = {
  tittel: string
  dato: string
  innhold: string
}

export async function opprettJournal(
  pasientId: string,
  data: NyJournal,
): Promise<JournalOppforing> {
  const res = await fetch(`${BASE_URL}/journals/pasient/${pasientId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(
      (err as { error?: string }).error ?? 'Kunne ikke opprette journal',
    )
  }
  return res.json()
}

export async function oppdaterJournalStatus(
  journalId: string,
  status: JournalStatus,
): Promise<JournalOppforing> {
  const res = await fetch(`${BASE_URL}/journals/${journalId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Kunne ikke oppdatere status')
  return res.json()
}
