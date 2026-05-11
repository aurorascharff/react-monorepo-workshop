import { Card, CardContent, Badge } from '@medix/ui'
import type { Patient } from '@/types'

type PatientHeaderProps = {
  patient: Patient
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {patient.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Born: {formatDate(patient.dateOfBirth)} ·{' '}
              {patient.gender === 'male' ? 'Male' : 'Female'}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Patient ID</p>
            <p className="font-mono text-sm font-medium">{patient.id}</p>
          </div>
        </div>
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm">
            {patient.diagnosis}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
