import type { LucideIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatusBadge,
} from '@medix/ui'
import type { JournalStatus } from '@medix/ui'

type ProductCardProps = {
  title: string
  description: string
  status: JournalStatus
  icon?: LucideIcon
}

export function ProductCard({
  title,
  description,
  status,
  icon: Icon,
}: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        {Icon && (
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        <StatusBadge status={status} />
      </CardContent>
    </Card>
  )
}
