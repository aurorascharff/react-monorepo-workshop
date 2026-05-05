import { createBrowserRouter, Navigate } from 'react-router'
import { Layout } from './components/Layout'
import { PasientListePage } from './PasientListePage'
import { PasientDetaljPage } from './PasientDetaljPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/pasienter" replace />,
      },
      {
        path: 'pasienter',
        element: <PasientListePage />,
      },
      {
        path: 'pasienter/:id',
        element: <PasientDetaljPage />,
      },
    ],
  },
])
