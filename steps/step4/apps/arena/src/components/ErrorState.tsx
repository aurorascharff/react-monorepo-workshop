import { Card, CardContent, CardHeader, CardTitle } from '@medix/ui'

type ErrorStateProps = {
  title: string
  message: string
}

export function ErrorState({ title, message }: ErrorStateProps) {
  return (
    <Card className="border-destructive/50 bg-destructive/10">
      <CardHeader>
        <CardTitle className="text-base text-destructive">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-destructive">{message}</p>
      </CardContent>
    </Card>
  )
}
