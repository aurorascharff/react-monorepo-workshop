import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import type { Patient } from '@/types'
import { PatientCard } from '../PatientCard'

const patient: Patient = {
  id: 'p1',
  name: 'Mary Smith',
  dateOfBirth: '1975-03-12',
  gender: 'female',
  diagnosis: 'Type 2 diabetes mellitus',
}

describe('PatientCard', () => {
  it('links to the patient detail route and shows the patient summary', () => {
    render(
      <MemoryRouter>
        <PatientCard patient={patient} />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /mary smith/i })).toHaveAttribute(
      'href',
      '/patients/p1',
    )
    expect(screen.getByText(/female/i)).toBeInTheDocument()
    expect(screen.getByText(/type 2 diabetes mellitus/i)).toBeInTheDocument()
    expect(screen.getByText('ID: p1')).toBeInTheDocument()
  })
})
