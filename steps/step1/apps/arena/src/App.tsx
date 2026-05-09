import { Dashboard } from './Dashboard'
import { PatientPage } from './PatientPage'
import { Layout } from './layouts/Layout'
import { useState } from 'react'

type Page = 'dashboard' | 'patients'

export function App() {
  const [page, setPage] = useState<Page>('dashboard')

  return (
    <Layout activePage={page} onNavigate={setPage}>
      {page === 'dashboard' ? (
        <Dashboard onNavigate={() => setPage('patients')} />
      ) : (
        <PatientPage />
      )}
    </Layout>
  )
}
