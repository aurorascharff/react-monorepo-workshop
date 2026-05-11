import { fetchPatients } from '../api'

const patients = [
  {
    id: 'p1',
    name: 'Mary Smith',
    dateOfBirth: '1984-03-12',
    gender: 'female',
    diagnosis: 'Type 2 diabetes',
  },
]

describe('api client', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns patients from the API', async () => {
    const fetchMock = vi.fn(async () => Response.json(patients))
    vi.stubGlobal('fetch', fetchMock)

    await expect(fetchPatients()).resolves.toEqual(patients)
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3001/patients')
  })

  it('throws when the API request fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(null, { status: 500 })),
    )

    await expect(fetchPatients()).rejects.toThrow('Failed to fetch patients')
  })
})
