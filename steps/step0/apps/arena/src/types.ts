// In Module 1 we extract `JournalStatus` (and a `<StatusBadge>` wrapper)
// into `@medix/ui` so both apps share one source of truth.
export type JournalStatus = 'active' | 'closed' | 'draft'

export type Patient = {
  id: string
  name: string
  dateOfBirth: string
  gender: 'male' | 'female'
  diagnosis: string
}

export type Journal = {
  id: string
  patientId: string
  title: string
  date: string
  content: string
  status: JournalStatus
}
