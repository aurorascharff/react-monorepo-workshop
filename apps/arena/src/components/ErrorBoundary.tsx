import { Component, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-md bg-red-50 p-4 text-red-800">
            <p className="font-semibold">Noe gikk galt</p>
            <p className="text-sm">{this.state.error?.message}</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}
