import {
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StatusBadge,
} from '@medix/ui'
import type { Journal } from '../../../types'
import type { JournalStatus } from '@medix/ui'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateJournalStatus } from '../../../lib/api'

type JournalEntryProps = {
  entry: Journal
  patientId: string
}

const statusOptions: { value: JournalStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
]

export function JournalEntry({ entry, patientId }: JournalEntryProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: (status: JournalStatus) =>
      updateJournalStatus(entry.id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['journals', patientId],
      })
    },
  })

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold leading-none tracking-tight">
              {entry.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {formatDate(entry.date)}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={entry.status} />
            <Select
              value={entry.status}
              disabled={isPending}
              onValueChange={(value) => mutate(value as JournalStatus)}
            >
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {entry.content}
        </p>
      </CardContent>
    </Card>
  )
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
