import type { JournalStatus } from '@/types'
import {
  createJournal,
  fetchPatient,
  fetchPatients,
  updateJournalStatus,
} from '../api'

const fetchMock = vi.fn()

beforeEach(() => {
  fetchMock.mockReset()
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('api client', () => {
  it('fetches all patients from the API', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse([{ id: 'p1' }]))

    await expect(fetchPatients()).resolves.toEqual([{ id: 'p1' }])

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/patients')
  })

  it('throws when a patient request fails', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({}, false))

    await expect(fetchPatient('missing')).rejects.toThrow(
      'Failed to fetch patient',
    )
  })

  it('posts new journal entries for the selected patient', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'j10' }))

    await createJournal('p1', {
      title: 'Check-in',
      date: '2026-05-10',
      content: 'Patient is stable today.',
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/journals/patient/p1',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Check-in',
          date: '2026-05-10',
          content: 'Patient is stable today.',
        }),
      },
    )
  })

  it('uses the API error message when journal creation fails', async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ error: 'Title is required' }, false),
    )

    await expect(
      createJournal('p1', {
        title: '',
        date: '2026-05-10',
        content: 'Patient is stable today.',
      }),
    ).rejects.toThrow('Title is required')
  })

  it('patches journal status updates', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 'j1', status: 'draft' }))

    await updateJournalStatus('j1', 'draft' satisfies JournalStatus)

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/journals/j1/status',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'draft' }),
      },
    )
  })
})

function jsonResponse(data: unknown, ok = true) {
  return {
    ok,
    json: () => Promise.resolve(data),
  } as Response
}
