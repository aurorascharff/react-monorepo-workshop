import { OpenAPIHono, createRoute } from '@hono/zod-openapi'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { patients } from '../db/schema'
import { ErrorSchema, IdParam, PatientSchema } from '../schemas'

export const patientsRouter = new OpenAPIHono()

const listRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['Patients'],
  summary: 'List all patients',
  responses: {
    200: {
      content: { 'application/json': { schema: PatientSchema.array() } },
      description: 'Array of patients',
    },
  },
})

patientsRouter.openapi(listRoute, async (c) => {
  const all = await db.select().from(patients)
  return c.json(all, 200)
})

const getRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['Patients'],
  summary: 'Get a patient by id',
  request: { params: IdParam },
  responses: {
    200: {
      content: { 'application/json': { schema: PatientSchema } },
      description: 'The patient',
    },
    404: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Patient not found',
    },
  },
})

patientsRouter.openapi(getRoute, async (c) => {
  const { id } = c.req.valid('param')
  const patient = await db
    .select()
    .from(patients)
    .where(eq(patients.id, id))
    .get()

  if (!patient) {
    return c.json({ error: 'Patient not found' }, 404)
  }
  return c.json(patient, 200)
})
