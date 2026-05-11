import { Card, CardContent } from '@medix/ui'
import type { Patient } from '@/types'

type PatientCardProps = {
  patient: Patient
  onSelect: (id: string) => void
}

export function PatientCard({ patient, onSelect }: PatientCardProps) {
  const age = calculateAge(patient.dateOfBirth)

  return (
    <button
      type="button"
      onClick={() => onSelect(patient.id)}
      className="block w-full text-left text-inherit no-underline"
    >
      <Card className="transition-shadow hover:shadow-md cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{patient.name}</h3>
              <p className="text-sm text-muted-foreground">
                {age} years · {patient.gender === 'male' ? 'Male' : 'Female'}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              ID: {patient.id}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {patient.diagnosis}
          </p>
        </CardContent>
      </Card>
    </button>
  )
}

function calculateAge(dateOfBirth: string): number {
  const born = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - born.getFullYear()
  const month = today.getMonth() - born.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < born.getDate())) {
    age--
  }
  return age
}
