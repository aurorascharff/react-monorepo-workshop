import { StatusBadge } from '@dips/ui'
import type { JournalOppforing } from '../../../types'
import type { JournalStatus } from '@dips/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { oppdaterJournalStatus } from '../../../lib/api'

type JournalEntryProps = {
  oppforing: JournalOppforing
  pasientId: string
}

const statusValg: { value: JournalStatus; label: string }[] = [
  { value: 'utkast', label: 'Utkast' },
  { value: 'aktiv', label: 'Aktiv' },
  { value: 'avsluttet', label: 'Avsluttet' },
]

export function JournalEntry({ oppforing, pasientId }: JournalEntryProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (status: JournalStatus) =>
      oppdaterJournalStatus(oppforing.id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['journals', pasientId],
      })
    },
  })

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{oppforing.tittel}</h3>
          <p className="text-sm text-gray-500">{formaterDato(oppforing.dato)}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={oppforing.status} />
          <select
            value={oppforing.status}
            disabled={isPending}
            onChange={(e) => mutate(e.target.value as JournalStatus)}
            className="rounded border border-gray-300 px-2 py-1 text-xs disabled:opacity-50"
          >
            {statusValg.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-700">
        {oppforing.innhold}
      </p>
    </article>
  )
}

function formaterDato(dato: string): string {
  return new Date(dato).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
