import { useState } from 'react'
import { Activity, AlertTriangle, LayoutDashboard, Users } from 'lucide-react'
import { Button, cn } from '@medix/ui'
import { Dashboard } from './Dashboard'
import { PatientPage } from './PatientPage'

// TODO Module 2: Replace this conditional rendering with React Router.
// Pages should have real URLs (`/`, `/patients`, `/patients/:id`) so users can
// bookmark them, use the back button, and refresh without losing context.
//
// TODO Module 1: Pull this layout (sidebar + mobile header + main slot) into
// `layouts/Layout.tsx` and wrap the main slot in an <ErrorBoundary> so a
// failure in one page doesn't blank out the whole app.

type Page = 'dashboard' | 'patients'

const navLinks: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
]

export function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [error, setError] = useState<Error | null>(null)

  function go(next: Page) {
    setError(null)
    setPage(next)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-sidebar flex-col shrink-0">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Medix Arena</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2">Journal system</p>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {navLinks.map(({ id, label, icon: Icon }) => (
            <NavButton key={id} active={page === id} onClick={() => go(id)}>
              <Icon className="h-4 w-4" />
              {label}
            </NavButton>
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
              <span className="font-bold tracking-tight">Medix Arena</span>
            </div>
            <nav className="flex items-center gap-1">
              {navLinks.map(({ id, label, icon: Icon }) => (
                <NavButton
                  key={id}
                  compact
                  active={page === id}
                  onClick={() => go(id)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </NavButton>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {error ? (
            <div className="mx-auto max-w-md mt-12 rounded-lg border bg-card p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold">Something went wrong</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {error.message}
              </p>
              <Button onClick={() => setError(null)} className="mt-4">
                Try again
              </Button>
            </div>
          ) : page === 'dashboard' ? (
            <Dashboard onNavigate={() => go('patients')} onError={setError} />
          ) : (
            <PatientPage onError={setError} />
          )}
        </main>
      </div>
    </div>
  )
}

function NavButton({
  active,
  compact,
  onClick,
  children,
}: {
  active: boolean
  compact?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center rounded-md font-medium transition-colors',
        compact ? 'gap-1.5 px-2.5 py-1.5 text-sm' : 'gap-2 px-3 py-2 text-sm',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      )}
    >
      {children}
    </button>
  )
}
