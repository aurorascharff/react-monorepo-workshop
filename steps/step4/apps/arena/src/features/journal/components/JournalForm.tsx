import type { ReactEventHandler } from 'react'
import { Button, Input, Label, Textarea } from '@medix/ui'
import { useCreateJournal } from '../hooks/useCreateJournal'

type JournalFormProps = {
  patientId: string
}

export function JournalForm({ patientId }: JournalFormProps) {
  const { mutate, isPending, error } = useCreateJournal(patientId)

  const handleSubmit: ReactEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const title = String(formData.get('title') ?? '').trim()
    const date = String(formData.get('date') ?? '')
    const content = String(formData.get('content') ?? '').trim()

    if (!title || !date || !content) return

    mutate(
      { title, date, content },
      {
        onSuccess: () => form.reset(),
      },
    )
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">New journal entry</h2>

      <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6">
        {error && (
          <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            We could not save the journal entry. Try again.
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

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Saving...' : 'Save entry'}
        </Button>
      </form>
    </section>
  )
}
