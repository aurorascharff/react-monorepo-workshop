import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { JournalForm } from './JournalForm'

function renderWithClient(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}

describe('JournalForm', () => {
  it('keeps submit disabled until required fields are valid', () => {
    renderWithClient(<JournalForm patientId="p-1" />)

    expect(screen.getByRole('button', { name: /save entry/i })).toBeDisabled()
  })

  it('labels the date picker from the visible date label', () => {
    renderWithClient(<JournalForm patientId="p-1" />)

    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
  })

  it('shows a length error when content is too short', async () => {
    const user = userEvent.setup()
    renderWithClient(<JournalForm patientId="p-1" />)

    await user.type(screen.getByLabelText(/title/i), 'Quick check-in')
    await user.type(screen.getByLabelText(/content/i), 'short')
    await user.tab()

    expect(
      await screen.findByText(/content must be at least 10 characters/i),
    ).toBeInTheDocument()
  })
})
