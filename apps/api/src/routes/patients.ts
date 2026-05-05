import { Hono } from 'hono'
import { db } from '../db'
import { patients } from '../db/schema'
import { eq } from 'drizzle-orm'

export const patientsRouter = new Hono()

patientsRouter.get('/', async (c) => {
  const allPatients = await db.select().from(patients)
  return c.json(allPatients)
})

patientsRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const patient = await db
    .select()
    .from(patients)
    .where(eq(patients.id, id))
    .get()

  if (!patient) {
    return c.json({ error: 'Pasient ikke funnet' }, 404)
  }

  return c.json(patient)
})
