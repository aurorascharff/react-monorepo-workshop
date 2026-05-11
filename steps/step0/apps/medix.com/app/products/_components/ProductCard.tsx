import { Card, CardContent, CardHeader, CardTitle } from '@medix/ui'

type ProductCardProps = {
  title: string
  description: string
}

export function ProductCard({ title, description }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
