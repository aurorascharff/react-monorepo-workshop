import { Link } from 'react-router'
import { ArrowRight, Activity, Users, UserRound } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@medix/ui'
import { usePatients } from '../features/patients/hooks/usePatients'
import { ErrorState } from '../components/ErrorState'

export function DashboardPage() {
  const { data: patients, isLoading, error } = usePatients()

  if (isLoading) return <DashboardLoadingState />

  if (error) {
    return (
      <ErrorState
        title="Dashboard is unavailable"
        message="We could not load the dashboard right now. Try refreshing the page."
        error={error}
        logContext="Dashboard query failed"
      />
    )
  }

  const total = patients?.length ?? 0
  const female = patients?.filter((p) => p.gender === 'female').length ?? 0
  const male = patients?.filter((p) => p.gender === 'male').length ?? 0
  const recentPatients = patients?.slice(0, 5) ?? []

  const statCards = [
    { label: 'Total patients', value: total, icon: Users },
    { label: 'Female', value: female, icon: UserRound },
    { label: 'Male', value: male, icon: UserRound },
  ]

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">Overview</p>
        <h1 className="text-3xl font-bold tracking-tight">Good morning</h1>
        <p className="text-muted-foreground">
          You have {total} patients under follow-up today.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statCards.map(({ label, value, icon: Icon }) => (
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

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent patients</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Jump straight into the journal
              </p>
            </div>
            <Link
              to="/patients"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              See all <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {recentPatients.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/patients/${p.id}`}
                    className="flex items-center justify-between gap-4 px-6 py-3 transition-colors hover:bg-accent"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {p.diagnosis}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <Activity className="h-6 w-6" />
            <CardTitle className="mt-2">Medix Arena</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-primary-foreground/80">
              Search, filter, and document patient journeys — all in one system.
            </p>
            <Link
              to="/patients"
              className="inline-flex w-fit items-center gap-1 rounded-md bg-primary-foreground px-3 py-2 text-sm font-medium text-primary hover:bg-primary-foreground/90"
            >
              Go to patient list <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export function DashboardLoadingState() {
  return (
    <section
      role="status"
      aria-label="Loading dashboard"
      className="flex flex-col gap-8"
    >
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-5 w-80 max-w-full" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-9 w-40" />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
