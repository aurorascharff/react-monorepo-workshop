import { Badge } from './base/badge'
import { cn } from './lib/utils'

export type JournalStatus = 'active' | 'closed' | 'draft'

const statusConfig: Record<
  JournalStatus,
  { label: string; className: string }
> = {
  active: {
    label: 'Active',
    className:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20',
  },
  closed: {
    label: 'Closed',
    className:
      'bg-muted text-muted-foreground border-transparent',
  },
  draft: {
    label: 'Draft',
    className:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
  },
}

type StatusBadgeProps = {
  status: JournalStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusConfig[status]
  return (
    <Badge variant="outline" className={cn(className)}>
      {label}
    </Badge>
  )
}
