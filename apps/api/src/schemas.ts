import { z } from '@hono/zod-openapi'

export const PatientSchema = z
  .object({
    id: z.string().openapi({ example: 'p1' }),
    navn: z.string().openapi({ example: 'Kari Nordmann' }),
    fodselsdato: z.string().openapi({ example: '1980-04-12' }),
    kjonn: z.enum(['mann', 'kvinne']).openapi({ example: 'kvinne' }),
    diagnose: z.string().openapi({ example: 'Hypertensjon' }),
  })
  .openapi('Patient')

export const JournalStatusSchema = z
  .enum(['aktiv', 'avsluttet', 'utkast'])
  .openapi('JournalStatus')

export const JournalSchema = z
  .object({
    id: z.string().openapi({ example: 'j1' }),
    pasientId: z.string().openapi({ example: 'p1' }),
    tittel: z.string().openapi({ example: 'Kontrolltime' }),
    dato: z.string().openapi({ example: '2026-04-30' }),
    innhold: z.string().openapi({ example: 'Patient attended follow-up...' }),
    status: JournalStatusSchema,
  })
  .openapi('Journal')

export const NewJournalSchema = z
  .object({
    tittel: z.string().min(1).max(100).openapi({ example: 'Follow-up' }),
    dato: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .openapi({ example: '2026-04-30' }),
    innhold: z.string().min(10).openapi({ example: 'Patient attended follow-up...' }),
  })
  .openapi('NewJournal')

export const UpdateStatusSchema = z
  .object({
    status: JournalStatusSchema,
  })
  .openapi('UpdateStatus')

export const ErrorSchema = z
  .object({
    error: z.string().openapi({ example: 'Resource not found' }),
  })
  .openapi('Error')

export const IdParam = z.object({
  id: z.string().openapi({ param: { name: 'id', in: 'path' }, example: 'p1' }),
})

export const PasientIdParam = z.object({
  pasientId: z.string().openapi({
    param: { name: 'pasientId', in: 'path' },
    example: 'p1',
  }),
})
