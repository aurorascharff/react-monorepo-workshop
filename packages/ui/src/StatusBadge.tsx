export type JournalStatus = 'aktiv' | 'avsluttet' | 'utkast'

const statusConfig: Record<
  JournalStatus,
  { label: string; className: string }
> = {
  aktiv: {
    label: 'Aktiv',
    className:
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800',
  },
  avsluttet: {
    label: 'Avsluttet',
    className:
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700',
  },
  utkast: {
    label: 'Utkast',
    className:
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800',
  },
}

type StatusBadgeProps = {
  status: JournalStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  return <span className={config.className}>{config.label}</span>
}
