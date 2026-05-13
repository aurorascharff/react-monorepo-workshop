import { lazy, Suspense } from 'react'
import type { ReactNode } from 'react'
import { Routes, Route } from 'react-router'
import { Spinner } from '@medix/ui'
import { RootLayout } from './layouts/RootLayout'

const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((module) => ({
    default: module.DashboardPage,
  })),
)

const PatientListPage = lazy(() =>
  import('./pages/PatientListPage').then((module) => ({
    default: module.PatientListPage,
  })),
)

const PatientDetailPage = lazy(() =>
  import('./pages/PatientDetailPage').then((module) => ({
    default: module.PatientDetailPage,
  })),
)

const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  })),
)

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={routeElement(<DashboardPage />)} />
        <Route path="patients" element={routeElement(<PatientListPage />)} />
        <Route
          path="patients/:id"
          element={routeElement(<PatientDetailPage />)}
        />
        <Route path="*" element={routeElement(<NotFoundPage />)} />
      </Route>
    </Routes>
  )
}

function routeElement(element: ReactNode) {
  return <Suspense fallback={<Spinner />}>{element}</Suspense>
}
