import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const patients = sqliteTable('patients', {
  id: text('id').primaryKey(),
  navn: text('navn').notNull(),
  fodselsdato: text('fodselsdato').notNull(),
  kjonn: text('kjonn', { enum: ['mann', 'kvinne'] }).notNull(),
  diagnose: text('diagnose').notNull(),
})

export const journals = sqliteTable('journals', {
  id: text('id').primaryKey(),
  pasientId: text('pasient_id')
    .notNull()
    .references(() => patients.id),
  tittel: text('tittel').notNull(),
  dato: text('dato').notNull(),
  innhold: text('innhold').notNull(),
  status: text('status', {
    enum: ['aktiv', 'avsluttet', 'utkast'],
  }).notNull(),
})
