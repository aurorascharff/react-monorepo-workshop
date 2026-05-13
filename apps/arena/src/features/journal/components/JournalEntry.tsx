import {
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@medix/ui'
import type { Journal, JournalStatus } from '@/types'
import { useUpdateJournalStatus } from '../hooks/useUpdateJournalStatus'

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
  const { mutate, error } = useUpdateJournalStatus(entry.id, patientId)

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
          <div className="flex shrink-0 flex-col items-end gap-1">
            <Select
              value={entry.status}
              onValueChange={(value) => mutate(value as JournalStatus)}
            >
              <SelectTrigger
                className="h-9 w-36 text-sm font-medium"
                aria-label={`Change status for ${entry.title}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {entry.content}
        </p>
        {error && (
          <p className="mt-3 text-sm text-destructive">
            We could not update the journal status. Try again.
          </p>
        )}
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
