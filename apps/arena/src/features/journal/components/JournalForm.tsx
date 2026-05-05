import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Input, Label, Textarea } from '@klinikk/ui'
import { opprettJournal } from '../../../lib/api'

const journalSchema = z.object({
  tittel: z
    .string()
    .min(1, 'Tittel er påkrevd')
    .max(100, 'Tittel kan ikke være lengre enn 100 tegn'),
  dato: z.string().min(1, 'Dato er påkrevd'),
  innhold: z
    .string()
    .min(10, 'Innhold må være minst 10 tegn')
    .min(1, 'Innhold er påkrevd'),
})

type JournalFormData = z.infer<typeof journalSchema>

type JournalFormProps = {
  pasientId: string
  onSuccess?: () => void
}

export function JournalForm({ pasientId, onSuccess }: JournalFormProps) {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
  })

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: JournalFormData) => opprettJournal(pasientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals', pasientId] })
      reset()
      onSuccess?.()
    },
  })

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="rounded-lg border bg-card p-6"
    >
      <h2 className="mb-4 text-lg font-semibold">
        Ny journaloppføring
      </h2>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error.message}
        </div>
      )}

      <div className="mb-4 space-y-1">
        <Label htmlFor="tittel">Tittel</Label>
        <Input
          id="tittel"
          type="text"
          {...register('tittel')}
          placeholder="Kort beskrivelse av oppføringen"
        />
        {errors.tittel && (
          <p className="text-xs text-destructive">{errors.tittel.message}</p>
        )}
      </div>

      <div className="mb-4 space-y-1">
        <Label htmlFor="dato">Dato</Label>
        <Input
          id="dato"
          type="date"
          {...register('dato')}
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="w-auto"
        />
        {errors.dato && (
          <p className="text-xs text-destructive">{errors.dato.message}</p>
        )}
      </div>

      <div className="mb-6 space-y-1">
        <Label htmlFor="innhold">Innhold</Label>
        <Textarea
          id="innhold"
          rows={5}
          {...register('innhold')}
          placeholder="Kliniske observasjoner, tiltak og vurderinger..."
        />
        {errors.innhold && (
          <p className="text-xs text-destructive">{errors.innhold.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Lagrer...' : 'Lagre oppføring'}
      </Button>
    </form>
  )
}
