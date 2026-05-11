import type { ReactNode } from 'react'
import { AlertTriangle, LayoutDashboard, Users } from 'lucide-react'
import { BrandMark, Button, cn } from '@medix/ui'
import { ErrorBoundary } from '../components/ErrorBoundary'

type Page = 'dashboard' | 'patients'

type LayoutProps = {
  activePage: Page
  onNavigate: (page: Page) => void
  children: ReactNode
}

const navLinks: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
]

export function Layout({ activePage, onNavigate, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-sidebar flex-col shrink-0">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="border-b p-4 text-left text-foreground transition-colors hover:text-foreground/80"
        >
          <BrandMark product="Arena" />
        </button>
        <nav className="p-3 flex flex-col gap-1">
          {navLinks.map(({ id, label, icon: Icon }) => (
            <NavButton
              key={id}
              active={activePage === id}
              onClick={() => onNavigate(id)}
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
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
            >
              <BrandMark product="Arena" size="sm" />
            </button>
            <nav className="flex items-center gap-1">
              {navLinks.map(({ id, label, icon: Icon }) => (
                <NavButton
                  key={id}
                  compact
                  active={activePage === id}
                  onClick={() => onNavigate(id)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </NavButton>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <ErrorBoundary
            fallback={(_error, reset) => (
              <div className="mx-auto max-w-md mt-12 rounded-lg border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-semibold">Something went wrong</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try again, or reload the page if the problem continues.
                </p>
                <Button onClick={reset} className="mt-4">
                  Try again
                </Button>
              </div>
            )}
          >
            {children}
          </ErrorBoundary>
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
  children: ReactNode
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
