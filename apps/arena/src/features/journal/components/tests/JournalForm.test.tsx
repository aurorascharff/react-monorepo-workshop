import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import type { Journal } from '../../../../types'
import { JournalForm } from '../JournalForm'

const fetchMock = vi.fn()

vi.mock('@medix/ui', async () => {
  const actual = await vi.importActual<typeof import('@medix/ui')>('@medix/ui')

  return {
    ...actual,
    DatePicker: ({
      id,
      value,
      onChange,
      placeholder,
      ...props
    }: {
      id?: string
      value?: string
      onChange: (value: string) => void
      placeholder?: string
    }) => (
      <actual.Input
        id={id}
        type="date"
        value={value ?? ''}
        onChange={(event) => onChange(event.currentTarget.value)}
        placeholder={placeholder}
        {...props}
      />
    ),
  }
})

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function renderWithClient(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  })
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}

function renderWithQueryClient(ui: ReactNode, queryClient: QueryClient) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}

describe('JournalForm', () => {
  it('keeps submit available and shows field errors for invalid input', async () => {
    const user = userEvent.setup()
    renderWithClient(<JournalForm patientId="p-1" />)

    const submit = screen.getByRole('button', { name: /save entry/i })

    expect(submit).toBeEnabled()

    await user.click(submit)

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/date is required/i)).toBeInTheDocument()
    expect(screen.getByText(/content is required/i)).toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('labels the date picker from the visible date label', () => {
    renderWithClient(<JournalForm patientId="p-1" />)

    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
  })

  it('clears field errors when the user fixes text fields', async () => {
    const user = userEvent.setup()
    renderWithClient(<JournalForm patientId="p-1" />)

    await user.click(screen.getByRole('button', { name: /save entry/i }))

    expect(await screen.findByText(/title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/content is required/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/title/i), 'ECG follow-up')
    await user.type(
      screen.getByLabelText(/content/i),
      'Patient reports improved symptoms.',
    )

    expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/content is required/i)).not.toBeInTheDocument()
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

  it('clears values and validation errors after a valid submit', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'j-1',
        patientId: 'p-1',
        title: 'ECG follow-up',
        date: '2026-05-11',
        content: 'Patient reports improved symptoms.',
        status: 'draft',
      }),
    })

    const user = userEvent.setup()
    renderWithClient(<JournalForm patientId="p-1" />)

    const title = screen.getByLabelText(/title/i)
    const date = screen.getByLabelText(/date/i)
    const content = screen.getByLabelText(/content/i)

    await user.click(screen.getByRole('button', { name: /save entry/i }))
    expect(await screen.findByText(/title is required/i)).toBeInTheDocument()

    await user.clear(title)
    await user.type(title, 'ECG follow-up')
    await user.type(date, '2026-05-11')
    await user.clear(content)
    await user.type(content, 'Patient reports improved symptoms.')
    await user.click(screen.getByRole('button', { name: /save entry/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    expect(title).toHaveValue('')
    expect(date).toHaveValue('')
    expect(content).toHaveValue('')
    expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/content is required/i)).not.toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(/journal entry saved/i)
  })

  it('keeps optimistic entries sorted by date', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 'j-new',
        patientId: 'p-1',
        title: 'Middle entry',
        date: '2026-05-11',
        content: 'Patient reports improved symptoms.',
        status: 'draft',
      }),
    })

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
    queryClient.setQueryData<Journal[]>(
      ['journals', 'p-1'],
      [
        {
          id: 'j-old',
          patientId: 'p-1',
          title: 'Older entry',
          date: '2026-05-01',
          content: 'Older note.',
          status: 'active',
        },
        {
          id: 'j-newer',
          patientId: 'p-1',
          title: 'Newer entry',
          date: '2026-05-20',
          content: 'Newer note.',
          status: 'active',
        },
      ],
    )

    const user = userEvent.setup()
    renderWithQueryClient(<JournalForm patientId="p-1" />, queryClient)

    await user.type(screen.getByLabelText(/title/i), 'Middle entry')
    await user.type(screen.getByLabelText(/date/i), '2026-05-11')
    await user.type(
      screen.getByLabelText(/content/i),
      'Patient reports improved symptoms.',
    )
    await user.click(screen.getByRole('button', { name: /save entry/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))

    expect(
      queryClient
        .getQueryData<Journal[]>(['journals', 'p-1'])
        ?.map((entry) => [entry.title, entry.date]),
    ).toEqual([
      ['Newer entry', '2026-05-20'],
      ['Middle entry', '2026-05-11'],
      ['Older entry', '2026-05-01'],
    ])
  })
})
