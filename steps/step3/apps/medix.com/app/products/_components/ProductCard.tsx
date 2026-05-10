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
}

export function ProductCard({
  title,
  description,
  status,
}: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        <StatusBadge status={status} />
      </CardContent>
    </Card>
  )
}
