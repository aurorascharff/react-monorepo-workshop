import type { ReactNode } from 'react'
import { LayoutDashboard, Users } from 'lucide-react'
import { BrandMark, cn } from '@medix/ui'
import { ErrorBoundary } from '@/components/ErrorBoundary'

type Page = 'dashboard' | 'patients'

type RootLayoutProps = {
  activePage: Page
  onNavigate: (page: Page) => void
  children: ReactNode
}

const navLinks: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
]

export function RootLayout({
  activePage,
  onNavigate,
  children,
}: RootLayoutProps) {
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
            title="This page is unavailable"
            message="Something on this page failed. Try a different section or refresh the page."
            logContext="App layout boundary"
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
