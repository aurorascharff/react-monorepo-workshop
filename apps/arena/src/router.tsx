import { Routes, Route } from 'react-router'
import { Layout } from './layouts/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { PatientListPage } from './pages/PatientListPage'
import { PatientDetailPage } from './pages/PatientDetailPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="patients" element={<PatientListPage />} />
        <Route path="patients/:id" element={<PatientDetailPage />} />
      </Route>
    </Routes>
  )
}
