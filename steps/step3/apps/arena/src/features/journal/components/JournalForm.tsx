import { type ReactEventHandler, useState } from 'react'
import { Button, Input, Label, Textarea } from '@medix/ui'
import { createJournal } from '@/lib/api'
import type { Journal } from '@/types'

type JournalFormProps = {
  patientId: string
  onCreated: (journal: Journal) => void
}

export function JournalForm({ patientId, onCreated }: JournalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit: ReactEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    setError(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const title = String(formData.get('title') ?? '').trim()
    const date = String(formData.get('date') ?? '')
    const content = String(formData.get('content') ?? '').trim()

    if (!title || !date || !content) {
      setError('All fields are required.')
      return
    }

    setIsSubmitting(true)
    try {
      const journal = await createJournal(patientId, { title, date, content })
      onCreated(journal)
      form.reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">New journal entry</h2>

      <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6">
        {error && (
          <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="mb-4 space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="Short description of the entry"
          />
        </div>

        <div className="mb-4 space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" />
        </div>

        <div className="mb-6 space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            rows={5}
            placeholder="Clinical observations, interventions, and assessments..."
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save entry'}
        </Button>
      </form>
    </section>
  )
}
