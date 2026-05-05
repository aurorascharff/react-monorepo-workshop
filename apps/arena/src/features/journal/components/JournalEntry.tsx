import {
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@klinikk/ui'
import type { JournalOppforing } from '../../../types'
import type { JournalStatus } from '@klinikk/ui'
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
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold leading-none tracking-tight">
              {oppforing.tittel}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {formaterDato(oppforing.dato)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Select
              value={oppforing.status}
              disabled={isPending}
              onValueChange={(value) => mutate(value as JournalStatus)}
            >
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusValg.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {oppforing.innhold}
        </p>
      </CardContent>
    </Card>
  )
}

function formaterDato(dato: string): string {
  return new Date(dato).toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
