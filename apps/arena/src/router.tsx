import { Routes, Route } from 'react-router'
import { Layout } from './layouts/Layout'
import { DashboardPage } from './pages/DashboardPage'
import { PasientListePage } from './pages/PasientListePage'
import { PasientDetaljPage } from './pages/PasientDetaljPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="pasienter" element={<PasientListePage />} />
        <Route path="pasienter/:id" element={<PasientDetaljPage />} />
      </Route>
    </Routes>
  )
}
