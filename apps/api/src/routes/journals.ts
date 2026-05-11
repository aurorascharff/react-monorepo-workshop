import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { desc, eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { db } from '../db'
import { journals } from '../db/schema'
import {
  ErrorSchema,
  IdParam,
  JournalSchema,
  NewJournalSchema,
  PatientIdParam,
  UpdateStatusSchema,
} from '../schemas'

export const journalsRouter = new OpenAPIHono()

const listForPatientRoute = createRoute({
  method: 'get',
  path: '/patient/{patientId}',
  tags: ['Journals'],
  summary: 'List journal entries for a patient',
  request: { params: PatientIdParam },
  responses: {
    200: {
      content: { 'application/json': { schema: JournalSchema.array() } },
      description: 'Journal entries',
    },
  },
})

journalsRouter.openapi(listForPatientRoute, async (c) => {
  const { patientId } = c.req.valid('param')
  const entries = await db
    .select()
    .from(journals)
    .where(eq(journals.patientId, patientId))
    .orderBy(desc(journals.date))
  return c.json(entries, 200)
})

const getRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Journals'],
  summary: 'Get a journal entry by id',
  request: { params: IdParam },
  responses: {
    200: {
      content: { 'application/json': { schema: JournalSchema } },
      description: 'The journal entry',
    },
    404: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Not found',
    },
  },
})

journalsRouter.openapi(getRoute, async (c) => {
  const { id } = c.req.valid('param')
  const entry = await db
    .select()
    .from(journals)
    .where(eq(journals.id, id))
    .get()

  if (!entry) {
    return c.json({ error: 'Journal entry not found' }, 404)
  }
  return c.json(entry, 200)
})

const createRouteSpec = createRoute({
  method: 'post',
  path: '/patient/{patientId}',
  tags: ['Journals'],
  summary: 'Create a new journal entry',
  request: {
    params: PatientIdParam,
    body: {
      content: { 'application/json': { schema: NewJournalSchema } },
    },
  },
  responses: {
    201: {
      content: { 'application/json': { schema: JournalSchema } },
      description: 'Created',
    },
  },
})

journalsRouter.openapi(createRouteSpec, async (c) => {
  const { patientId } = c.req.valid('param')
  const body = c.req.valid('json')

  const entry = {
    id: randomUUID(),
    patientId,
    title: body.title,
    date: body.date,
    content: body.content,
    status: 'draft' as const,
  }

  await db.insert(journals).values(entry)
  return c.json(entry, 201)
})

const updateStatusRoute = createRoute({
  method: 'patch',
  path: '/{id}/status',
  tags: ['Journals'],
  summary: 'Update status on a journal entry',
  request: {
    params: IdParam,
    body: {
      content: { 'application/json': { schema: UpdateStatusSchema } },
    },
  },
  responses: {
    200: {
      content: { 'application/json': { schema: JournalSchema } },
      description: 'Updated',
    },
    404: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Not found',
    },
  },
})

journalsRouter.openapi(updateStatusRoute, async (c) => {
  const { id } = c.req.valid('param')
  const { status } = c.req.valid('json')

  const existing = await db
    .select()
    .from(journals)
    .where(eq(journals.id, id))
    .get()

  if (!existing) {
    return c.json({ error: 'Journal entry not found' }, 404)
  }

  await db.update(journals).set({ status }).where(eq(journals.id, id))
  return c.json({ ...existing, status }, 200)
})
