import { render, screen } from '@testing-library/react'
import { StatusBadge } from '@klinikk/ui'

describe('StatusBadge', () => {
  it('renders the correct label for each status', () => {
    const { rerender } = render(<StatusBadge status="aktiv" />)
    expect(screen.getByText('Aktiv')).toBeInTheDocument()

    rerender(<StatusBadge status="avsluttet" />)
    expect(screen.getByText('Avsluttet')).toBeInTheDocument()

    rerender(<StatusBadge status="utkast" />)
    expect(screen.getByText('Utkast')).toBeInTheDocument()
  })
})
