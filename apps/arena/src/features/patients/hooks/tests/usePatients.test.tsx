import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { fetchPatients } from '@/lib/api'
import { usePatients } from '../usePatients'

vi.mock('@/lib/api', () => ({
  fetchPatients: vi.fn(),
}))

const mockedFetchPatients = vi.mocked(fetchPatients)

describe('usePatients', () => {
  beforeEach(() => {
    mockedFetchPatients.mockReset()
  })

  it('loads the patient list through the API client', async () => {
    mockedFetchPatients.mockResolvedValueOnce([
      {
        id: 'p1',
        name: 'Mary Smith',
        dateOfBirth: '1975-03-12',
        gender: 'female',
        diagnosis: 'Type 2 diabetes mellitus',
      },
    ])

    const { result } = renderHook(() => usePatients(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockedFetchPatients).toHaveBeenCalledTimes(1)
    expect(result.current.data?.[0].name).toBe('Mary Smith')
  })
})

function createQueryWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })

  return function QueryWrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}
