import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import type { Patient } from '@/types'
import { usePatients } from '../../hooks/usePatients'
import { PatientList } from '../PatientList'

vi.mock('../../hooks/usePatients', () => ({
  usePatients: vi.fn(),
}))

const mockedUsePatients = vi.mocked(usePatients)

const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Mary Smith',
    dateOfBirth: '1975-03-12',
    gender: 'female',
    diagnosis: 'Type 2 diabetes mellitus',
  },
  {
    id: 'p2',
    name: 'Robert Hansen',
    dateOfBirth: '1960-07-28',
    gender: 'male',
    diagnosis: 'Hypertension',
  },
]

describe('PatientList', () => {
  beforeEach(() => {
    mockedUsePatients.mockReset()
    mockedUsePatients.mockReturnValue(queryState({ data: patients }))
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows a skeleton while patients load', () => {
    mockedUsePatients.mockReturnValue(queryState({ isLoading: true }))
    renderPatientList()

    expect(
      screen.getByRole('status', { name: /loading patients/i }),
    ).toBeInTheDocument()
  })

  it('shows an error message when patients fail to load', () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
    mockedUsePatients.mockReturnValue(
      queryState({ error: new Error('API unavailable') }),
    )
    renderPatientList()

    expect(screen.getByText(/patient list is unavailable/i)).toBeInTheDocument()
    expect(screen.queryByText(/api unavailable/i)).not.toBeInTheDocument()
    expect(console.error).toHaveBeenCalled()
  })

  it('renders patient cards as links to patient detail routes', () => {
    renderPatientList()

    expect(screen.getByRole('link', { name: /mary smith/i })).toHaveAttribute(
      'href',
      '/patients/p1',
    )
    expect(
      screen.getByRole('link', { name: /robert hansen/i }),
    ).toHaveAttribute('href', '/patients/p2')
  })

  it('filters patients by search text', async () => {
    const user = userEvent.setup()
    renderPatientList()

    await user.type(screen.getByLabelText(/search patients/i), 'hansen')

    await waitFor(() => {
      expect(screen.getByText(/robert hansen/i)).toBeInTheDocument()
      expect(screen.queryByText(/mary smith/i)).not.toBeInTheDocument()
    })
  })

  it('shows an empty state when no patients match', async () => {
    const user = userEvent.setup()
    renderPatientList()

    await user.type(screen.getByLabelText(/search patients/i), 'zzzz')

    expect(await screen.findByText(/no patients found/i)).toBeInTheDocument()
  })

  it('reads filters from the URL and can clear them', async () => {
    const user = userEvent.setup()
    renderPatientList('/patients?search=hansen&gender=male')

    expect(await screen.findByText(/robert hansen/i)).toBeInTheDocument()
    expect(screen.queryByText(/mary smith/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /clear filters/i }))

    expect(await screen.findByText(/mary smith/i)).toBeInTheDocument()
    expect(screen.getByText(/robert hansen/i)).toBeInTheDocument()
  })
})

function renderPatientList(initialEntry = '/patients') {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <PatientList />
    </MemoryRouter>,
  )
}

function queryState(overrides: {
  data?: Patient[]
  isLoading?: boolean
  error?: Error | null
}) {
  return {
    data: undefined,
    isLoading: false,
    error: null,
    ...overrides,
  } as ReturnType<typeof usePatients>
}
