import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
      className="rounded-lg border border-gray-200 bg-white p-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Ny journaloppføring
      </h2>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
          {error.message}
        </div>
      )}

      <div className="mb-4">
        <label
          htmlFor="tittel"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Tittel
        </label>
        <input
          id="tittel"
          type="text"
          {...register('tittel')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Kort beskrivelse av oppføringen"
        />
        {errors.tittel && (
          <p className="mt-1 text-xs text-red-600">{errors.tittel.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="dato"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Dato
        </label>
        <input
          id="dato"
          type="date"
          {...register('dato')}
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dato && (
          <p className="mt-1 text-xs text-red-600">{errors.dato.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="innhold"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Innhold
        </label>
        <textarea
          id="innhold"
          rows={5}
          {...register('innhold')}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Kliniske observasjoner, tiltak og vurderinger..."
        />
        {errors.innhold && (
          <p className="mt-1 text-xs text-red-600">{errors.innhold.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {isPending ? 'Lagrer...' : 'Lagre oppføring'}
      </button>
    </form>
  )
}
