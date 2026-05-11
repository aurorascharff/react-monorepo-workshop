import { render, screen } from '@testing-library/react'
import type { Patient } from '@/types'
import { PatientHeader } from '../PatientHeader'

const patient: Patient = {
  id: 'p1',
  name: 'Mary Smith',
  dateOfBirth: '1975-03-12',
  gender: 'female',
  diagnosis: 'Type 2 diabetes mellitus',
}

describe('PatientHeader', () => {
  it('renders the patient identity and diagnosis', () => {
    render(<PatientHeader patient={patient} />)

    expect(screen.getByRole('heading', { name: patient.name })).toBeVisible()
    expect(screen.getByText(/born: march 12, 1975/i)).toBeInTheDocument()
    expect(screen.getByText('p1')).toBeInTheDocument()
    expect(screen.getByText(patient.diagnosis)).toBeInTheDocument()
  })
})
