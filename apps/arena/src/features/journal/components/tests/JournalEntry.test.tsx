import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import type { Journal } from '../../../../types'
import { JournalEntry } from '../JournalEntry'

const entry: Journal = {
  id: 'j1',
  patientId: 'p1',
  title: 'Medication review',
  date: '2026-05-10',
  content: 'Reviewed medication plan and adjusted follow-up.',
  status: 'active',
}

describe('JournalEntry', () => {
  it('renders journal content with formatted date and current status', () => {
    renderWithClient(<JournalEntry entry={entry} patientId="p1" />)

    expect(screen.getByRole('heading', { name: entry.title })).toBeVisible()
    expect(screen.getByText('May 10, 2026')).toBeInTheDocument()
    expect(screen.getByText(entry.content)).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', {
        name: `Change status for ${entry.title}`,
      }),
    ).toHaveTextContent('Active')
  })
})

function renderWithClient(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}
