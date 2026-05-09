import { render, screen } from '@testing-library/react'
import { StatusBadge } from '../StatusBadge'

describe('StatusBadge', () => {
  it('renders the correct label for each status', () => {
    const { rerender } = render(<StatusBadge status="active" />)
    expect(screen.getByText('Active')).toBeInTheDocument()

    rerender(<StatusBadge status="closed" />)
    expect(screen.getByText('Closed')).toBeInTheDocument()

    rerender(<StatusBadge status="draft" />)
    expect(screen.getByText('Draft')).toBeInTheDocument()
  })
})
