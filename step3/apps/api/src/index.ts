import { serve } from '@hono/node-server'
import { OpenAPIHono } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'
import { cors } from 'hono/cors'
import { patientsRouter } from './routes/patients'
import { journalsRouter } from './routes/journals'

const app = new OpenAPIHono()

app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type'],
  }),
)

// Artificial latency so loading states are visible during the workshop.
const ARTIFICIAL_DELAY_MS = 600
app.use('*', async (_c, next) => {
  await new Promise((resolve) => setTimeout(resolve, ARTIFICIAL_DELAY_MS))
  await next()
})

app.route('/patients', patientsRouter)
app.route('/journals', journalsRouter)

app.doc('/openapi.json', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'Medix Workshop API',
    description: 'Patient and journal endpoints for the Medix Arena workshop.',
  },
})

app.get(
  '/',
  Scalar({
    url: '/openapi.json',
    pageTitle: 'Medix API',
    theme: 'default',
  }),
)

const PORT = 3001

serve({ fetch: app.fetch, port: PORT }, () => {
  console.log(`API running at http://localhost:${PORT}`)
  console.log(`API docs: http://localhost:${PORT}/`)
})
