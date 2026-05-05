import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { ArrowRight, Activity, Users, UserRound } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@klinikk/ui'
import { hentPasienter } from '../lib/api'
import { Spinner } from '../components/Spinner'

export function DashboardPage() {
  const { data: pasienter, isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: hentPasienter,
  })

  if (isLoading) return <Spinner />

  const antall = pasienter?.length ?? 0
  const kvinner = pasienter?.filter((p) => p.kjonn === 'kvinne').length ?? 0
  const menn = pasienter?.filter((p) => p.kjonn === 'mann').length ?? 0
  const sistePasienter = pasienter?.slice(0, 5) ?? []

  const stats = [
    { label: 'Pasienter totalt', value: antall, icon: Users },
    { label: 'Kvinner', value: kvinner, icon: UserRound },
    { label: 'Menn', value: menn, icon: UserRound },
  ]

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">Oversikt</p>
        <h1 className="text-3xl font-bold tracking-tight">God morgen</h1>
        <p className="text-muted-foreground">
          Du har {antall} pasienter under oppfølging i dag.
        </p>
      </header>

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

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Siste pasienter</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Hopp rett inn i journalen
              </p>
            </div>
            <Link
              to="/pasienter"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Se alle <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {sistePasienter.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/pasienter/${p.id}`}
                    className="flex items-center justify-between gap-4 px-6 py-3 transition-colors hover:bg-accent"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{p.navn}</span>
                      <span className="text-sm text-muted-foreground">
                        {p.diagnose}
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
            <CardTitle className="mt-2">Klinikk Arena</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-primary-foreground/80">
              Søk, filtrer og dokumenter pasientforløp – alt i ett system.
            </p>
            <Link
              to="/pasienter"
              className="inline-flex w-fit items-center gap-1 rounded-md bg-primary-foreground px-3 py-2 text-sm font-medium text-primary hover:bg-primary-foreground/90"
            >
              Til pasientliste <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
