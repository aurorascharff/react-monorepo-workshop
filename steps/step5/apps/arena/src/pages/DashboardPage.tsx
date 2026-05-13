import { Link } from 'react-router'
import { ArrowRight, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@medix/ui'
import { DashboardStats } from '@/features/patients/components/DashboardStats'
import { RecentPatients } from '@/features/patients/components/RecentPatients'

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">Overview</p>
        <h1 className="text-3xl font-bold tracking-tight">Good morning</h1>
        <p className="text-muted-foreground">
          Your patients and recent journal entries at a glance.
        </p>
      </header>

      <DashboardStats />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RecentPatients />
        <BrandCallout />
      </section>
    </div>
  )
}

function BrandCallout() {
  return (
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
  )
}
