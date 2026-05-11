import type { ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { Button, cn } from '@medix/ui'
import { logError } from '@/lib/logger'

type Props = {
  children: ReactNode
  title?: string
  message?: string
  resetLabel?: string
  className?: string
  logContext?: string
  onReset?: () => void
}

export function ErrorBoundary({
  children,
  title = 'Something went wrong',
  message = 'Try again, or reload the page if the problem continues.',
  resetLabel = 'Try again',
  className,
  logContext = 'React error boundary',
  onReset,
}: Props) {
  return (
    <ReactErrorBoundary
      onError={(error) => logError(error, logContext)}
      fallbackRender={({ resetErrorBoundary }) => (
        <div
          className={cn(
            'mx-auto max-w-md mt-12 rounded-lg border bg-card p-6 text-center',
            className,
          )}
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          <Button
            onClick={() => {
              onReset?.()
              resetErrorBoundary()
            }}
            className="mt-4"
          >
            {resetLabel}
          </Button>
        </div>
      )}
    >
      {children}
    </ReactErrorBoundary>
  )
}
