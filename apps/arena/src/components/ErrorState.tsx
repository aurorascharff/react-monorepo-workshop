import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@medix/ui'
import { logError } from '@/lib/logger'

type ErrorStateProps = {
  title: string
  message: string
  error?: unknown
  logContext?: string
}

export function ErrorState({
  title,
  message,
  error,
  logContext,
}: ErrorStateProps) {
  useEffect(() => {
    if (error && logContext) {
      logError(error, logContext)
    }
  }, [error, logContext])

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
