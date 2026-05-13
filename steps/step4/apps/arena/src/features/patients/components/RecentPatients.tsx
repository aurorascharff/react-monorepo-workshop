import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Skeleton } from '@medix/ui'
import { usePatients } from '../hooks/usePatients'
import { ErrorState } from '@/components/ErrorState'

export function RecentPatients() {
  const { data: patients, isLoading, error } = usePatients()

  if (isLoading) return <RecentPatientsSkeleton />

  if (error) {
    return (
      <ErrorState
        title="Recent patients are unavailable"
        message="We could not load the recent patients list right now."
        error={error}
        logContext="Recent patients query failed"
      />
    )
  }

  const recent = patients?.slice(0, 5) ?? []

  return (
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
          {recent.map((p) => (
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
  )
}

export function RecentPatientsSkeleton() {
  return (
    <Card
      className="lg:col-span-2"
      role="status"
      aria-label="Loading recent patients"
    >
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
  )
}
