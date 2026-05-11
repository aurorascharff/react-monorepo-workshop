import { useState } from 'react'
import { Activity, LayoutDashboard, Users } from 'lucide-react'
import { cn } from '@medix/ui'
import { Dashboard } from './Dashboard'
import { PatientPage } from './PatientPage'

type Page = 'dashboard' | 'patients'

const navLinks: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
]

export function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null,
  )

  function showPatients(patientId: string | null = null) {
    setSelectedPatientId(patientId)
    setPage('patients')
  }

  function showDashboard() {
    setSelectedPatientId(null)
    setPage('dashboard')
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-sidebar flex-col shrink-0">
        <div className="border-b p-4">
          <button
            type="button"
            onClick={showDashboard}
            className="flex items-center gap-2.5 text-left text-foreground transition-colors hover:text-foreground/80"
            aria-label="Go to dashboard"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <div className="text-lg font-bold leading-5">Medix</div>
              <div className="mt-0.5 text-[0.6875rem] font-medium leading-3 text-muted-foreground">
                Arena
              </div>
            </div>
          </button>
        </div>
        <nav className="p-3 flex flex-col gap-1">
          {navLinks.map(({ id, label, icon: Icon }) => (
            <NavButton
              key={id}
              active={page === id}
              onClick={() => {
                setPage(id)
                if (id === 'patients') setSelectedPatientId(null)
              }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavButton>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              type="button"
              onClick={showDashboard}
              className="flex items-center gap-2.5 text-left text-foreground transition-colors hover:text-foreground/80"
              aria-label="Go to dashboard"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Activity className="h-3.5 w-3.5" />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <div className="text-base font-bold leading-4">Medix</div>
                <div className="mt-0.5 text-[0.625rem] font-medium leading-3 text-muted-foreground">
                  Arena
                </div>
              </div>
            </button>
            <nav className="flex items-center gap-1">
              {navLinks.map(({ id, label, icon: Icon }) => (
                <NavButton
                  key={id}
                  compact
                  active={page === id}
                  onClick={() => {
                    setPage(id)
                    if (id === 'patients') setSelectedPatientId(null)
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </NavButton>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {page === 'dashboard' ? (
            <Dashboard onNavigate={showPatients} />
          ) : (
            <PatientPage
              selectedId={selectedPatientId}
              onSelectPatient={setSelectedPatientId}
              onBack={() => setSelectedPatientId(null)}
            />
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
