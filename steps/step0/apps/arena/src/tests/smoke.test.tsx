import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'
import type { ReactElement } from 'react'

const appModules = import.meta.glob<{
  App?: () => ReactElement
  AppRoutes?: () => ReactElement
}>('../{App,router}.tsx')

const patients = [
  {
    id: 'p1',
    name: 'Mary Smith',
    dateOfBirth: '1984-03-12',
    gender: 'female',
    diagnosis: 'Type 2 diabetes',
  },
  {
    id: 'p2',
    name: 'Robert Hansen',
    dateOfBirth: '1977-09-04',
    gender: 'male',
    diagnosis: 'Hypertension',
  },
]

describe('App smoke test', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json(patients)),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the dashboard with mocked patient data', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })

    render(
      <QueryClientProvider client={queryClient}>
        {await getAppElement()}
      </QueryClientProvider>,
    )

    expect(
      await screen.findByRole('heading', { name: /good morning/i }),
    ).toBeVisible()
    expect(await screen.findByText(/you have 2 patients/i)).toBeInTheDocument()
    expect(screen.getByText('Mary Smith')).toBeInTheDocument()
  })
})

async function getAppElement(): Promise<ReactElement> {
  const loadApp = appModules['../App.tsx']
  if (loadApp) {
    const { App } = await loadApp()
    if (!App) throw new Error('App module did not export App')
    return <App />
  }

  const loadRouter = appModules['../router.tsx']
  if (!loadRouter) throw new Error('No app entry module found')

  const { AppRoutes } = await loadRouter()
  if (!AppRoutes) throw new Error('Router module did not export AppRoutes')

  return (
    <MemoryRouter>
      <AppRoutes />
    </MemoryRouter>
  )
}
