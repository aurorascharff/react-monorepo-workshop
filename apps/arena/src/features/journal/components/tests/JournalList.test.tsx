import { render, screen } from '@testing-library/react'
import type { Journal } from '../../../../types'
import { useJournals } from '../../hooks/useJournals'
import { JournalList } from '../JournalList'

vi.mock('../../hooks/useJournals', () => ({
  useJournals: vi.fn(),
}))

vi.mock('../JournalEntry', () => ({
  JournalEntry: ({ entry }: { entry: Journal }) => (
    <article aria-label="journal entry">{entry.title}</article>
  ),
}))

const journals: Journal[] = [
  {
    id: 'j1',
    patientId: 'p1',
    title: 'Initial consultation',
    date: '2026-05-10',
    content: 'Initial patient consultation.',
    status: 'active',
  },
]

const mockedUseJournals = vi.mocked(useJournals)

describe('JournalList', () => {
  beforeEach(() => {
    mockedUseJournals.mockReset()
  })

  it('shows a skeleton state while journal entries load', () => {
    mockedUseJournals.mockReturnValue(queryState({ isLoading: true }))

    render(<JournalList patientId="p1" />)

    expect(
      screen.getByRole('status', { name: /loading journal entries/i }),
    ).toBeInTheDocument()
  })

  it('shows an error message when journal entries fail to load', () => {
    mockedUseJournals.mockReturnValue(
      queryState({ error: new Error('API unavailable') }),
    )

    render(<JournalList patientId="p1" />)

    expect(
      screen.getByText(/failed to load journal entries/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/api unavailable/i)).toBeInTheDocument()
  })

  it('shows an empty state when the patient has no journal entries', () => {
    mockedUseJournals.mockReturnValue(queryState({ data: [] }))

    render(<JournalList patientId="p1" />)

    expect(screen.getByText(/no journal entries yet/i)).toBeInTheDocument()
  })

  it('renders journal entries for the selected patient', () => {
    mockedUseJournals.mockReturnValue(queryState({ data: journals }))

    render(<JournalList patientId="p1" />)

    expect(screen.getByText('Initial consultation')).toBeInTheDocument()
    expect(mockedUseJournals).toHaveBeenCalledWith('p1')
  })
})

function queryState(overrides: {
  data?: Journal[]
  isLoading?: boolean
  error?: Error | null
}) {
  return {
    data: undefined,
    isLoading: false,
    error: null,
    ...overrides,
  } as ReturnType<typeof useJournals>
}
