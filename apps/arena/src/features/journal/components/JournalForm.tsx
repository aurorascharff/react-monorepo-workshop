import { useState } from 'react'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Label, Textarea, DatePicker } from '@medix/ui'
import { createJournal } from '../../../lib/api'
import type { Journal } from '../../../types'

const journalSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot be longer than 100 characters'),
  date: z.string().min(1, 'Date is required'),
  content: z
    .string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters'),
})

type JournalFormData = z.infer<typeof journalSchema>

type JournalFormProps = {
  patientId: string
  onSuccess?: () => void
}

const emptyJournalForm: JournalFormData = {
  title: '',
  date: '',
  content: '',
}

function sortJournalsByDate(entries: Journal[]) {
  return [...entries].sort((a, b) => b.date.localeCompare(a.date))
}

export function JournalForm({ patientId, onSuccess }: JournalFormProps) {
  const queryClient = useQueryClient()
  const [successMessage, setSuccessMessage] = useState('')

  const {
    handleSubmit,
    reset,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
    mode: 'onChange',
    defaultValues: emptyJournalForm,
  })

  const { mutate, error } = useMutation({
    mutationFn: (data: JournalFormData) => createJournal(patientId, data),
    onMutate: async (data) => {
      setSuccessMessage('')
      await queryClient.cancelQueries({ queryKey: ['journals', patientId] })

      const previousEntries = queryClient.getQueryData<Journal[]>([
        'journals',
        patientId,
      ])
      const optimisticId = `optimistic-${Date.now()}`

      queryClient.setQueryData<Journal[]>(['journals', patientId], (entries) =>
        sortJournalsByDate([
          {
            id: optimisticId,
            patientId,
            title: data.title,
            date: data.date,
            content: data.content,
            status: 'draft',
          },
          ...(entries ?? []),
        ]),
      )

      return { previousEntries, optimisticId, submittedData: data }
    },
    onError: (_error, _data, context) => {
      if (context) {
        queryClient.setQueryData<Journal[]>(
          ['journals', patientId],
          context.previousEntries ?? [],
        )
        reset(context.submittedData)
        clearErrors()
      }
    },
    onSuccess: (createdEntry, _data, context) => {
      queryClient.setQueryData<Journal[]>(
        ['journals', patientId],
        (entries) => {
          if (!entries) return [createdEntry]

          return sortJournalsByDate(
            entries.map((entry) =>
              entry.id === context?.optimisticId ? createdEntry : entry,
            ),
          )
        },
      )
      setSuccessMessage('Journal entry saved.')
      onSuccess?.()
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['journals', patientId] })
    },
  })

  function submitJournal(data: JournalFormData) {
    reset(emptyJournalForm, {
      keepDirty: false,
      keepErrors: false,
      keepTouched: false,
      keepValues: false,
    })
    clearErrors()
    mutate(data)
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">New journal entry</h2>

      <form
        onSubmit={handleSubmit(submitJournal)}
        className="rounded-lg border bg-card p-6"
      >
        {error && (
          <div
            role="alert"
            className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error.message}
          </div>
        )}
        {successMessage && !error && (
          <div
            role="status"
            className="mb-4 rounded-md border border-primary/40 bg-primary/10 p-3 text-sm text-primary"
          >
            {successMessage}
          </div>
        )}

        <div className="mb-4 space-y-2">
          <Label htmlFor="title">Title</Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                id="title"
                type="text"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                aria-invalid={Boolean(errors.title)}
                aria-describedby={errors.title ? 'title-error' : undefined}
                placeholder="Short description of the entry"
              />
            )}
          />
          {errors.title && (
            <p id="title-error" className="text-xs text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="mb-4 space-y-2">
          <Label htmlFor="date">Date</Label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                id="date"
                value={field.value}
                onChange={field.onChange}
                placeholder="Pick a date"
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'date-error' : undefined}
              />
            )}
          />
          {errors.date && (
            <p id="date-error" className="text-xs text-destructive">
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="mb-6 space-y-2">
          <Label htmlFor="content">Content</Label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Textarea
                id="content"
                rows={5}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                name={field.name}
                ref={field.ref}
                aria-invalid={Boolean(errors.content)}
                aria-describedby={errors.content ? 'content-error' : undefined}
                placeholder="Clinical observations, interventions, and assessments..."
              />
            )}
          />
          {errors.content && (
            <p id="content-error" className="text-xs text-destructive">
              {errors.content.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-fit">
          Save entry
        </Button>
      </form>
    </section>
  )
}
