import { render, screen } from '@testing-library/react'
import { Button } from '@medix/ui'

describe('Smoke test', () => {
  it('renders a Button from @medix/ui', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })
})
