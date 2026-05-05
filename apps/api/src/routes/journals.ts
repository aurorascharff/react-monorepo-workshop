import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { db } from '../db'
import { journals } from '../db/schema'
import {
  ErrorSchema,
  IdParam,
  JournalSchema,
  NewJournalSchema,
  PasientIdParam,
  UpdateStatusSchema,
} from '../schemas'

export const journalsRouter = new OpenAPIHono()

const listForPatientRoute = createRoute({
  method: 'get',
  path: '/pasient/{pasientId}',
  tags: ['Journals'],
  summary: 'List journal entries for a patient',
  request: { params: PasientIdParam },
  responses: {
    200: {
      content: { 'application/json': { schema: JournalSchema.array() } },
      description: 'Journal entries',
    },
  },
})

journalsRouter.openapi(listForPatientRoute, async (c) => {
  const { pasientId } = c.req.valid('param')
  const entries = await db
    .select()
    .from(journals)
    .where(eq(journals.pasientId, pasientId))
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
  path: '/pasient/{pasientId}',
  tags: ['Journals'],
  summary: 'Create a new journal entry',
  request: {
    params: PasientIdParam,
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
  const { pasientId } = c.req.valid('param')
  const body = c.req.valid('json')

  const ny = {
    id: randomUUID(),
    pasientId,
    tittel: body.tittel,
    dato: body.dato,
    innhold: body.innhold,
    status: 'utkast' as const,
  }

  await db.insert(journals).values(ny)
  return c.json(ny, 201)
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
