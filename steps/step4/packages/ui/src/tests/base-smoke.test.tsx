import { render, screen } from '@testing-library/react'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Spinner,
} from '../index'

describe('@medix/ui', () => {
  it('renders the basic public UI exports', () => {
    render(
      <div>
        <Label htmlFor="patient-search">Search patients</Label>
        <Input id="patient-search" placeholder="Search by name" />

        <Button type="button">Save</Button>

        <Card>
          <CardHeader>
            <CardTitle>Patient summary</CardTitle>
            <CardDescription>Latest journal activity</CardDescription>
          </CardHeader>
          <CardContent>Ready</CardContent>
        </Card>

        <Spinner label="Loading dashboard" />
      </div>,
    )

    expect(screen.getByLabelText(/search patients/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    expect(screen.getByText(/patient summary/i)).toBeInTheDocument()
    expect(
      screen.getByRole('status', { name: /loading dashboard/i }),
    ).toBeInTheDocument()
  })
})
