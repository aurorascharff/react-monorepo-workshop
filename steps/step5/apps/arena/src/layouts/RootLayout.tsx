import { Link, NavLink, Outlet } from 'react-router'
import { LayoutDashboard, Users } from 'lucide-react'
import { BrandMark, cn } from '@medix/ui'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/patients', label: 'Patients', icon: Users },
]

export function RootLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden lg:flex w-64 border-r bg-sidebar flex-col shrink-0">
        <Link
          to="/"
          className="border-b p-4 text-foreground transition-colors hover:text-foreground/80"
        >
          <BrandMark product="Arena" />
        </Link>
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
            <Link
              to="/"
              className="flex items-center gap-2 text-foreground transition-colors hover:text-foreground/80"
            >
              <BrandMark product="Arena" size="sm" />
            </Link>
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
            title="This page is unavailable"
            message="Something on this page failed. Try a different section or refresh the page."
            logContext="App layout boundary"
          >
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
