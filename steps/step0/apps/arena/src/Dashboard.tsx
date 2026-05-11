/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react'
import { ArrowRight, Activity, Users, UserRound } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Spinner } from '@medix/ui'
import { fetchPatients } from './lib/api'
import type { Patient } from './types'

type DashboardProps = {
  onNavigate: (patientId?: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPatients()
      .then((data) => setPatients(data))
      .finally(() => setIsLoading(false))
  }, [])

  const [stats, setStats] = useState({ total: 0, female: 0, male: 0 })
  useEffect(() => {
    setStats({
      total: patients.length,
      female: patients.filter((p) => p.gender === 'female').length,
      male: patients.filter((p) => p.gender === 'male').length,
    })
  }, [patients])

  if (isLoading) return <Spinner />

  const recentPatients = patients.slice(0, 5)

  const statCards = [
    { label: 'Total patients', value: stats.total, icon: Users },
    { label: 'Female', value: stats.female, icon: UserRound },
    { label: 'Male', value: stats.male, icon: UserRound },
  ]

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">Overview</p>
        <h1 className="text-3xl font-bold tracking-tight">Good morning</h1>
        <p className="text-muted-foreground">
          You have {stats.total} patients under follow-up today.
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
            <button
              type="button"
              onClick={() => onNavigate()}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              See all <ArrowRight className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {recentPatients.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(p.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-3 text-left transition-colors hover:bg-accent"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{p.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {p.diagnosis}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
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
            <button
              type="button"
              onClick={() => onNavigate()}
              className="inline-flex w-fit items-center gap-1 rounded-md bg-primary-foreground px-3 py-2 text-sm font-medium text-primary hover:bg-primary-foreground/90"
            >
              Go to patient list <ArrowRight className="h-4 w-4" />
            </button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
