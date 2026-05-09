import { Dashboard } from './Dashboard'
import { PatientPage } from './PatientPage'
import { Layout } from './layouts/Layout'
import { useState } from 'react'

// TODO Module 2: Replace this conditional rendering with React Router.
// Pages should have real URLs (`/`, `/patients`, `/patients/:id`) so users can
// bookmark them, use the back button, and refresh without losing context.

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
