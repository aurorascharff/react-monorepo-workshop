import { useState, type ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ErrorBoundary } from '../ErrorBoundary'

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the default fallback when children throw', () => {
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    )

    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByText(/reload the page if the problem continues/i),
    ).toBeInTheDocument()
    expect(screen.queryByText('Render failed')).not.toBeInTheDocument()
    expect(console.error).toHaveBeenCalled()
  })

  it('can reset from a custom fallback', async () => {
    const user = userEvent.setup()
    render(<ResettableBoundary />)

    await user.click(screen.getByRole('button', { name: /try again/i }))

    expect(screen.getByText('Content recovered')).toBeInTheDocument()
  })
})

function BrokenComponent(): null {
  throw new Error('Render failed')
}

function MaybeBroken({ shouldThrow }: { shouldThrow: boolean }): ReactNode {
  if (shouldThrow) throw new Error('Render failed')
  return <p>Content recovered</p>
}

function ResettableBoundary() {
  const [shouldThrow, setShouldThrow] = useState(true)

  return (
    <ErrorBoundary
      fallback={(_error, reset) => (
        <button
          type="button"
          onClick={() => {
            setShouldThrow(false)
            reset()
          }}
        >
          Try again
        </button>
      )}
    >
      <MaybeBroken shouldThrow={shouldThrow} />
    </ErrorBoundary>
  )
}
