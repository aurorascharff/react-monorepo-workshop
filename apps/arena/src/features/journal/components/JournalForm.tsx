import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Label, Textarea, DatePicker } from '@medix/ui'
import { createJournal } from '../../../lib/api'

const journalSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot be longer than 100 characters'),
  date: z.string().min(1, 'Date is required'),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .min(1, 'Content is required'),
})

type JournalFormData = z.infer<typeof journalSchema>

type JournalFormProps = {
  patientId: string
  onSuccess?: () => void
}

export function JournalForm({ patientId, onSuccess }: JournalFormProps) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: JournalFormData) => createJournal(patientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals', patientId] })
      reset()
      onSuccess?.()
    },
  })

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="rounded-lg border bg-card p-6"
    >
      <h2 className="mb-4 text-lg font-semibold">New journal entry</h2>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error.message}
        </div>
      )}

      <div className="mb-4 space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          {...register('title')}
          placeholder="Short description of the entry"
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4 space-y-1">
        <Label htmlFor="date">Date</Label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              placeholder="Pick a date"
            />
          )}
        />
        {errors.date && (
          <p className="text-xs text-destructive">{errors.date.message}</p>
        )}
      </div>

      <div className="mb-6 space-y-1">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          rows={5}
          {...register('content')}
          placeholder="Clinical observations, interventions, and assessments..."
        />
        {errors.content && (
          <p className="text-xs text-destructive">{errors.content.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Saving...' : 'Save entry'}
      </Button>
    </form>
  )
}
