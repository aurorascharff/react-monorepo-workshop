import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { db } from '../db'
import { journals } from '../db/schema'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export const journalsRouter = new Hono()

journalsRouter.get('/pasient/:pasientId', async (c) => {
  const pasientId = c.req.param('pasientId')
  const entries = await db
    .select()
    .from(journals)
    .where(eq(journals.pasientId, pasientId))

  return c.json(entries)
})

journalsRouter.get('/:id', async (c) => {
  const id = c.req.param('id')
  const entry = await db
    .select()
    .from(journals)
    .where(eq(journals.id, id))
    .get()

  if (!entry) {
    return c.json({ error: 'Journaloppføring ikke funnet' }, 404)
  }

  return c.json(entry)
})

const nyJournalSchema = z.object({
  tittel: z.string().min(1).max(100),
  dato: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ugyldig datoformat'),
  innhold: z.string().min(10),
})

journalsRouter.post(
  '/pasient/:pasientId',
  zValidator('json', nyJournalSchema),
  async (c) => {
    const pasientId = c.req.param('pasientId')
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
  },
)

const oppdaterStatusSchema = z.object({
  status: z.enum(['aktiv', 'avsluttet', 'utkast']),
})

journalsRouter.patch(
  '/:id/status',
  zValidator('json', oppdaterStatusSchema),
  async (c) => {
    const id = c.req.param('id')
    const { status } = c.req.valid('json')

    const existing = await db
      .select()
      .from(journals)
      .where(eq(journals.id, id))
      .get()

    if (!existing) {
      return c.json({ error: 'Journaloppføring ikke funnet' }, 404)
    }

    await db.update(journals).set({ status }).where(eq(journals.id, id))
    return c.json({ ...existing, status })
  },
)
