import { Badge } from './base/badge'
import { cn } from './lib/utils'

export type JournalStatus = 'aktiv' | 'avsluttet' | 'utkast'

const statusConfig: Record<
  JournalStatus,
  { label: string; className: string }
> = {
  aktiv: {
    label: 'Aktiv',
    className:
      'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300',
  },
  avsluttet: {
    label: 'Avsluttet',
    className: 'bg-secondary text-secondary-foreground',
  },
  utkast: {
    label: 'Utkast',
    className:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-300',
  },
}

type StatusBadgeProps = {
  status: JournalStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusConfig[status]
  return (
    <Badge variant="outline" className={cn('border-transparent', className)}>
      {label}
    </Badge>
  )
}
