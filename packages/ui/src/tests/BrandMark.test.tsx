import { render, screen } from '@testing-library/react'
import { BrandMark } from '../BrandMark'

describe('BrandMark', () => {
  it('renders the Medix brand with optional product context', () => {
    render(<BrandMark product="Arena" />)

    expect(screen.getByText('Medix')).toBeInTheDocument()
    expect(screen.getByText('Arena')).toBeInTheDocument()
  })
})
