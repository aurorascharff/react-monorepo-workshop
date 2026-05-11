import { useState } from 'react'
import { Dashboard } from './Dashboard'
import { PatientPage } from './PatientPage'
import { Layout } from './layouts/Layout'

type Page = 'dashboard' | 'patients'

export function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null,
  )

  function showPatients(patientId: string | null = null) {
    setSelectedPatientId(patientId)
    setPage('patients')
  }

  function showDashboard() {
    setSelectedPatientId(null)
    setPage('dashboard')
  }

  function navigate(page: Page) {
    if (page === 'dashboard') {
      showDashboard()
      return
    }

    showPatients()
  }

  return (
    <Layout activePage={page} onNavigate={navigate}>
      {page === 'dashboard' ? (
        <Dashboard onNavigate={showPatients} />
      ) : (
        <PatientPage
          selectedId={selectedPatientId}
          onSelectPatient={setSelectedPatientId}
          onBack={() => setSelectedPatientId(null)}
        />
      )}
    </Layout>
  )
}
