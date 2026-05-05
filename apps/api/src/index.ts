import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { patientsRouter } from './routes/patients'
import { journalsRouter } from './routes/journals'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type'],
  }),
)

app.route('/patients', patientsRouter)
app.route('/journals', journalsRouter)

app.get('/', (c) => c.json({ status: 'Workshop API kører' }))

const PORT = 3001

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`API kjører på http://localhost:${PORT}`)
})
