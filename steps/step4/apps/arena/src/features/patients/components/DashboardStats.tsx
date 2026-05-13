import { Users, UserRound } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@medix/ui'
import { usePatients } from '../hooks/usePatients'
import { ErrorState } from '@/components/ErrorState'

export function DashboardStats() {
  const { data: patients, isLoading, error } = usePatients()

  if (isLoading) return <DashboardStatsSkeleton />

  if (error) {
    return (
      <ErrorState
        title="Patient counts are unavailable"
        message="We could not load the patient counts right now."
        error={error}
        logContext="Dashboard stats query failed"
      />
    )
  }

  const total = patients?.length ?? 0
  const female = patients?.filter((p) => p.gender === 'female').length ?? 0
  const male = patients?.filter((p) => p.gender === 'male').length ?? 0

  const stats = [
    { label: 'Total patients', value: total, icon: Users },
    { label: 'Female', value: female, icon: UserRound },
    { label: 'Male', value: male, icon: UserRound },
  ]

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}

export function DashboardStatsSkeleton() {
  return (
    <section
      role="status"
      aria-label="Loading patient counts"
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <Skeleton className="h-4 w-28" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-16" />
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
