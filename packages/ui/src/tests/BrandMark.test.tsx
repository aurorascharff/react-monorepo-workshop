import { render, screen } from '@testing-library/react'
import { BrandMark } from '../BrandMark'

describe('BrandMark', () => {
  it('renders the Medix brand with optional product context', () => {
    render(<BrandMark product="Arena" description="Journal system" />)

    expect(screen.getByText('Medix Arena')).toBeInTheDocument()
    expect(screen.getByText('Journal system')).toBeInTheDocument()
  })
})
