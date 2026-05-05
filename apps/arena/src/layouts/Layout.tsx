import { NavLink, Outlet } from 'react-router'
import { Activity, AlertTriangle, LayoutDashboard, Users } from 'lucide-react'
import { Button, cn } from '@klinikk/ui'
import { ErrorBoundary } from '../components/ErrorBoundary'

const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/pasienter', label: 'Pasientliste', icon: Users },
]

export function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-sidebar flex-col shrink-0">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Klinikk Arena</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2">Journalsystem</p>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              <span className="font-bold tracking-tight">Klinikk Arena</span>
            </div>
            <nav className="flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <ErrorBoundary
            fallback={(error, reset) => (
              <div className="mx-auto max-w-md mt-12 rounded-lg border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold">Noe gikk galt</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {error.message}
                </p>
                <Button onClick={reset} className="mt-4">
                  Prøv igjen
                </Button>
              </div>
            )}
          >
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
