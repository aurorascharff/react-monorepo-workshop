import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import type { ReactNode } from 'react'
import { fetchJournals } from '@/lib/api'
import { useJournals } from '../useJournals'

vi.mock('@/lib/api', () => ({
  fetchJournals: vi.fn(),
}))

const mockedFetchJournals = vi.mocked(fetchJournals)

describe('useJournals', () => {
  beforeEach(() => {
    mockedFetchJournals.mockReset()
  })

  it('loads journals for the selected patient', async () => {
    mockedFetchJournals.mockResolvedValueOnce([
      {
        id: 'j1',
        patientId: 'p1',
        title: 'Initial consultation',
        date: '2026-05-10',
        content: 'Initial patient consultation.',
        status: 'active',
      },
    ])

    const { result } = renderHook(() => useJournals('p1'), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockedFetchJournals).toHaveBeenCalledWith('p1')
    expect(result.current.data?.[0].title).toBe('Initial consultation')
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
