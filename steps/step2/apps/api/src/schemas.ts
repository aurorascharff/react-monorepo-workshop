import { z } from '@hono/zod-openapi'

export const PatientSchema = z
  .object({
    id: z.string().openapi({ example: 'p1' }),
    name: z.string().openapi({ example: 'Mary Smith' }),
    dateOfBirth: z.string().openapi({ example: '1980-04-12' }),
    gender: z.enum(['male', 'female']).openapi({ example: 'female' }),
    diagnosis: z.string().openapi({ example: 'Hypertension' }),
  })
  .openapi('Patient')

export const JournalStatusSchema = z
  .enum(['active', 'closed', 'draft'])
  .openapi('JournalStatus')

export const JournalSchema = z
  .object({
    id: z.string().openapi({ example: 'j1' }),
    patientId: z.string().openapi({ example: 'p1' }),
    title: z.string().openapi({ example: 'Follow-up appointment' }),
    date: z.string().openapi({ example: '2026-04-30' }),
    content: z.string().openapi({ example: 'Patient attended follow-up...' }),
    status: JournalStatusSchema,
  })
  .openapi('Journal')

export const NewJournalSchema = z
  .object({
    title: z.string().min(1).max(100).openapi({ example: 'Follow-up' }),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
      .openapi({ example: '2026-04-30' }),
    content: z
      .string()
      .min(10)
      .openapi({ example: 'Patient attended follow-up...' }),
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

export const PatientIdParam = z.object({
  patientId: z.string().openapi({
    param: { name: 'patientId', in: 'path' },
    example: 'p1',
  }),
})
