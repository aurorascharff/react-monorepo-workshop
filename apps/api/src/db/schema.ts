import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const patients = sqliteTable('patients', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  dateOfBirth: text('date_of_birth').notNull(),
  gender: text('gender', { enum: ['male', 'female'] }).notNull(),
  diagnosis: text('diagnosis').notNull(),
})

export const journals = sqliteTable('journals', {
  id: text('id').primaryKey(),
  patientId: text('patient_id')
    .notNull()
    .references(() => patients.id),
  title: text('title').notNull(),
  date: text('date').notNull(),
  content: text('content').notNull(),
  status: text('status', {
    enum: ['active', 'closed', 'draft'],
  }).notNull(),
})
