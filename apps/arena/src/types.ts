import type { JournalStatus } from '@klinikk/ui'

export type Pasient = {
  id: string
  navn: string
  fodselsdato: string
  kjonn: 'mann' | 'kvinne'
  diagnose: string
}

export type JournalOppforing = {
  id: string
  pasientId: string
  tittel: string
  dato: string
  innhold: string
  status: JournalStatus
}
