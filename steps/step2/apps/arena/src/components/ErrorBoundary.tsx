import type { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { logError } from '../lib/logger'

type Props = {
  children: ReactNode
  fallback?: ReactNode | ((error: unknown, reset: () => void) => ReactNode)
}

export function ErrorBoundary({ children, fallback }: Props) {
  return (
    <ReactErrorBoundary
      onError={(error) => logError(error, 'React error boundary')}
      fallbackRender={({ error, resetErrorBoundary }) => {
        if (typeof fallback === 'function') {
          return fallback(error, resetErrorBoundary)
        }
        return (
          fallback ?? (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-destructive">
              <p className="font-semibold">Something went wrong</p>
              <p className="text-sm">
                Try again, or reload the page if the problem continues.
              </p>
            </div>
          )
        )
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}
